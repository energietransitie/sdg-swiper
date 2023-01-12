const RED = '\x1b[31m';
const MAGENTA = '\x1b[35m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

class Logger {
  public prefix?: string;

  constructor(prefix?: string) {
    this.prefix = prefix;
  }

  /**
   * Error message
   * @param message
   */
  public error(message: string | object): void {
    if (__DEV__) console.error(`${RED}${this.prefix || 'Error'}${RESET} - ${message}`);
  }

  /**
   * Info log
   * @param message Log message
   */
  public info(message: string | object): void {
    if (__DEV__) console.info(`${MAGENTA}${this.prefix} | Info${RESET} - ${message}`);
  }

  /**
   * Warning message
   * @param message
   */
  public warning(message: string | object): void {
    if (__DEV__) console.warn(`${YELLOW}${this.prefix || 'Warning'}${RESET} - ${message}`);
  }
}

export default Logger;
