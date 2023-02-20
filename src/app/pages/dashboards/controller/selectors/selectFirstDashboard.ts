import { createSelector } from 'reselect';
import type { AppState } from '../../../../../store/AppState';
import type { DashboardGroup } from '../../model/state/types/DashboardGroup';
import type { Dashboard } from '../../model/state/types/Dashboard';

const currentDashboardGroupSelector = (appState: AppState) =>
  appState.dashboardsPage.dashboardsState.selectedDashboardGroup;

export default createSelector(
  [currentDashboardGroupSelector],
  (currentDashboardGroup: DashboardGroup | undefined): Dashboard | undefined => {
    if (currentDashboardGroup) {
      return currentDashboardGroup.dashboards[0];
    }

    return undefined;
  }
);
