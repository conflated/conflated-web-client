import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import DashboardGroupListItem from './dashboardgrouplistitem/DashboardGroupListItem';
import SelectorWithDefaultActionsView from '../../../../../common/components/selectorwithactions/view/SelectorWithActionsView';
import type { DashboardGroup } from '../../../model/state/types/DashboardGroup';
import AllAndFavoritesTabView from '../../../../../common/view/allandfavoritestabview/AllAndFavoritesTabView';
import { ActionDispatchers, controller, State } from '../controller/dashboardGroupSelectorController';

type Props = ActionDispatchers & State;

const DashboardGroupSelectorView = ({
  isDashboardSelectorOpen,
  selectedDashboardGroup,
  shouldShowDashboardsPageLeftPanePermanently,
  showDashboardGroup,
  shownDashboardGroups,
  toggleMaximizeSelector,
  toggleShouldShowDashboardsPageLeftPanePermanently
}: Props) => {
  const handleMaximizeIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isDashboardSelectorOpen,
          selectorStateNamespace: 'dashboardSelector'
        }
      ]);
    },
    [isDashboardSelectorOpen, toggleMaximizeSelector]
  );

  const handlePinIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();
      toggleShouldShowDashboardsPageLeftPanePermanently();
    },
    [toggleShouldShowDashboardsPageLeftPanePermanently]
  );

  const dashboardGroupListItems = useMemo(
    () =>
      shownDashboardGroups.map((dashboardGroup: DashboardGroup) => (
        <DashboardGroupListItem
          key={dashboardGroup.name}
          item={dashboardGroup}
          selectedItem={selectedDashboardGroup}
          onItemClick={showDashboardGroup}
        />
      )),
    [shownDashboardGroups, selectedDashboardGroup, showDashboardGroup]
  );

  return (
    <SelectorWithDefaultActionsView
      id="dashboardGroupSelector"
      titleText="DASHBOARD GROUP"
      addIconTooltipText="Add new dashboard group"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={dashboardGroupListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      handlePinIconClick={handlePinIconClick}
      selectorStateNamespace="dashboardGroupSelector"
      isPinned={shouldShowDashboardsPageLeftPanePermanently}
    />
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(DashboardGroupSelectorView);
