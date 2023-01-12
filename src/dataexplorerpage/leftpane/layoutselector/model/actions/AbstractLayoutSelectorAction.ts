import { AbstractAction } from 'oo-redux-utils';
import type { LayoutSelectorState } from '../state/LayoutSelectorState';

export default class AbstractLayoutSelectorAction extends AbstractAction<LayoutSelectorState> {
  constructor() {
    super('');
  }
}
