import { createSelector } from 'reselect';
import type { AppState } from '../../../../../../store/AppState';
import FilterUtils from '../../../../../../common/model/state/utils/FilterUtils';
import type { DashboardGroup } from '../../../../../model/state/entities/DashboardGroup';

const dashboardGroupsSelector = (appState: AppState) => appState.dashboardsPage.dashboardsState.dashboardGroups;

const searchedValueSelector = (appState: AppState) =>
  appState.common.selectorWithDefaultActionsStates.dashboardGroupSelector.searchedValue;

export default createSelector(
  [dashboardGroupsSelector, searchedValueSelector],
  (dashboardGroups: DashboardGroup[], searchedValue: string) =>
    FilterUtils.filterNamedObjectsByName(dashboardGroups, searchedValue)
);
