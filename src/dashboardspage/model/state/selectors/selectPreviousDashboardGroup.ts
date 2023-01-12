import { createSelector } from 'reselect';
import type { AppState } from '../../../../store/AppState';
import type { DashboardGroup } from '../entities/DashboardGroup';

const dashboardGroupsSelector = (appState: AppState) => appState.dashboardsPage.dashboardsState.dashboardGroups;

const currentDashboardGroupSelector = (appState: AppState) =>
  appState.dashboardsPage.dashboardsState.selectedDashboardGroup;

export default createSelector(
  [dashboardGroupsSelector, currentDashboardGroupSelector],
  (
    dashboardGroups: DashboardGroup[],
    currentDashboardGroup: DashboardGroup | undefined
  ): DashboardGroup | undefined => {
    if (currentDashboardGroup) {
      const currentDashboardGroupIndex = dashboardGroups.indexOf(currentDashboardGroup);
      if (currentDashboardGroupIndex > 0) {
        return dashboardGroups[currentDashboardGroupIndex - 1];
      }
    }

    return undefined;
  }
);
