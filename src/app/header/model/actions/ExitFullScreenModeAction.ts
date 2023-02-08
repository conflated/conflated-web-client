import AbstractHeaderAction from './AbstractHeaderAction';
import type { HeaderState } from '../state/HeaderState';

export default class ExitFullScreenModeAction extends AbstractHeaderAction {
  perform(currentState: HeaderState): HeaderState {
    const newState = {
      ...currentState,
      isFullScreenModeActive: false,
      isFullScreenModeNotificationDismissed: false,
      shouldShowFullScreenModeNotification: false
    };

    return newState;
  }
}
