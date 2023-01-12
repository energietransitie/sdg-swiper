class TaskResult<T> {
  data: T | undefined;
  errors: ResultError[] = [];

  constructor(init?: Partial<TaskResult<T>>) {
    Object.assign(this, init);
  }

  /**
   * Check if there is any error
   */
  public get isSuccess(): boolean {
    return this.errors.length === 0;
  }

  /**
   * Add error to TaskResult
   * @param name Property name
   * @param messages Error message
   */
  public addError(name: string, messages: string | string[]): void {
    let error: ResultError | undefined = this.errors.find((x: ResultError) => x.name === name);
    if (!error) {
      error = new ResultError({ name });
      this.errors.push(error);
    }

    if (!Array.isArray(messages)) {
      messages = [messages];
    }

    if (messages.length > 0 && error?.errors) {
      error.errors.push(...messages);
    }
  }

  /**
   * Apply error from one TaskResult to another.
   * @param target Target TaskResult
   */
  public applyTo<T2>(target: TaskResult<T2>): void {
    for (const error of this.errors) {
      for (const message of error.errors) {
        target.addError(error.name, message);
      }
    }
  }

  public withData(data: T): TaskResult<T> {
    this.data = data;
    return this;
  }

  public withError(name: string, messages: string | string[]): TaskResult<T> {
    this.addError(name, messages);
    return this;
  }

  public withEmptyError(messages: string | string[]): TaskResult<T> {
    this.addError('', messages);
    return this;
  }

  public withErrors(errors: ResultError[]): TaskResult<T> {
    for (const error of errors) {
      for (const message of error.errors) {
        this.addError(error.name, message);
      }
    }
    return this;
  }
}

export class ResultError {
  public name = '';
  public errors: string[] = [];

  constructor(init?: Partial<ResultError>) {
    Object.assign(this, init);
  }
}

export default TaskResult;
