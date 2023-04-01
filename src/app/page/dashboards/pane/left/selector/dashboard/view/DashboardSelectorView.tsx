import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import DashboardSelectorListItemView from './listitem/DashboardSelectorListItemView';
import SelectorWithActionsView from '../../../../../../../common/components/selector/withactions/view/SelectorWithActionsView';
import type { Dashboard } from '../../../../../model/state/types/Dashboard';
import AllAndFavoritesTabView from '../../../../../../../common/views/tab/selector/allandfavorites/AllAndFavoritesTabView';
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
        <DashboardSelectorListItemView
          key={dashboard.name}
          item={dashboard}
          selectedItem={selectedDashboard}
          onItemClick={showDashboard}
          onItemDblClick={() => window.open('http://localhost:3000/dashboards', '_blank')}
          actions={[
            {
              iconName: 'share',
              perform: () => window.open('http://localhost:3000/dashboards', '_blank'),
              tooltipText: 'Open in new browser tab'
            },
            {
              iconName: 'linkify',
              perform: () => navigator.clipboard.writeText('http://localhost:3000/dashboards'),
              tooltipText: 'Copy link to clipboard'
            },
            {
              iconName: 'star',
              perform: () => {},
              tooltipText: 'Add to favorites'
            },
            { iconName: 'edit', perform: () => {}, tooltipText: 'Edit' },
            { iconName: 'i cursor', perform: () => {}, tooltipText: 'Rename' },
            { iconName: 'trash alternate outline', perform: () => {}, tooltipText: 'Delete' }
          ]}
        />
      )),
    [shownDashboards, selectedDashboard, showDashboard]
  );

  return (
    <SelectorWithActionsView
      id="dashboardSelector"
      titleText="DASHBOARDS"
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
