import type { DispatchAction } from 'oo-redux-utils';
import type { Chart } from '../../../../common/components/chartarea/chart/model/state/Chart';
import type { Layout } from '../../../../common/components/chartarea/model/state/types/Layout';
import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';
import type { DashboardGroup } from '../../../../dashboardspage/model/state/entities/DashboardGroup';
import AbstractSaveAsDashboardOrReportTemplateDialogDispatchingAction from './AbstractSaveAsDashboardOrReportTemplateDialogDispatchingAction';

export default class SaveDashboardAction extends AbstractSaveAsDashboardOrReportTemplateDialogDispatchingAction {
  constructor(
    dispatchAction: DispatchAction,
    private readonly dashboardGroupName: string,
    private readonly dashboardName: string,
    private readonly dashboardGroups: DashboardGroup[],
    private readonly charts: Chart[],
    private readonly layout: Layout
  ) {
    super(dispatchAction);
  }

  performActionAndReturnNewState(
    currentState: SaveAsDashboardOrReportTemplateDialogState
  ): SaveAsDashboardOrReportTemplateDialogState {
    const newState = {
      ...currentState,
      isOpen: false,
      shouldShowSavedSuccessfullyNotification: true
    };

    return newState;
  }
}
