import { View } from '@components/atoms/default';
import type { IRootProps } from '@components/organisms/navigation/Root';
import IocTypes from '@configuration/ioc-types';
import type { ImpactType, SdgImpactExtended, SdgImpactResultCount } from '@cotypes/sdg.interface';
import type { ISdgService } from '@cotypes/utils.interface';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { hexToRGB } from '@utils/Utils';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { useInjection } from 'inversify-react';
import { jsPDF as JsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import type { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
// @ts-ignore
import styled from 'styled-components/native';

Chart.register(ArcElement, Tooltip, Legend);

const ImpactColorIndicator: Record<ImpactType, string> = {
  positive: '#09D0A2',
  neutral: '#D4A029',
  unknown: '#DEDEDE',
  negative: '#E5233D'
};

type PieDataSet = {
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
};

type PieData = {
  labels: string[];
  datasets: PieDataSet[];
};

export interface SwipeRow {
  number: number;
  ref: Swipeable;
}

const SdgResultScreen = ({navigation}: IRootProps<'SdgResult'>): JSX.Element => {
  const sdgService = useInjection<ISdgService>(IocTypes.SdgService);

  const {t} = useTranslation();
  const initialCountState = {positive: 0, negative: 0, unknown: 0, neutral: 0};
  const swipeableRefs = useRef<SwipeRow[]>([]);
  const [impactCount, setImpactCount] = useState<SdgImpactResultCount>(initialCountState);
  const [sdgImpact, setSdgImpact] = useState<SdgImpactExtended[]>([]);
  const chartRef = useRef<ChartJSOrUndefined<'pie', number[], string> | null>();

  const getChartData = (): PieData => {
    const data: PieData = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        borderColor: []
      }]
    };

    (Object.keys(ImpactColorIndicator) as ImpactType[]).forEach(impact => {
      data.labels.push(t(impact as string));
      data.datasets[0]?.data.push(impactCount[impact]);
      data.datasets[0]?.backgroundColor.push(hexToRGB(ImpactColorIndicator[impact], 0.5));
      data.datasets[0]?.borderColor.push(ImpactColorIndicator[impact]);
    });

    return data;
  };
  const [chartData, setChartData] = useState<PieData>(getChartData());

  const updateImpactCount = (impact: SdgImpactExtended[]): void => {
    const count = {...initialCountState};
    // impact is not undefined, as it's filtered above
    impact.forEach(sdg => count[sdg.impact!]++);
    setImpactCount(count);
  };

  const setColorIndicator = (number: number, shouldHide: boolean): void => {
    const sdg = sdgImpact.find(x => x.number === number);
    if (!sdg) return;

    sdg.hideColorIndicator = shouldHide;
    setSdgImpact([...sdgImpact]);
  };

  const updateSdgImpact = (number: number, impact: ImpactType): void => {
    const sdg = sdgImpact.find(x => x.number === number);
    if (!sdg) return;

    sdg.impact = impact;
    setSdgImpact([...sdgImpact]);
    sdgService.setImpacts([...sdgImpact].map(x => ({number: x.number, impact: x.impact})));
    updateImpactCount(sdgImpact);

    swipeableRefs.current.find(x => x.number === number)?.ref?.close();
  };

  const getConclusion = () => {
    if (impactCount.positive > impactCount.negative) return t('Currently the positive impact on the SDGs outweigh the negative impact therefore the advice is to continue the project based upon the SDG impacts.');
    if (impactCount.positive < impactCount.negative) return t('Currently there is a significant negative impact on the SDGs, it may be good to reconsider some of the project characteristics before continuing.');
    return t('The project has an equal amount of positive and negative impact. It may be useful to reconsider some project characteristics before starting the project.');
  };

  const goBack = (): void => {
    navigation.navigate('Sdg', {
      shouldGoBack: (true as unknown as object)
    });
  };

  const exportData = () => {
    const doc = new JsPDF('p', 'pt', 'a4');
    doc.setFont('helvetica', 'bold');
    doc.text(t('Sustainable Development Goal Impact Overview') as string, 40, 40);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    const text = doc.splitTextToSize(getConclusion(), 500);
    doc.text(text, 40, 70);

    autoTable(doc, {
      margin: {top: 60 + text.length * 20},
      head: [
        [t('Number'), t('Title'), t('Impact')]
      ],
      body: sdgImpact.map(x => [x.number?.toString() ?? '', x.title ?? '', t(x.impact?.toString() ?? '')]),
      headStyles: {
        fillColor: '#09d0a2'
      }
    });

    doc.save('sdg.pdf');
  };

  useEffect((): void => {
    const impact = sdgService.state.impacts;

    sdgService
      .getAll()
      .then(result => {
        if (result.isSuccess && result.data) {
          const impacts: SdgImpactExtended[] = result.data
            .map(sdg => ({...sdg, ...impact.find(i => i.number === sdg.number)}))
            .filter(x => x.impact)
            .sort((a, b) => (a.number ?? 0) - (b.number ?? 0));

          setSdgImpact(impacts);
          updateImpactCount(impacts);
        }

        // TODO: Add snackbar which displays error
      });
  }, []);

  useEffect((): void => {
    setChartData(getChartData());
  }, [impactCount]);

  const renderImpactActions = (number: number): JSX.Element => {
    return (
      <ImpactButtonGroup>
        <RectButton style={{...style.impactButton, ...style.impactButtonNegative}}
          onPress={() => updateSdgImpact(number, 'negative')}>
          <FontAwesome size={30} name={'close'} color="#fff" />
        </RectButton>
        <RectButton style={{...style.impactButton, ...style.impactButtonUnknown}}
          onPress={() => updateSdgImpact(number, 'unknown')}>
          <FontAwesome size={30} name={'question'} color="#343434" />
        </RectButton>
        <RectButton style={{...style.impactButton, ...style.impactButtonNeutral}}
          onPress={() => updateSdgImpact(number, 'neutral')}>
          <FontAwesome size={30} name={'minus'} color="#fff" />
        </RectButton>
        <RectButton style={{...style.impactButton, ...style.impactButtonPositive}}
          onPress={() => updateSdgImpact(number, 'positive')}>
          <FontAwesome size={30} name={'check'} color="#fff" />
        </RectButton>
      </ImpactButtonGroup>
    );
  };

  return (
    <View className={'w-full min-h-screen place-items-center bg-black'}>
      <Navigation>
        <MaterialIcons size={50} name={'arrow-back'} color={'#727272'} onPress={() => goBack()} />
        <MaterialIcons size={50} name={'file-download'} color={'#727272'} onPress={() => exportData()} />
      </Navigation>

      <Header>
        <SdgHeader>{ t('Results') }</SdgHeader>
      </Header>

      <SdgImpactContainer>
        <SdgChartContainer>
          <Pie data={chartData}
            ref={(ref: ChartJSOrUndefined<'pie', number[], string> | null) => {
              chartRef.current = ref;
            }}
            style={{maxHeight: 300, marginBottom: 12}}
            options={{
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    color: '#fff'
                  }
                }
              }
            }}
          />

          <ConclusionContainer>
            <ConclusionText>{ getConclusion() }</ConclusionText>
          </ConclusionContainer>
        </SdgChartContainer>
      </SdgImpactContainer>

      <Header>
        <SdgHeader>{ t('Impact') }</SdgHeader>
        <SdgHeaderDescription>{ t('Swipe right on an SDG to update the impact.') }</SdgHeaderDescription>
      </Header>

      <SdgImpactContainer>
        {
          sdgImpact && sdgImpact.map(item => <Swipeable key={item.id}
            ref={ref => {
              if (ref && item.number && !swipeableRefs.current.find(x => x.number == item.number)) {
                swipeableRefs.current.push({
                  number: item.number,
                  ref: ref
                });
              }
            }}
            containerStyle={{width: '100%', maxWidth: '400px'}}
            renderLeftActions={() => renderImpactActions(item.number ?? 0)}
            onSwipeableWillOpen={() => setColorIndicator(item.number ?? 0, true)}
            onSwipeableWillClose={() => setColorIndicator(item.number ?? 0, false)}
            shouldCancelWhenOutside
          >
            <SdgImpactWrapper>
              { !item.hideColorIndicator &&
                <SdgImpactColorIndication style={{backgroundColor: ImpactColorIndicator[item.impact!]}} /> }
              <SdgImpactTextContainer>
                <SdgText style={{fontWeight: 'bolder'}}>{ item.number }. { item.title }</SdgText>
                <SdgText>{ t(item.impact as string) }</SdgText>
              </SdgImpactTextContainer>
            </SdgImpactWrapper>
          </Swipeable>)
        }
      </SdgImpactContainer>
    </View>
  );
};

