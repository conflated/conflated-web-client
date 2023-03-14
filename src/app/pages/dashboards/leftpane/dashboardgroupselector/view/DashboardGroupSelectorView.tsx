/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Modal } from 'semantic-ui-react';
import _ from 'lodash';
import styles from './DashboardGroupSelectorView.module.scss';
import DashboardGroupSelectorListItem from './listitem/DashboardGroupSelectorListItem';
import SelectorWithActionsView from '../../../../../common/components/selectorwithactions/view/SelectorWithActionsView';
import type { DashboardGroup } from '../../../model/state/types/DashboardGroup';
import AllAndFavoritesTabView from '../../../../../common/view/allandfavoritestabview/AllAndFavoritesTabView';
import { ActionDispatchers, controller, State } from '../controller/dashboardGroupSelectorController';
import stopEventPropagation from '../../../../../common/utils/stopEventPropagation';

type Props = ActionDispatchers & State;

const DashboardGroupSelectorView = ({
  cancelRenamingDashboardGroup,
  closeDashboardGroupDeleteConfirmationDialog,
  confirmDashboardGroupDelete,
  dashboardGroupToBeDeleted,
  dashboardGroupToBeRenamed,
  finishRenamingDashboardGroup,
  isDashboardSelectorOpen,
  isListItemReorderModeActive,
  selectedDashboardGroup,
  shouldShowDashboardsPageLeftPanePermanently,
  showDashboardGroup,
  showDashboardGroupDeleteConfirmationDialog,
  shownDashboardGroups,
  startRenamingDashboardGroup,
  toggleMaximizeSelector,
  toggleShouldShowDashboardsPageLeftPanePermanently
}: Props) => {
  const inputRef: { current: any } = useRef(null);
  const closeButtonRef: { current: any } = useRef(null);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => inputRef.current?.focus());
  useEffect(() => closeButtonRef.current?.focus());

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

  const handleInputChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  }, []);

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent, dashboardGroup: DashboardGroup) => {
      event.stopPropagation();

      if (event.key === 'Enter' && inputValue !== '') {
        event.preventDefault();
        finishRenamingDashboardGroup(dashboardGroup, inputValue);
      } else if (event.key === 'Escape') {
        cancelRenamingDashboardGroup(dashboardGroup);
      }
    },
    [cancelRenamingDashboardGroup, finishRenamingDashboardGroup, inputValue]
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
              onBlur={_.flow(stopEventPropagation, () => cancelRenamingDashboardGroup(dashboardGroup))}
              onChange={handleInputChange}
              onFocus={(event: React.FocusEvent) => (event.target as any).select()}
              onKeyDown={(event: React.KeyboardEvent) => handleInputKeyDown(event, dashboardGroup)}
              defaultValue={dashboardGroup.name}
              ref={inputRef}
              size="small"
            />
          );
        } else {
          return (
            <DashboardGroupSelectorListItem
              key={dashboardGroup.name}
              iconName={`${isListItemReorderModeActive ? 'bars' : ''}`}
              item={dashboardGroup}
              selectedItem={selectedDashboardGroup}
              onItemClick={showDashboardGroup}
              onItemLongClick={() => startRenamingDashboardGroup(dashboardGroup)}
              actions={[
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
                {
                  iconName: 'i cursor',
                  perform: () => startRenamingDashboardGroup(dashboardGroup),
                  tooltipText: 'Rename'
                },
                {
                  iconName: 'trash alternate outline',
                  perform: () => showDashboardGroupDeleteConfirmationDialog(dashboardGroup),
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
      handleInputChange,
      cancelRenamingDashboardGroup,
      handleInputKeyDown,
      isListItemReorderModeActive,
      selectedDashboardGroup,
      showDashboardGroup,
      startRenamingDashboardGroup,
      showDashboardGroupDeleteConfirmationDialog
    ]
  );

  return (
    <>
      <SelectorWithActionsView
        id="dashboardGroupSelector"
        titleText="DASHBOARD GROUPS"
        addIconTooltipText="Add new dashboard group"
        position="leftPane"
        listItemsContent={
          <AllAndFavoritesTabView
            firstTabPaneListItems={dashboardGroupListItems}
            isListItemReorderModeActive={isListItemReorderModeActive}
            secondTabPaneListItems={[]}
          />
        }
        handleMaximizeIconClick={handleMaximizeIconClick}
        handlePinIconClick={handlePinIconClick}
        selectorStateNamespace="dashboardGroupSelector"
        isPinned={shouldShowDashboardsPageLeftPanePermanently}
        reorderIconTooltipText="Reorder dashboard groups"
      />
      <Modal
        closeOnDimmerClick
        closeOnEscape
        onClose={closeDashboardGroupDeleteConfirmationDialog}
        onKeyDown={stopEventPropagation}
        open={!!dashboardGroupToBeDeleted}
      >
        <Modal.Header content="DELETE DASHBOARD GROUP" />
        <Modal.Content>
          Delete <i>{dashboardGroupToBeDeleted?.name}</i> ?
        </Modal.Content>
        <Modal.Actions>
          <Button ref={closeButtonRef} secondary onClick={closeDashboardGroupDeleteConfirmationDialog} tabIndex="0">
            CANCEL
          </Button>
          <Button primary negative onClick={() => confirmDashboardGroupDelete(dashboardGroupToBeDeleted)} tabIndex="0">
            DELETE
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(DashboardGroupSelectorView);
