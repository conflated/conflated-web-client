import type { HeaderState } from '../state/HeaderState';
import AbstractHeaderAction from './AbstractHeaderAction';
import type { DragType } from '../state/types/DragType';

export default class NotifyDragStartAction extends AbstractHeaderAction {
  dragType: DragType;

  constructor(dragType: DragType) {
    super();
    this.dragType = dragType;
  }

  perform(currentState: HeaderState): HeaderState {
    const newState = {
      ...currentState,
      lastDragType: this.dragType
    };

    return newState;
  }
}
