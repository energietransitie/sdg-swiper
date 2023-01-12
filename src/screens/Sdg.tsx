import { View } from '@components/atoms/default';
import ProgressBar from '@components/atoms/ProgressBar';
import Skeleton from '@components/atoms/Skeleton';
import type { IRootProps } from '@components/organisms/navigation/Root';
import IocTypes from '@configuration/ioc-types';
import type { IRootLinking } from '@configuration/linking';
import Layout from '@constants/Layout';
import type { ImpactType, ISdg, ISdgImpact, SwipeDirection } from '@cotypes/sdg.interface';
import type { ISdgService } from '@cotypes/utils.interface';
import { FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import Swiper from '@external-packages/react-native-deck-swiper/swiper';
import type { StackNavigationState } from '@react-navigation/native';
import { adjustHexColor } from '@utils/Utils';
import { useInjection } from 'inversify-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Platform, StyleSheet, useWindowDimensions } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

const ImpactSwipeDirection: Record<ImpactType, SwipeDirection> = {
  'unknown': 'up',
  'neutral': 'down',
  'negative': 'left',
  'positive': 'right'
};

const cardHeight = (): string => {
  if (Layout.window.height < 740) return `${Layout.window.height - 340}px`;
  return Layout.window.height < 1000 ? '400px' : '600px';
};

const cardWidth = (): string => (Layout.window.width < 400 ? `${Layout.window.width - 30}px` : '360px');

const SdgScreen = ({navigation}: IRootProps<'Sdg'>): JSX.Element => {
  const sdgService = useInjection<ISdgService>(IocTypes.SdgService);
  const infoCardItem: readonly ISdg[] = [{number: 0}];
  const defaultColor = '#00000080';
  const highlightColor = '#ffffff';

  const {t} = useTranslation();
  const swiper = useRef<Swiper | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showHelpCard, setShowHelpCard] = useState<boolean>(false);
  const [activeNumber, setActiveNumber] = useState<number>(0);
  const [answers, setAnswers] = useState<ISdgImpact[]>(sdgService.state.impacts);
  const [data, _setData] = useState<ISdg[]>([...infoCardItem]);
  const dataLength = useRef<number>(0);
  const activeNumberRef = useRef<number>(0);
  const backgroundAnimation = useRef(new Animated.Value(0)).current;
  const actionButtons = useRef<HTMLElement[]>([]);
  // used to set correct z-index, so swiper overlays everything, except when card is not being moved
  const components = useRef<(HTMLElement)[]>([]);
  const [background, setBackground] = useState<Animated.AnimatedInterpolation<string>>(backgroundAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#09d0a2', '#09d0a2']
  }));
  const {width, height} = useWindowDimensions();

  const setSwiper = (nextSwiper: Swiper | null): void => {
    swiper.current = nextSwiper;
  };

  const setData = (nextData: ISdg[]): void => {
    dataLength.current = nextData.length;
    _setData(nextData);
  };

  const setComponentZIndex = (didDragStart: boolean): void => {
    components.current.forEach(component => {
      component.style.zIndex = didDragStart ? '-420' : '-69';
    });
  };

  const setActiveCard = (number: number, direction?: 'back' | SwipeDirection): void => {
    activeNumberRef.current = number;

    if (direction === 'back') {
      swiper.current?.jumpToCardIndex(number);
    } else if (direction) {
      swipeInDirection(direction);
    }

    setActiveNumber(number);
  };

  const sortAscending = (a: ISdg, b: ISdg): number => {
    const aVal = a.number ?? 0;
    const bVal = b.number ?? 0;
    if (aVal > bVal) return 1;
    if (aVal < bVal) return -1;
    return 0;
  };

  const onActionPressed = (impact: ImpactType): void => {
    if (showHelpCard || activeNumberRef.current >= dataLength.current) return;

    const impactDirection = ImpactSwipeDirection[impact];
    setActiveCard(activeNumberRef.current + 1, impactDirection);
  };

  const swipeInDirection = (direction: SwipeDirection): void => {
    if (direction === 'up') return swiper.current?.swipeTop();
    if (direction === 'down') return swiper.current?.swipeBottom();
    if (direction === 'left') return swiper.current?.swipeLeft();
    if (direction === 'right') return swiper.current?.swipeRight();
  };

  const onSwipe = (direction: SwipeDirection): void => {
    const impact = Object.keys(ImpactSwipeDirection).find(x => ImpactSwipeDirection[x as ImpactType] === direction) as ImpactType;
    setSdgImpact(impact, activeNumber);
    setActiveCard(activeNumber + 1);
  };

  const setSdgImpact = (impact: ImpactType, number?: number): void => {
    if (number === 0) return;

    number = number ?? activeNumber;
    const index = answers.findIndex(x => x.number === number);
    if (index > -1) {
      answers[index]!.impact = impact;
    } else {
      answers.push({number, impact});
    }

    setAnswers([...answers]);
    sdgService.setImpacts([...answers]);
  };

  const getActive = (): ISdg | undefined => {
    return data?.find(x => x.number === activeNumber);
  };

  const goBack = (): void => {
    if (activeNumber <= 0 || showHelpCard) return;
    setActiveCard(activeNumber - 1, 'back');
  };

  const goNext = (): void => {
    if (showHelpCard) return;
    if (activeNumberRef.current >= dataLength.current) return swipedAll();

    const existingAnswer = answers.find(x => x.number === activeNumber);
    const impact = existingAnswer?.impact ?? 'unknown';

    onActionPressed(impact);
  };

  const addComponentRef = (component: HTMLElement | null): void => {
    if (component && !components.current.includes(component)) components.current.push(component);
  };

  const addButtonRef = (button: HTMLElement | null): void => {
    if (button && !actionButtons.current.includes(button)) actionButtons.current.push(button);
  };

  const swipedAll = () => {
    navigation.navigate('SdgResult');
  };

  useEffect((): void => {
    setLoading(true);

    const handleError = (): void => {
      setLoading(false);
    };

    sdgService
      .getAll()
      .then(result => {
        if (result.isSuccess && result.data) {
          const currData = [...infoCardItem, ...result.data].sort(sortAscending);
          setData(currData);
          setBackground(backgroundAnimation.interpolate({
            inputRange: Array(currData.length).fill(0).map((_, i) => i),
            outputRange: currData.map(x => x.backgroundColor ?? '#09d0a2')
          }));

          return;
        }

        handleError();
      })
      .catch(handleError)
      .finally(() => setLoading(false));
  }, []);

  useEffect((): () => void => {
    const handleNavigationStateChanged = (state: StackNavigationState<IRootLinking>) => {
      const routes = state.routes;
      const lastRoute = routes[routes.length - 1];

      if (lastRoute?.name === 'Sdg' && lastRoute.params) {
        const {shouldGoBack} = (lastRoute.params as { shouldGoBack?: boolean });
        if (shouldGoBack && activeNumberRef.current > 0) setActiveCard(activeNumberRef.current - 1, 'back');
      }
    };

    navigation.addListener('state', e => handleNavigationStateChanged(e.data.state));

    return () => {
      navigation.removeListener('state', e => handleNavigationStateChanged(e.data.state));
    };
  }, []);

  useEffect((): () => void => {
    const handleKeyboardDown = (event: KeyboardEvent) => {
      if (showHelpCard || activeNumberRef.current >= dataLength.current) return;

      if (event.key === 'ArrowRight') {
        onActionPressed('positive');
      } else if (event.key === 'ArrowLeft') {
        onActionPressed('negative');
      } else if (event.key === 'ArrowUp') {
        onActionPressed('unknown');
      } else if (event.key === 'ArrowDown') {
        onActionPressed('neutral');
      }
    };

    if (Platform.OS === 'web') {
      window.addEventListener('keydown', (event: KeyboardEvent) => handleKeyboardDown(event));
    }

    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener('keydown', (event: KeyboardEvent) => handleKeyboardDown(event));
      }
    };
  }, []);

  useEffect((): void => {
    Animated.timing(backgroundAnimation, {
      useNativeDriver: false,
      toValue: activeNumber,
      duration: 300
    }).start();
  }, [activeNumber]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const setButtonColor = (button: HTMLElement, color: string): void => {
        [...button.children].forEach(child => {
          if (child instanceof HTMLElement) {
            child.style.color = color;
          }
        });
      };

      Object.values(actionButtons.current)
        .forEach(button => {
          if (!button) return;
          button.addEventListener('mouseover', () => setButtonColor(button, highlightColor));
          button.addEventListener('mouseout', () => setButtonColor(button, defaultColor));
        });

      return () => {
        Object.values(actionButtons.current)
          .forEach(button => {
            if (!button) return;
            button.removeEventListener('mouseover', () => setButtonColor(button, highlightColor));
            button.removeEventListener('mouseout', () => setButtonColor(button, defaultColor));
          });
      };
    }
  }, [actionButtons]);

  const getExplanationCard = (): JSX.Element => {
    return (
      <Card>
        <CardInnerContainer style={{userSelect: 'none'}}>
          <CardStyle
            style={{backgroundColor: getActive()?.backgroundColor ? adjustHexColor(getActive()!.backgroundColor!, -20) : '#068467'}}>
            <View style={styles.m12}>
              <SdgHeaderText style={{textAlign: 'center'}}>{ t('What is your impact?') }</SdgHeaderText>
              <SdgText style={styles.mt12}>
                { t('Discover the impact of your IT project on the Sustainable Development Goals!') }
                <span> </span>
                { t('Press the buttons below or swipe the card in the direction of your impact.') }
              </SdgText>
              <View style={styles.mt12}>
                { getExplanation() }
              </View>
            </View>
          </CardStyle>
        </CardInnerContainer>
      </Card>
    );
  };

  const getExplanation = (): JSX.Element => {
    return <>
      <CardExplanation>
        <FontAwesome style={styles.ml10} size={40} name={'check'} color="#fff" />
        <CardExplanationText>{ t('Positive Impact | Swipe Right') }</CardExplanationText>
      </CardExplanation>
      <CardExplanation>
        <FontAwesome style={styles.ml10} size={40} name={'minus'} color="#fff" />
        <CardExplanationText>{ t('No Impact | Swipe Down') }</CardExplanationText>
      </CardExplanation>
      <CardExplanation>
        <FontAwesome style={styles.ml12} size={40} name={'question'} color="#fff" />
        <CardExplanationText>{ t('I don\'t know | Swipe Up') }</CardExplanationText>
      </CardExplanation>
      <CardExplanation>
        <FontAwesome style={styles.ml10} size={40} name={'close'} color="#fff" />
        <CardExplanationText>{ t('Negative Impact | Swipe Left') }</CardExplanationText>
      </CardExplanation>
    </>;
  };

  const renderCard = (sdg: ISdg, _: number): JSX.Element => {
    return sdg.number !== 0
      ? (
        <Card>
          <CardInnerContainer>
            <CardSize>
              <SdgImage style={{height: cardHeight(), borderRadius: 12}} source={{uri: sdg.thumbnailUrl}} />
            </CardSize>
            <SdgThumbnailWrapper>
              <SdgImage style={{height: '120px', width: '120px'}} source={{uri: sdg.iconUrl}} />
            </SdgThumbnailWrapper>
          </CardInnerContainer>
        </Card>
      )
      : getExplanationCard();
  };

  return (
    <View style={styles.minHeightScreen}>
      <Animated.View style={{
        backgroundColor: background,
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        { !loading && <ProgressBar current={activeNumber} total={data.length} /> }

        <SdgNavigation ref={addComponentRef}>
          <ButtonContainer ref={addButtonRef}
            style={{visibility: activeNumber > 0 ? 'visible' : 'hidden'}}><MaterialIcons size={50}
              name={'arrow-back'}
              color={defaultColor}
              onPress={() => goBack()} /></ButtonContainer>
          <ButtonContainer ref={addButtonRef} style={{visibility: activeNumber > 0 ? 'visible' : 'hidden'}}><Octicons
            size={50} name={!showHelpCard ? 'question' : 'x-circle'} color={defaultColor}
            onPress={() => setShowHelpCard(!showHelpCard)} /></ButtonContainer>
          <ButtonContainer ref={addButtonRef}
            style={{visibility: activeNumber < data.length + 1 ? 'visible' : 'hidden'}}><MaterialIcons
              size={50} name={'arrow-forward'} color={defaultColor} onPress={() => goNext()} /></ButtonContainer>
        </SdgNavigation>

        <CardContainer style={{maxHeight: cardHeight(), height: cardHeight()}}>
          {
            !loading
            && <Swiper
              cardStyle={{display: 'flex', alignItems: 'center'}}
              containerStyle={{backgroundColor: 'transparent'}}
              ref={(sw: never) => setSwiper(sw)}
              cards={data}
              renderCard={renderCard}
              stackSize={3}
              stackSeparation={0}
              stackScale={0}
              cardHorizontalMargin={0}
              cardVerticalMargin={0}
              verticalThreshold={50}
              horizontalThreshold={50}
              overlayOpacityHorizontalThreshold={width / 10}
              overlayOpacityVerticalThreshold={height / 10}
              onSwipedAll={swipedAll}
              cardWidth={parseInt(cardWidth().replace('px', ''))}
              overlayLabels={{
                bottom: {
                  title: 'No Impact',
                  element: (
                    <SdgSwipeIndication>
                      <FontAwesome size={50} name={'minus'} color="#fff" />
                      <SdgActionText style={{color: '#fff'}}>NEUTRAL</SdgActionText>
                    </SdgSwipeIndication>
                  ),
                  style: {
                    wrapper: {
                      marginTop: 12,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  }
                },
                left: {
                  title: 'Negative Impact',
                  element: (
                    <SdgSwipeIndication>
                      <FontAwesome size={50} name={'close'} color="#fff" />
                      <SdgActionText style={{color: '#fff'}}>NEGATIVE</SdgActionText>
                    </SdgSwipeIndication>
                  ),
                  style: {
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: -30
                    }
                  }
                },
                right: {
                  title: 'Positive Impact',
                  element: (
                    <SdgSwipeIndication>
                      <FontAwesome size={50} name={'check'} color="#fff" />
                      <SdgActionText style={{color: '#fff'}}>POSITIVE</SdgActionText>
                    </SdgSwipeIndication>
                  ),
                  style: {
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: 30
                    }
                  }
                },
                top: {
                  title: 'Don\'t know',
                  element: (
                    <SdgSwipeIndication>
                      <FontAwesome size={50} name={'question'} color="#fff" />
                      <SdgActionText style={{color: '#fff'}}>DON&apos;T KNOW</SdgActionText>
                    </SdgSwipeIndication>
                  ),
                  style: {
                    wrapper: {
                      marginTop: 12,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  }
                }
              }}
              // animateOverlayLabelsOpacity
              animateCardOpacity
              swipeBackCard
              onSwipedLeft={() => onSwipe('left')}
              onSwipedRight={() => onSwipe('right')}
              onSwipedTop={() => onSwipe('up')}
              onSwipedBottom={() => onSwipe('down')}
              // @ts-ignore
              dragStart={() => setComponentZIndex(true)}
              dragEnd={() => setComponentZIndex(false)}
            />
          }

          {
            loading
            && <Swiper
              cardStyle={styles.center}
              containerStyle={{backgroundColor: '#09d0a2'}}
              renderCard={() => (
                <Card style={{borderRadius: 12, borderBottomLeftRadius: 0}}>
                  <CardInnerContainer>
                    <CardStyle>
                      <View>
                        <Skeleton height={cardHeight()} width={cardWidth()} backgroundColor={'#068467'}
                          skeletonColor={'#09d0a2'} containerStyle={styles.card} />
                      </View>
                    </CardStyle>
                  </CardInnerContainer>
                </Card>
              )}
              cards={[1]}
              infinite
            />
          }

          {
            showHelpCard && <Swiper
              cardStyle={styles.center}
              containerStyle={{backgroundColor: getActive()?.backgroundColor ?? '#09d0a2'}}
              renderCard={() => getExplanationCard()}
              cards={[1]}
              infinite
            />
          }
        </CardContainer>

        <CardInformation ref={addComponentRef}>
          { getActive() && getActive()?.number !== 0 && !showHelpCard && <SdgInformation>
            <SdgBoldText>
              { t('Sustainable Development Goal') } { getActive()?.number }
            </SdgBoldText>
            <SdgHeaderText>
              { t(getActive()?.title ?? '') }
            </SdgHeaderText>
            <SdgText>
              { t(getActive()?.description ?? '') }
            </SdgText>
          </SdgInformation> }
        </CardInformation>

        <SdgActionContainer ref={addComponentRef}>
          <SdgAction onPress={() => onActionPressed('negative')} ref={addButtonRef}>
            <FontAwesome size={50} name={'close'} color={defaultColor} />
            <SdgActionText>{ t('negative').toUpperCase() }</SdgActionText>
          </SdgAction>
          <SdgAction onPress={() => onActionPressed('unknown')} ref={addButtonRef}>
            <FontAwesome size={50} name={'question'} color={defaultColor} />
            <SdgActionText>{ t('don\'t know').toUpperCase() }</SdgActionText>
          </SdgAction>
          <SdgAction onPress={() => onActionPressed('neutral')} ref={addButtonRef}>
            <FontAwesome size={50} name={'minus'} color={defaultColor} />
            <SdgActionText>{ t('neutral').toUpperCase() }</SdgActionText>
          </SdgAction>
          <SdgAction onPress={() => onActionPressed('positive')} ref={addButtonRef}>
            <FontAwesome size={50} name={'check'} color={defaultColor} />
            <SdgActionText>{ t('positive').toUpperCase() }</SdgActionText>
          </SdgAction>
        </SdgActionContainer>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    display: 'flex',
    alignItems: 'center'
  },
  card: {
    borderRadius: 12,
    borderBottomLeftRadius: 0
  },
  ml10: {
    marginLeft: 10
  },
  mt12: {
    marginTop: 12
  },
  m12: {
    margin: 12
  },
  ml12: {
    marginLeft: 12
  },
  minHeightScreen: {
    ...Platform.select({web: {minHeight: '100vh'}, default: {minHeight: '100%'}})
  }
});

