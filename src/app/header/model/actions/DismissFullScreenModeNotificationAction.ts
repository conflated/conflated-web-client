import AbstractHeaderAction from './AbstractHeaderAction';
import type { HeaderState } from '../state/HeaderState';

export default class DismissFullScreenModeNotificationAction extends AbstractHeaderAction {
  perform(currentState: HeaderState): HeaderState {
    const newState = {
      ...currentState,
      isFullScreenModeNotificationDismissed: true,
      shouldShowFullScreenModeNotification: false
    };

    return newState;
  }
}
