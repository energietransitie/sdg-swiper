import { Component, ErrorInfo } from 'react';
import Logger from '@utils/Logger';

export interface IErrorBoundaryProps {
  children: JSX.Element | JSX.Element[];
}

class ErrorBoundary extends Component<IErrorBoundaryProps> {
  private logger: Logger = new Logger('ErrorBoundary');

  constructor(props: IErrorBoundaryProps) {
    super(props);
  }

  // public static getDerivedStateFromError(error: Error) {
  //   this.logger.error(`Something went wrong ${error}`);
  //   return { errored: true };
  // }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.logger.error(`Something went wrong: \nError: ${error} \nErrorInfo: ${errorInfo}`);
  }

  public override render(): JSX.Element | JSX.Element[] {
    return this.props.children;
  }
}

export default ErrorBoundary;
