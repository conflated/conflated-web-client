import OOReduxUtils from 'oo-redux-utils2';
import { ReportTemplateGroupSelectorState } from './ReportTemplateGroupSelectorState';
import AbstractReportTemplateGroupSelectorAction from '../actions/AbstractReportTemplateGroupSelectorAction';

const initialReportTemplateGroupSelectorState: ReportTemplateGroupSelectorState = {
  reportTemplateGroupToBeDeleted: undefined,
  reportTemplateGroupToBeRenamed: undefined
};

export default OOReduxUtils.createStateReducer<ReportTemplateGroupSelectorState>(
  initialReportTemplateGroupSelectorState,
  AbstractReportTemplateGroupSelectorAction
);
