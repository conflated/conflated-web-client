import { createSelector } from 'reselect';
import type { AppState } from '../../../../../store/AppState';
import type { DashboardGroup } from '../../model/state/types/DashboardGroup';
import type { Dashboard } from '../../model/state/types/Dashboard';

const currentDashboardGroupSelector = (appState: AppState) =>
  appState.dashboardsPage.dashboardsState.selectedDashboardGroup;

const currentDashboardSelector = (appState: AppState) => appState.dashboardsPage.dashboardsState.selectedDashboard;

export default createSelector(
  [currentDashboardGroupSelector, currentDashboardSelector],
  (
    currentDashboardGroup: DashboardGroup | undefined,
    currentDashboard: Dashboard | undefined
  ): Dashboard | undefined => {
    if (currentDashboardGroup && currentDashboard) {
      const currentDashboardIndex = currentDashboardGroup.dashboards.indexOf(currentDashboard);
      if (currentDashboardIndex < currentDashboardGroup.dashboards.length - 1) {
        return currentDashboardGroup.dashboards[currentDashboardIndex + 1];
      }
    }

    return undefined;
  }
);
