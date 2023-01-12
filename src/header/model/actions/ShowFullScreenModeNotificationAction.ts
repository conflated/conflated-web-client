import AbstractHeaderAction from './AbstractHeaderAction';
import type { HeaderState } from '../state/HeaderState';

export default class ShowFullScreenModeNotificationAction extends AbstractHeaderAction {
  performActionAndReturnNewState(currentState: HeaderState): HeaderState {
    const newState = {
      ...currentState,
      shouldShowFullScreenModeNotification: true
    };

    return newState;
  }
}
