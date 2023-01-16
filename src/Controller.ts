/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractAction } from 'oo-redux-utils';

export type Dispatch = (plainActionObject: { type: AbstractAction<any, any> }) => void;

export default abstract class Controller<T extends string = ''> {
  protected readonly dispatch: (action: AbstractAction<any, T>) => void;

  constructor(dispatch: Dispatch) {
    this.dispatch = (action: AbstractAction<any, T>) => dispatch({ type: action });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getState(...args: any[]) {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract getActionDispatchers(stateNamespace: T): Record<string, Function>;

  dispatchWithDi(
    diContainer: { create: (...args: any[]) => Promise<any> },
    ActionClass: abstract new (...args: any[]) => AbstractAction<any, T>,
    otherArgs: Record<string, unknown>
  ) {
    diContainer
      .create(ActionClass, {
        dispatch: this.dispatch,
        ...otherArgs
      })
      .then((action: any) => this.dispatch(action));
  }
}
