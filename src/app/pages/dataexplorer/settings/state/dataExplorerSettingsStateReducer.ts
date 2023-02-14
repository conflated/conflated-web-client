import OOReduxUtils from 'oo-redux-utils2';
import type { DataExplorerSettingsState } from './DataExplorerSettingsState';
import AbstractDataExplorerSettingsAction from '../actions/AbstractDataExplorerSettingsAction';

const defaultTheme = {
  name: 'default',
  colors: ['#124191', '#00C9FF', '#4BDD33', '#FFFB00', '#FF8B10', '#FF3154', '#273142']
};

const initialDataExplorerSettingsState: DataExplorerSettingsState = {
  theme: defaultTheme
};

export default OOReduxUtils.createStateReducer<DataExplorerSettingsState>(
  initialDataExplorerSettingsState,
  AbstractDataExplorerSettingsAction
);
