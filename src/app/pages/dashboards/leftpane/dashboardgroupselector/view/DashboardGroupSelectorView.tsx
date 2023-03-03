/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import styles from './DashboardGroupSelectorView.module.scss';
import DashboardGroupListItem from './dashboardgrouplistitem/DashboardGroupListItem';
import SelectorWithActionsView from '../../../../../common/components/selectorwithactions/view/SelectorWithActionsView';
import type { DashboardGroup } from '../../../model/state/types/DashboardGroup';
import AllAndFavoritesTabView from '../../../../../common/view/allandfavoritestabview/AllAndFavoritesTabView';
import { ActionDispatchers, controller, State } from '../controller/dashboardGroupSelectorController';

type Props = ActionDispatchers & State;

const DashboardGroupSelectorView = ({
  cancelRenamingDashboardGroup,
  dashboardGroupToBeRenamed,
  finishRenamingDashboardGroup,
  isDashboardSelectorOpen,
  selectedDashboardGroup,
  shouldShowDashboardsPageLeftPanePermanently,
  showDashboardGroup,
  shownDashboardGroups,
  startRenamingDashboardGroup,
  toggleMaximizeSelector,
  toggleShouldShowDashboardsPageLeftPanePermanently
}: Props) => {
  const inputRef: { current: any } = useRef(null);

  useEffect(() => inputRef.current?.focus());

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

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent, dashboardGroup: DashboardGroup) => {
      event.stopPropagation();

      if (event.key === 'Enter') {
        event.preventDefault();
        finishRenamingDashboardGroup(dashboardGroup, inputRef.current?.value);
      }
    },
    [finishRenamingDashboardGroup]
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
              className={styles.input}
              key={dashboardGroup.name}
              onBlur={() => cancelRenamingDashboardGroup(dashboardGroup)}
              onFocus={(event: React.FocusEvent) => (event.target as any).select()}
              onKeyDown={(event: React.KeyboardEvent) => handleInputKeyDown(event, dashboardGroup)}
              defaultValue={dashboardGroup.name}
              ref={inputRef}
              size="small"
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
                  perform: () => startRenamingDashboardGroup(dashboardGroup),
                  tooltipText: 'Rename'
                },
                {
                  iconName: 'trash alternate outline',
                  perform: () => {},
                  tooltipText: 'Delete'
                }
              ]}
            />
          );
        }
      }),
    [
      shownDashboardGroups,
      dashboardGroupToBeRenamed,
      selectedDashboardGroup,
      showDashboardGroup,
      startRenamingDashboardGroup
    ]
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
