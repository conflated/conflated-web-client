import { AbstractAction } from 'oo-redux-utils2';
import type { LayoutSelectorState } from '../state/LayoutSelectorState';

export default abstract class AbstractLayoutSelectorAction extends AbstractAction<LayoutSelectorState> {
  constructor() {
    super('');
  }
}
