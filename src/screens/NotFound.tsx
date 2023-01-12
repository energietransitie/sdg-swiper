import Button from '@components/atoms/default/Button';
import { Text, View } from '@components/atoms/default';
import type { IRootProps } from '@components/organisms/navigation/Root';
import { useTranslation } from 'react-i18next';

const NotFound = ({ navigation }: IRootProps<'NotFound'>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <View className={'min-h-screen bg-black flex items-center justify-center'}>
      <View className={'text-center flex items-center'}>
        <Text className={'text-5xl font-bold mb-4'}>404</Text>
        <Text className={'text-5xl font-bold'}>{ t('Looks like you\'re lost.') }</Text>
        <Text className={'font-light text-neutral-300 max-w-[45rem] text-lg mt-5 px-4'}>
          { t('notfound-1') }
          <Text
            className={'underline decoration-pink-500/50 decoration-wavy underline-offset-2'}>
            { t('notfound-2') }
          </Text>.
          <br />
            { t('notfound-3') }
          <Text
            className={'underline decoration-orange-500/50 decoration-dotted underline-offset-2'}>
            { t('notfound-4') }
          </Text>
          { t('notfound-5') }
          <Text
            className={'underline decoration-sky-500/50 decoration-dotted underline-offset-2'}>
            { t('notfound-6') }
          </Text>
          { t('notfound-7') }
        </Text>
        <Button
          label={'Go Home'}
          onPress={() => navigation.navigate('Sdg')}
          extendClassName={'btn-primary w-4/5 md:w-80 mt-20'}
        />
      </View>
    </View>
  );
};

export default NotFound;
