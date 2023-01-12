import type { ISdg, ISdgImpact } from '@cotypes/sdg.interface';
import type TaskResult from '@utils/TaskResult';
import type { Observable } from 'rxjs';
import type {
  ISdgState
} from './state.interface';

export interface ITranslateService {
  t: (key: string) => string;
}

export interface ISdgService extends IBaseService<ISdgState> {
  setImpacts: (impacts: ISdgImpact[]) => void;
  getAll: () => Promise<TaskResult<ISdg[]>>;
}

export interface IBaseService<S> {
  state: S;
  observable: Observable<S>;
}
