import { AbstractAction } from 'oo-redux-utils2';
import type { HeaderState } from '../state/HeaderState';

export default abstract class AbstractHeaderAction extends AbstractAction<HeaderState> {
  constructor() {
    super('');
  }
}