const SdgAction = styled.Pressable`
  justify-content: center;
  align-items: center;
`;

const SdgSwipeIndication = styled(SdgAction)`
  background-color: #00000080;
  margin: 12px;
  border-radius: 100%;
  height: 100px;
  width: 100px;
`;

const SdgActionText = styled.Text`
  color: #00000080;
  font-weight: bold;
`;

const CardContainer = styled.View`
  flex: 2;
  z-index: -70;
`;

const CardInformation = styled.ScrollView`
  flex: 3;
  display: flex;
  place-items: center;
  user-select: none;
  height: calc(100% - 60px - 60px - ${cardHeight()});
  max-height: calc(100% - 72px - 72px - ${cardHeight()});
  z-index: -69;
`;

const Card = styled.View`
  flex: 1;
  position: absolute;
  resize-mode: cover;
`;

const SdgImage = styled.Image`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const CardInnerContainer = styled.View`
  position: relative;
`;

const SdgThumbnailWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 120px;
  width: 120px;
`;

const SdgText = styled.Text`
  color: #fff;
`;

const SdgBoldText = styled(SdgText)`
  font-weight: bold;
`;

const SdgHeaderText = styled(SdgBoldText)`
  font-size: 24px;
`;

const SdgInformation = styled.View`
  max-width: 360px;
  padding: 1rem;
`;

const SdgNavigation = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding-top: 6px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 12px;
  flex: 0;
  max-height: 72px;
  flex-basis: auto;
  height: 72px;
`;

const SdgActionContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-direction: row;
  padding-bottom: 1rem;
  flex: 4;
  max-height: 80px;
  user-select: none;
  z-index: -69;
`;

const ButtonContainer = styled.View``;

const CardExplanation = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`;

const CardExplanationText = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-right: 12px;
`;

const CardSize = styled.View`
  height: ${cardHeight()};
  max-height: 600px;
  width: ${cardWidth()};
  max-width: 360px;
`;

const CardStyle = styled(CardSize)`
  border-radius: ${styles.card.borderRadius};
  border-bottom-left-radius: ${styles.card.borderBottomLeftRadius};
`;

export default SdgScreen;
