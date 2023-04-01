import { AbstractAction } from 'oo-redux-utils2';
import type { DataExplorerState } from '../state/DataExplorerState';

export default abstract class AbstractDataExplorerAction extends AbstractAction<DataExplorerState> {}
