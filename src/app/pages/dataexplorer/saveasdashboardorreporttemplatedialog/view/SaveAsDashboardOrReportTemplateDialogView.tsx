import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import OOReduxUtils from 'oo-redux-utils';
import { Button, Dropdown, DropdownProps, Form, Input, Modal, Radio } from 'semantic-ui-react';
import { Notification } from 'react-notification';
import { dashboardGroupField } from './SaveAsDashboardOrReportTemplateDialogView.module.scss';
import type { AppState } from '../../../../../store/AppState';
import SaveAsDashboardOrReportTemplateDialogControllerFactory from '../controller/SaveAsDashboardOrReportTemplateDialogControllerFactory';
import type { DashboardGroup } from '../../../dashboards/model/state/entities/DashboardGroup';

const mapAppStateToComponentProps = (appState: AppState) =>
  OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.saveAsDashboardOrReportTemplateDialogState, {
    dashboardGroups: appState.dashboardsPage.dashboardsState.dashboardGroups,
    layout: appState.dataExplorerPage.chartAreaState.layout,
    charts: appState.dataExplorerPage.chartAreaState.charts
  });

const createController = (dispatch: Dispatch) =>
  new SaveAsDashboardOrReportTemplateDialogControllerFactory(dispatch).createController();

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function SaveAsDashboardOrReportTemplateDialogView({
  charts,
  closeDialog,
  dashboardGroups,
  hideSavedSuccessfullyNotification,
  isOpen,
  layout,
  saveDashboard,
  shouldShowSavedSuccessfullyNotification,
  startFetchDashboardGroups
}: Props) {
  const [dashboardGroupName, setDashboardGroupName] = useState('');
  const [dashboardName, setDashboardName] = useState('');

  useEffect((): (() => void) => {
    function handleKeyDown(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.code === 'Escape') {
        keyboardEvent.preventDefault();
        keyboardEvent.stopPropagation();
        closeDialog();
      }
    }

    if (dashboardGroups.length === 0) {
      // noinspection JSIgnoredPromiseFromCall
      startFetchDashboardGroups();
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeDialog, dashboardGroups.length, startFetchDashboardGroups]);

  const selectDashboardGroup = useCallback((event: React.SyntheticEvent, { value }: DropdownProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDashboardGroupName(value as any);
  }, []);

  const changeDashboardName = useCallback(({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
    setDashboardName(value);
  }, []);

  const dashboardGroupOptions = useMemo(
    () =>
      dashboardGroups.map(({ name }: DashboardGroup) => ({
        key: name,
        value: name,
        text: name
      })),
    [dashboardGroups]
  );

  return (
    <div>
      <Modal open={isOpen}>
        <Modal.Header content="SAVE AS DASHBOARD" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <Radio label="Save as new dashboard" name="radioGroup" defaultChecked />
            </Form.Field>
            <Form.Field>
              <Radio disabled label="Save as new report template" name="radioGroup" value="that" />
            </Form.Field>
            <Form.Field className={dashboardGroupField}>
              <label>Dashboard group</label>
              <Dropdown
                placeholder="Type to add new dashboard group"
                search
                selection
                additionLabel="Add dashboard group: "
                additionPosition="top"
                allowAdditions
                options={dashboardGroupOptions}
                onChange={selectDashboardGroup}
              />
            </Form.Field>
            <Form.Field>
              <label>Dashboard name</label>
              <Input onChange={changeDashboardName} value={dashboardName} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={closeDialog}>
            CANCEL
          </Button>
          <Button
            primary
            onClick={() =>
              saveDashboard(dashboardGroupName, dashboardName, dashboardGroups, {
                charts,
                layout,
                name: dashboardName
              })
            }
          >
            SAVE
          </Button>
        </Modal.Actions>
      </Modal>
      <Notification
        isActive={shouldShowSavedSuccessfullyNotification}
        message="Dashboard saved successfully"
        onDismiss={hideSavedSuccessfullyNotification}
        dismissAfter={5000}
      />
    </div>
  );
}

export default connect(mapAppStateToComponentProps, createController)(SaveAsDashboardOrReportTemplateDialogView);
