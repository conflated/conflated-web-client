import { createSelector } from 'reselect';
import type { AppState } from '../../../../../../store/AppState';
import type { DashboardGroup } from '../entities/DashboardGroup';
import type { Dashboard } from '../entities/Dashboard';

const currentDashboardGroupSelector = (appState: AppState) =>
  appState.dashboardsPage.dashboardsState.selectedDashboardGroup;

export default createSelector(
  [currentDashboardGroupSelector],
  (currentDashboardGroup: DashboardGroup | undefined): Dashboard | undefined => {
    if (currentDashboardGroup) {
      return currentDashboardGroup.dashboards.at(-1);
    }

    return undefined;
  }
);
