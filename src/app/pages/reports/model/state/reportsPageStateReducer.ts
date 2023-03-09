import OOReduxUtils from 'oo-redux-utils2';
import { ReportsPageState } from './ReportsPageState';
import AbstractReportsPageAction from '../actions/AbstractReportsPageAction';

const initialReportsPageState: ReportsPageState = {
  reportTemplateGroups: [],
  isFetchingReportTemplateGroups: false
};

export default OOReduxUtils.createStateReducer<ReportsPageState>(initialReportsPageState, AbstractReportsPageAction);
