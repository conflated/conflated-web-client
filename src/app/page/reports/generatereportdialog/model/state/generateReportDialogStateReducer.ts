import OOReduxUtils from 'oo-redux-utils2';
import { GenerateReportDialogState } from './GenerateReportDialogState';
import AbstractGenerateReportDialogAction from '../actions/AbstractGenerateReportDialogAction';

const generateReportDialogState: GenerateReportDialogState = {
  isOpen: false
};

export default OOReduxUtils.createStateReducer<GenerateReportDialogState>(
  generateReportDialogState,
  AbstractGenerateReportDialogAction
);
