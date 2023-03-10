/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Modal } from 'semantic-ui-react';
import _ from 'lodash';
import styles from './ReportTemplateGroupSelectorView.module.scss';
import SelectorWithActionsView from '../../../../../common/components/selectorwithactions/view/SelectorWithActionsView';
import AllAndFavoritesTabView from '../../../../../common/view/allandfavoritestabview/AllAndFavoritesTabView';
import stopEventPropagation from '../../../../../common/utils/stopEventPropagation';
import { ActionDispatchers, controller, State } from '../controller/reportTemplateGroupSelectorController';
import { ReportTemplateGroup } from '../../../model/state/types/ReportTemplateGroup';
import ReportTemplateGroupSelectorListItem from './listitem/ReportTemplateGroupSelectorListItem';

type Props = ActionDispatchers & State;

const ReportTemplateGroupSelectorView = ({
  cancelRenaming,
  closeDeleteConfirmationDialog,
  confirmDelete,
  reportTemplateGroupToBeDeleted,
  reportTemplateGroupToBeRenamed,
  finishRenaming,
  isReportTemplateSelectorOpen,
  isListItemReorderModeActive,
  selectedReportTemplateGroup,
  shouldShowLeftPanePermanently,
  showDeleteConfirmationDialog,
  shownReportTemplateGroups,
  startRenaming,
  toggleMaximizeSelector,
  toggleShouldShowLeftPanePermanently
}: Props) => {
  const renameInputRef: { current: any } = useRef(null);
  const confirmationDialogCancelButtonRef: { current: any } = useRef(null);
  const [newReportTemplateGroupName, setNewReportTemplateGroupName] = useState('');
  useEffect(() => renameInputRef.current?.focus());
  useEffect(() => confirmationDialogCancelButtonRef.current?.focus());

  const handleMaximizeIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isReportTemplateSelectorOpen,
          selectorStateNamespace: 'reportTemplateSelector'
        }
      ]);
    },
    [isReportTemplateSelectorOpen, toggleMaximizeSelector]
  );

  const handleRenameInputChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setNewReportTemplateGroupName(event.currentTarget.value);
  }, []);

  const handleRenameInputKeyDown = useCallback(
    (event: React.KeyboardEvent, reportTemplateGroup: ReportTemplateGroup) => {
      event.stopPropagation();

      if (event.key === 'Enter' && newReportTemplateGroupName !== '') {
        event.preventDefault();
        finishRenaming(reportTemplateGroup, newReportTemplateGroupName);
      } else if (event.key === 'Escape') {
        cancelRenaming(reportTemplateGroup);
      }
    },
    [cancelRenaming, finishRenaming, newReportTemplateGroupName]
  );

  const reportTemplateGroupListItems = useMemo(
    () =>
      shownReportTemplateGroups.map((reportTemplateGroup: ReportTemplateGroup) => {
        if (reportTemplateGroup === reportTemplateGroupToBeRenamed) {
          return (
            <Input
              className={styles.input}
              key={reportTemplateGroup.name}
              onBlur={_.flow(stopEventPropagation, () => cancelRenaming(reportTemplateGroup))}
              onChange={handleRenameInputChange}
              onFocus={(event: React.FocusEvent) => (event.target as any).select()}
              onKeyDown={(event: React.KeyboardEvent) => handleRenameInputKeyDown(event, reportTemplateGroup)}
              defaultValue={reportTemplateGroup.name}
              ref={renameInputRef}
              size="small"
            />
          );
        } else {
          return (
            <ReportTemplateGroupSelectorListItem
              key={reportTemplateGroup.name}
              iconName={`${isListItemReorderModeActive ? 'bars' : ''}`}
              item={reportTemplateGroup}
              selectedItem={selectedReportTemplateGroup}
              onItemClick={generateReport}
              onItemLongClick={() => startRenaming(reportTemplateGroup)}
              actions={[
                {
                  iconName: 'linkify',
                  perform: () => navigator.clipboard.writeText('http://localhost:3000/dashboards'),
                  tooltipText: 'Copy link to clipboard'
                },
                {
                  iconName: 'i cursor',
                  perform: () => startRenaming(reportTemplateGroup),
                  tooltipText: 'Rename'
                },
                {
                  iconName: 'trash alternate outline',
                  perform: () => showDeleteConfirmationDialog(reportTemplateGroup),
                  tooltipText: 'Delete'
                }
              ]}
            />
          );
        }
      }),
    [
      cancelRenaming,
      handleRenameInputChange,
      handleRenameInputKeyDown,
      isListItemReorderModeActive,
      reportTemplateGroupToBeRenamed,
      selectedReportTemplateGroup,
      showDeleteConfirmationDialog,
      shownReportTemplateGroups,
      startRenaming
    ]
  );

  return (
    <>
      <SelectorWithActionsView
        id="reportTemplateGroupSelector"
        titleText="REPORT TEMPLATE GROUPS"
        addIconTooltipText="Add new report template group"
        position="leftPane"
        listItemsContent={
          <AllAndFavoritesTabView
            firstTabPaneListItems={reportTemplateGroupListItems}
            isListItemReorderModeActive={isListItemReorderModeActive}
            secondTabPaneListItems={[]}
          />
        }
        handleMaximizeIconClick={handleMaximizeIconClick}
        handlePinIconClick={_.flow(stopEventPropagation, toggleShouldShowLeftPanePermanently)}
        selectorStateNamespace="reportTemplateGroupSelector"
        isPinned={shouldShowLeftPanePermanently}
        reorderIconTooltipText="Reorder report template groups"
      />
      <Modal
        closeOnDimmerClick
        closeOnEscape
        onClose={closeDeleteConfirmationDialog}
        onKeyDown={stopEventPropagation}
        open={!!reportTemplateGroupToBeDeleted}
      >
        <Modal.Header content="DELETE REPORT TEMPLATE GROUP" />
        <Modal.Content>
          Delete <i>{reportTemplateGroupToBeDeleted?.name}</i> ?
        </Modal.Content>
        <Modal.Actions>
          <Button
            ref={confirmationDialogCancelButtonRef}
            secondary
            onClick={closeDeleteConfirmationDialog}
            tabIndex="0"
          >
            CANCEL
          </Button>
          <Button primary negative onClick={() => confirmDelete(reportTemplateGroupToBeDeleted)} tabIndex="0">
            DELETE
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(ReportTemplateGroupSelectorView);
