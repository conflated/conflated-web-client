import { AbstractAction } from 'oo-redux-utils';
import type { HeaderState } from '../state/HeaderState';

export default class AbstractHeaderAction extends AbstractAction<HeaderState> {
  constructor() {
    super('');
  }
}
