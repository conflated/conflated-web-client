import AbstractHeaderAction from '../AbstractHeaderAction';
import type { HeaderState } from '../../state/HeaderState';

export default class EnterFullScreenModeAction extends AbstractHeaderAction {
  perform(currentState: HeaderState): HeaderState {
    const newState = {
      ...currentState,
      isFullScreenModeActive: true
    };

    return newState;
  }
}
