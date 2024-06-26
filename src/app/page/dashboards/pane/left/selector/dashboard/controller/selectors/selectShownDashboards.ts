import { createSelector } from 'reselect';
import type { AppState } from '../../../../../../../../../store/AppState';
import FilterUtils from '../../../../../../../../common/utils/FilterUtils';
import type { DashboardGroup } from '../../../../../../model/state/types/DashboardGroup';
import type { Dashboard } from '../../../../../../model/state/types/Dashboard';

const selectedDashboardGroupsSelector = (appState: AppState) =>
  appState.dashboardsPage.dashboardsState.selectedDashboardGroup;

const searchedValueSelector = (appState: AppState) =>
  appState.common.selectorWithDefaultActionsStates.dashboardSelector.searchedValue;

export default createSelector(
  [selectedDashboardGroupsSelector, searchedValueSelector],
  (selectedDashboardGroup: DashboardGroup | null | undefined, searchedValue: string): Dashboard[] => {
    const dashboards = selectedDashboardGroup?.dashboards || [];
    return FilterUtils.filterNamedObjectsByName(dashboards, searchedValue);
  }
);
