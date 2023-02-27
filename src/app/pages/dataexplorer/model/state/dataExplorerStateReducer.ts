import OOReduxUtils from 'oo-redux-utils2';
import type { DataExplorerState } from './DataExplorerState';
import AbstractDataExplorerAction from '../actions/AbstractDataExplorerAction';

const defaultTheme = {
  name: 'default',
  colors: ['#005AFF', '#23ABB6', '#F7B737', '#F47F31', '#EO3DCD', '#7D33F2', '#37CC73', '#E23B3B']
};

const initialDataExplorerSettingsState: DataExplorerState = {
  theme: defaultTheme
};

export default OOReduxUtils.createStateReducer<DataExplorerState>(
  initialDataExplorerSettingsState,
  AbstractDataExplorerAction
);
