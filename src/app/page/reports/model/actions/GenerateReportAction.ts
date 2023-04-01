import AbstractReportsPageAction from './AbstractReportsPageAction';
import { ReportsPageState } from '../state/ReportsPageState';
import { ReportTemplate } from '../state/types/ReportTemplate';
import { ReportTemplateGroup } from '../state/types/ReportTemplateGroup';

export default class GenerateReportAction extends AbstractReportsPageAction {
  constructor(private readonly reportTemplateOrGroup: ReportTemplate | ReportTemplateGroup) {
    super();
  }

  perform(currentState: ReportsPageState): ReportsPageState {
    return currentState;
  }
}
