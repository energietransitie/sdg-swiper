import 'reflect-metadata';
import { Container } from 'inversify';
import i18n from './i18n';
import IocTypes from './ioc-types';
import SdgService from '@services/SdgService';
import type {
  ISdgService,
  ITranslateService
} from '@cotypes/utils.interface';

const iocContainer: Container = new Container({ skipBaseClassChecks: true });

iocContainer.bind<ISdgService>(IocTypes.SdgService).to(SdgService);
iocContainer.bind<ITranslateService>(IocTypes.TranslateService).toDynamicValue(() => i18n);

export default iocContainer;
