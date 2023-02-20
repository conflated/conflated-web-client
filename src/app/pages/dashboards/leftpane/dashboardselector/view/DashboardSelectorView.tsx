import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import DashboardListItem from './dashboardlistitem/DashboardListItem';
import SelectorWithDefaultActionsView from '../../../../../common/components/selectorwithactions/view/SelectorWithActionsView';
import type { Dashboard } from '../../../model/state/entities/Dashboard';
import AllAndFavoritesTabView from '../../../../../common/view/allandfavoritestabview/AllAndFavoritesTabView';
import { ActionDispatchers, controller, State } from '../dahboardSelectorController';
import { AppState } from '../../../../../../store/AppState';

type Props = ActionDispatchers & State;

const DashboardSelectorView = ({
  isDashboardGroupSelectorOpen,
  selectedDashboard,
  showDashboard,
  shownDashboards,
  toggleMaximizeSelector
}: Props) => {
  const handleMaximizeIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isDashboardGroupSelectorOpen,
          selectorStateNamespace: 'dashboardGroupSelector'
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
      addIconTooltipText="Add new dashboard"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={dashboardListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace="dashboardSelector"
    />
  );
};

export default connect(
  (appState: AppState) => controller.getState(appState),
  () => controller.getActionDispatchers()
)(DashboardSelectorView);
