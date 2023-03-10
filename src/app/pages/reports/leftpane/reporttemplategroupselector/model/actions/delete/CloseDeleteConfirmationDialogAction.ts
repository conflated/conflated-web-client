import AbstractReportTemplateGroupSelectorAction from '../AbstractReportTemplateGroupSelectorAction';
import { ReportTemplateGroupSelectorState } from '../../state/ReportTemplateGroupSelectorState';

export default class CloseDeleteConfirmationDialogAction extends AbstractReportTemplateGroupSelectorAction {
  perform(currentState: ReportTemplateGroupSelectorState): ReportTemplateGroupSelectorState {
    return {
      ...currentState,
      reportTemplateGroupToBeDeleted: undefined
    };
  }
}
