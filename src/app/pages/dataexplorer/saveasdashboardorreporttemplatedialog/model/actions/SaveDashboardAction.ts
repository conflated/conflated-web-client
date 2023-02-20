import type { Chart } from '../../../../../common/components/chartarea/chart/model/state/Chart';
import type { Layout } from '../../../../../common/components/chartarea/model/state/types/Layout';
import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';
import type { DashboardGroup } from '../../../../dashboards/model/state/types/DashboardGroup';
import AbstractSaveAsDashboardOrReportTemplateDialogAction from './AbstractSaveAsDashboardOrReportTemplateDialogAction';

export default class SaveDashboardAction extends AbstractSaveAsDashboardOrReportTemplateDialogAction {
  constructor(
    private readonly dashboardGroupName: string,
    private readonly dashboardName: string,
    private readonly dashboardGroups: DashboardGroup[],
    private readonly charts: Chart[],
    private readonly layout: Layout
  ) {
    super();
  }

  perform(currentState: SaveAsDashboardOrReportTemplateDialogState): SaveAsDashboardOrReportTemplateDialogState {
    const newState = {
      ...currentState,
      isOpen: false,
      shouldShowSavedSuccessfullyNotification: true
    };

    return newState;
  }
}
