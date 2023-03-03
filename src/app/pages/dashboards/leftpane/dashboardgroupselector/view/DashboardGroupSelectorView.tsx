import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import DashboardGroupListItem from './dashboardgrouplistitem/DashboardGroupListItem';
import SelectorWithActionsView from '../../../../../common/components/selectorwithactions/view/SelectorWithActionsView';
import type { DashboardGroup } from '../../../model/state/types/DashboardGroup';
import AllAndFavoritesTabView from '../../../../../common/view/allandfavoritestabview/AllAndFavoritesTabView';
import { ActionDispatchers, controller, State } from '../controller/dashboardGroupSelectorController';

type Props = ActionDispatchers & State;

const DashboardGroupSelectorView = ({
  dashboardGroupToBeRenamed,
  isDashboardSelectorOpen,
  selectedDashboardGroup,
  shouldShowDashboardsPageLeftPanePermanently,
  showDashboardGroup,
  shownDashboardGroups,
  startRenamingDashboardGroup,
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
      shownDashboardGroups.map((dashboardGroup: DashboardGroup) => {
        if (dashboardGroup === dashboardGroupToBeRenamed) {
          return (
            <Input
              focus
              value={dashboardGroup.name}
              onFocus={(event: React.FocusEvent) => (event.target as any).select()}
            />
          );
        } else {
          return (
            <DashboardGroupListItem
              key={dashboardGroup.name}
              item={dashboardGroup}
              selectedItem={selectedDashboardGroup}
              onItemClick={showDashboardGroup}
              actions={[
                {
                  iconName: 'i cursor',
                  onClick: () => startRenamingDashboardGroup(dashboardGroup),
                  tooltipText: 'Rename'
                },
                {
                  iconName: 'trash alternate outline',
                  onClick: () => {},
                  tooltipText: 'Delete'
                }
              ]}
            />
          );
        }
      }),
    [shownDashboardGroups, selectedDashboardGroup, showDashboardGroup, startRenamingDashboardGroup]
  );

  return (
    <SelectorWithActionsView
      id="dashboardGroupSelector"
      titleText="DASHBOARD GROUPS"
      addIconTooltipText="Add new dashboard group"
      position="leftPane"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={dashboardGroupListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      handlePinIconClick={handlePinIconClick}
      selectorStateNamespace="dashboardGroupSelector"
      isPinned={shouldShowDashboardsPageLeftPanePermanently}
      reorderIconTooltipText="Reorder dashboard groups"
    />
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(DashboardGroupSelectorView);
