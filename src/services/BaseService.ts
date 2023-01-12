import Logger from '@utils/Logger';
import { BehaviorSubject, Observable } from 'rxjs';

abstract class BaseService<S> {
  protected logger: Logger;
  protected readonly stateSubject: BehaviorSubject<S>;

  /**
   * @param name Service name
   * @param state State which needs to be held
   */
  protected constructor(name: string, state: S) {
    this.logger = new Logger(name);
    this.stateSubject = new BehaviorSubject<S>(state);
  }

  /**
   * Return state of the service
   */
  public get state(): S {
    return this.stateSubject.value;
  }

  /**
   * Return observable of the service
   */
  public get observable(): Observable<S> {
    return this.stateSubject.asObservable();
  }
}

export default BaseService;
