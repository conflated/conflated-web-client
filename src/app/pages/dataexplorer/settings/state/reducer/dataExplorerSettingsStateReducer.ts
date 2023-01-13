import OOReduxUtils from 'oo-redux-utils';
import type { DataExplorerSettingsState } from '../DataExplorerSettingsState';
import AbstractDataExplorerSettingsAction from '../../actions/AbstractDataExplorerSettingsAction';

const defaultTheme = {
  name: 'default',
  colors: ['#1a76c7', '#57943a', '#dfd91f', '#dd8a29', '#dd333f', '#dc4cdd']
};

const initialDataExplorerSettingsState: DataExplorerSettingsState = {
  theme: defaultTheme
};

export default OOReduxUtils.createStateReducer<DataExplorerSettingsState>(initialDataExplorerSettingsState, [
  AbstractDataExplorerSettingsAction,
  undefined
]);