const style = StyleSheet.create({
  impactButton: {
    width: 50,
    height: 'calc(100% - 12px - 12px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  impactButtonUnknown: {
    backgroundColor: ImpactColorIndicator.unknown
  },
  impactButtonPositive: {
    backgroundColor: ImpactColorIndicator.positive
  },
  impactButtonNegative: {
    backgroundColor: ImpactColorIndicator.negative
  },
  impactButtonNeutral: {
    backgroundColor: ImpactColorIndicator.neutral
  }
});

const ImpactButtonGroup = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Header = styled.View`
  margin-top: 48px;
  margin-bottom: 12px;
  text-align: center;
`;

const SdgImpactContainer = styled.View`
  width: 70%;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0px 24px;
`;

const SdgImpactWrapper = styled.View`
  flex-direction: row;
  background-color: #343434;
  margin-top: 12px;
  margin-bottom: 12px;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
`;

const SdgText = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;

const SdgHeader = styled(SdgText)`
  font-weight: bolder;
`;

const SdgHeaderDescription = styled(SdgText)`
  font-weight: lighter;
`;

const SdgImpactColorIndication = styled.View`
  width: 12px;
`;

const SdgImpactTextContainer = styled.View`
  margin-left: 12px;
  padding-bottom: 12px;
  padding-top: 12px;
  width: calc(100% - 20px);
  max-width: calc(400px - 20px);
`;

const Navigation = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 12px;
  flex: 0;
  max-height: 72px;
  flex-basis: auto;
  height: 72px;
  align-items: center;
  position: fixed;
  z-index: 69;
`;

const SdgChartContainer = styled.View`
  width: 100%;
  background-color: #343434;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  padding: 20px;
`;

const ConclusionContainer = styled.View`
  text-align: center;
  place-items: center;
`;

const ConclusionText = styled.Text`
  color: #ffffff;
  max-width: 70ch;
`;

export default SdgResultScreen;
