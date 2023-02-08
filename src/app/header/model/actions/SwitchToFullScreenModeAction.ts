import AbstractHeaderAction from './AbstractHeaderAction';
import type { HeaderState } from '../state/HeaderState';

export default class SwitchToFullScreenModeAction extends AbstractHeaderAction {
  perform(currentState: HeaderState): HeaderState {
    const newState = {
      ...currentState,
      isFullScreenModeActive: true
    };

    return newState;
  }
}
