import AbstractHeaderAction from '../../AbstractHeaderAction';
import type { HeaderState } from '../../../state/HeaderState';

export default class ShowFullScreenModeNotificationAction extends AbstractHeaderAction {
  perform(currentState: HeaderState): HeaderState {
    const newState = {
      ...currentState,
      shouldShowFullScreenModeNotification: true
    };

    return newState;
  }
}
