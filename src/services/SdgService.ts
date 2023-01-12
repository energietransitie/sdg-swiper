import { SdgData } from '@constants/SdgData';
import BaseService from '@services/BaseService';
import type { ISdgState } from '@cotypes/state.interface';
import { injectable } from 'inversify';
import type { ISdg, ISdgImpact } from '@cotypes/sdg.interface';
import TaskResult from '@utils/TaskResult';
import type { ISdgService } from '@cotypes/utils.interface';

@injectable()
class SdgService extends BaseService<ISdgState> implements ISdgService {
  constructor() {
    super('Sdg', { impacts: [] });

    this.initialize();
  }

  /**
   * Set SDG impacts
   * @param impacts SDG impacts
   */
  public setImpacts(impacts: ISdgImpact[]) {
    this.stateSubject.next({ ...this.state, impacts: impacts });
    localStorage.setItem('impacts', window.btoa(JSON.stringify(this.stateSubject.value.impacts)));
  }

  /**
   * Retrieve all SDG's
   */
  public getAll(): Promise<TaskResult<ISdg[]>> {
    return new Promise(resolve => resolve(new TaskResult<ISdg[]>().withData(SdgData)));
  }

  /**
   * Initialise state from localstorage
   * @private
   */
  private initialize(): void {
    try {
      this.stateSubject.next({
        ...this.state,
        impacts: [...JSON.parse(window.atob(localStorage.getItem('impacts') ?? ''))]
      });
    } catch (e: unknown) {
      this.logger.error(`Error while resolving SDG impacts: ${e}`);
    }
  }
}

export default SdgService;
