/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/comma-dangle */
// eslint-disable-next-line max-classes-per-file
declare module 'oo-redux-utils' {
  export class AbstractAction<StateType, StateNamespaceType extends string = ''> {
    readonly actionClassName: string;

    readonly stateNamespace: StateNamespaceType;

    constructor(stateNamespace: StateNamespaceType);

    performAction(action: AbstractAction<StateType, StateNamespaceType>, currentState: StateType): StateType;
    performActionAndReturnNewState(currentState: StateType): StateType;
    getStateNamespace(): string;
  }

  export class AbstractDispatchingAction<StateType, StateNamespaceType extends string = ''> extends AbstractAction<
    StateType,
    StateNamespaceType
  > {
    readonly dispatchAction: DispatchAction;

    constructor(stateNamespace: StateNamespaceType, dispatchAction: DispatchAction);

    dispatchAction(action: AbstractAction<StateType, any>): void;
  }

  export type ActionObject = {
    type: AbstractAction<any, any>;
  };

  export type Dispatch = (actionObject: ActionObject) => void;

  export type DispatchAction = (action: AbstractAction<any, any>) => void;

  export type DispatchActionWrapper = {
    dispatchAction: DispatchAction;
  };

  export class DispatchUtils {
    static createActionDispatcher(dispatch: Dispatch): DispatchAction;
  }

  export class ControllerFactory {
    dispatchAction: DispatchAction;

    constructor(dispatch: Dispatch);

    dispatchActionWithDi(
      diContainer: { create: (...args: Array<any>) => any },
      actionClass: Class<AbstractAction<any, any>>,
      otherArgs: object
    );
  }

  export class NamespacedControllerFactory<StateNamespaceType extends string> {
    dispatchAction: DispatchAction;

    stateNamespace: StateNamespaceType;

    constructor(dispatch: Dispatch, stateNamespace: StateNamespaceType);

    dispatchActionWithDi(
      diContainer: { create: (...args: Array<any>) => any },
      actionClass: Class<AbstractAction<any, any>>,
      otherArgs: object
    );
  }

  export type Reducers<StateNamespacesType extends { [key: string]: string }, StateType> = {
    [K in keyof StateNamespacesType]: (state: StateType | void, actionObject: ActionObject) => StateType;
  };

  export function createNamespacedReducers<StateNamespacesType extends { [string]: string }, StateType>(
    stateNamespaces: StateNamespacesType,
    createNamespacedStateReducer: (
      key: keyof StateNamespacesType
    ) => (state: StateType | undefined, actionObject: ActionObject) => StateType
  ): Reducers<StateNamespacesType, StateType>;

  export default class OOReduxUtils {
    static mergeOwnAndForeignState<
      OwnStateType extends Record<string, any>,
      ForeignStateType extends Record<string, any>
    >(ownState: OwnStateType, foreignState: ForeignStateType): OwnStateType & ForeignStateType;

    static createStateReducer<StateType>(
      initialState: StateType,
      actionBaseClasses: [Class<AbstractAction<any, any>>, Class<AbstractDispatchingAction<any, any>> | undefined]
    ): (state: StateType | undefined, actionObject: ActionObject) => StateType;

    static createNamespacedStateReducer<StateType, StateNamespaceType extends string>(
      initialState: StateType,
      actionBaseClasses: [Class<AbstractAction<any, any>>, Class<AbstractDispatchingAction<any, any>> | undefined],
      stateNamespace: StateNamespaceType
    ): (state: StateType | undefined, actionObject: ActionObject) => StateType;
  }
}
