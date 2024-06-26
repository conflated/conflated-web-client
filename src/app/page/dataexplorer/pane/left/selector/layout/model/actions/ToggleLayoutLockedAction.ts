import AbstractLayoutSelectorAction from './AbstractLayoutSelectorAction';
import type { LayoutSelectorState } from '../state/LayoutSelectorState';

export default class ToggleLayoutLockedAction extends AbstractLayoutSelectorAction {
  perform(currentState: LayoutSelectorState): LayoutSelectorState {
    const newState = {
      ...currentState,
      isLayoutLocked: !currentState.isLayoutLocked
    };

    return newState;
  }
}
