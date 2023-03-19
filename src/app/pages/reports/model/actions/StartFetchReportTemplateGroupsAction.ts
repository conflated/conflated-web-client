import { Inject } from 'noicejs';
import AbstractReportsPageAction from './AbstractReportsPageAction';
import { ReportTemplateGroup } from '../state/types/ReportTemplateGroup';
import { ReportsPageState } from '../state/ReportsPageState';
import { ReportTemplateGroupsService } from '../services/ReportTemplateGroupsService';
import ChangeChartAreaLayoutAndChartsAction from '../../../../common/components/chartarea/model/actions/layout/ChangeChartAreaLayoutAndChartsAction';
import StartFetchDataForOtherChartsAction from '../../../../common/components/chartarea/model/actions/chart/fetchdata/StartFetchDataForOtherChartsAction';
import diContainer from '../../../../../di/diContainer';

class FinishFetchReportTemplateGroupsAction extends AbstractReportsPageAction {
  constructor(private readonly reportTemplateGroups: ReportTemplateGroup[]) {
    super();
  }

  perform(currentState: ReportsPageState): ReportsPageState {
    return {
      ...currentState,
      reportTemplateGroups: this.reportTemplateGroups,
      isFetchingReportTemplateGroups: false
    };
  }
}

type ConstructorArgs = {
  reportTemplateGroupsService: ReportTemplateGroupsService;
};

@Inject('reportTemplateGroupsService')
class StartFetchReportTemplateGroupsAction extends AbstractReportsPageAction {
  readonly reportTemplateGroupsService: ReportTemplateGroupsService;

  constructor({ reportTemplateGroupsService }: ConstructorArgs) {
    super();
    this.reportTemplateGroupsService = reportTemplateGroupsService;
  }

  perform(currentState: ReportsPageState): ReportsPageState {
    this.reportTemplateGroupsService.fetchReportTemplateGroups().then((reportTemplateGroups: ReportTemplateGroup[]) => {
      this.dispatch(new FinishFetchReportTemplateGroupsAction(reportTemplateGroups));

      this.dispatch(
        new ChangeChartAreaLayoutAndChartsAction(
          'reportsPage',
          reportTemplateGroups[0].reportTemplates[0].layout,
          reportTemplateGroups[0].reportTemplates[0].charts
        )
      );

      this.dispatchWithDi(StartFetchDataForOtherChartsAction, diContainer, {
        stateNamespace: 'reportsPage',
        chart: null
      });
    });

    return {
      ...currentState,
      isFetchingReportTemplateGroups: true
    };
  }
}

export default StartFetchReportTemplateGroupsAction;
