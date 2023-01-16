import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import DashboardListItem from './dashboardlistitem/DashboardListItem';
import type { AppState } from '../../../../../../store/AppState';
import SelectorWithDefaultActionsView from '../../../../../common/components/selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import selectShownDashboards from '../model/state/selectors/selectShownDashboards';
import type { Dashboard } from '../../../model/state/entities/Dashboard';
import AllAndFavoritesTabView from '../../../../../common/view/allandfavoritestabview/AllAndFavoritesTabView';
import DashboardsPageController from '../../../dashboardsPageController';
import SelectorWithDefaultActionsController from '../../../../../common/components/selectorwithdefaultactions/selectorWithDefaultActionsController';

const mapAppStateToComponentProps = (appState: AppState) => ({
  shownDashboards: selectShownDashboards(appState),
  selectedDashboard: appState.dashboardsPage.dashboardsState.selectedDashboard,
  isDashboardGroupSelectorOpen: appState.common.selectorStates.dashboardGroupSelector.isSelectorOpen
});

const createController = (dispatch: Dispatch) => ({
  toggleMaximizeSelector: new SelectorWithDefaultActionsController(dispatch, 'dashboardSelector').createController()
    .toggleMaximizeSelector,

  showDashboard: new DashboardsPageController(dispatch).createController().showDashboard
});

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function DashboardSelectorView({
  isDashboardGroupSelectorOpen,
  selectedDashboard,
  showDashboard,
  shownDashboards,
  toggleMaximizeSelector
}: Props) {
  const handleMaximizeIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isDashboardGroupSelectorOpen,
          stateNamespace: 'dashboardGroupSelector'
        }
      ]);
    },
    [isDashboardGroupSelectorOpen, toggleMaximizeSelector]
  );

  const dashboardListItems = useMemo(
    () =>
      shownDashboards.map((dashboard: Dashboard) => (
        <DashboardListItem
          key={dashboard.name}
          item={dashboard}
          selectedItem={selectedDashboard}
          onItemClick={showDashboard}
        />
      )),
    [shownDashboards, selectedDashboard, showDashboard]
  );

  return (
    <SelectorWithDefaultActionsView
      id="dashboardSelector"
      titleText="DASHBOARD"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={dashboardListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace="dashboardSelector"
    />
  );
}

export default connect(mapAppStateToComponentProps, createController)(DashboardSelectorView);
