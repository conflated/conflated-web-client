import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import DashboardListItem from './dashboardlistitem/DashboardListItem';
import SelectorWithActionsView from '../../../../../common/components/selectorwithactions/view/SelectorWithActionsView';
import type { Dashboard } from '../../../model/state/types/Dashboard';
import AllAndFavoritesTabView from '../../../../../common/view/allandfavoritestabview/AllAndFavoritesTabView';
import { ActionDispatchers, controller, State } from '../controller/dahboardSelectorController';

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
          actions={[
            { iconName: 'edit', onClick: () => {}, tooltipText: 'Edit' },
            { iconName: 'i cursor', onClick: () => {}, tooltipText: 'Rename' },
            { iconName: 'trash alternate outline', onClick: () => {}, tooltipText: 'Delete' }
          ]}
        />
      )),
    [shownDashboards, selectedDashboard, showDashboard]
  );

  return (
    <SelectorWithActionsView
      id="dashboardSelector"
      titleText="DASHBOARD"
      addIconTooltipText="Add new dashboard"
      position="leftPane"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={dashboardListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace="dashboardSelector"
      reorderIconTooltipText="Reorder dashboards"
    />
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(DashboardSelectorView);
