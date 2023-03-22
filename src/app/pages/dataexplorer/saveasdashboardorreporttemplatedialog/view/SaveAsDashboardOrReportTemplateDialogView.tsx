import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, DropdownProps, Form, Icon, Input, Message, Modal } from 'semantic-ui-react';
import styles from './SaveAsDashboardOrReportTemplateDialogView.module.scss';
import type { DashboardGroup } from '../../../dashboards/model/state/types/DashboardGroup';
import { ActionDispatchers, controller, State } from '../controller/saveAsDashboardOrReportTemplateDialogController';

type Props = ActionDispatchers & State;

const SaveAsDashboardOrReportTemplateDialogView = ({
  charts,
  closeDialog,
  dashboardGroups,
  // hideSavedSuccessfullyNotification,
  isOpen,
  layout,
  saveDashboard,
  shouldShowSavedSuccessfullyNotification,
  startFetchDashboardGroups
}: Props) => {
  const [dashboardGroupName, setDashboardGroupName] = useState('');
  const [dashboardName, setDashboardName] = useState('');

  useEffect(() => {
    if (dashboardGroups.length === 0) {
      // noinspection JSIgnoredPromiseFromCall
      startFetchDashboardGroups();
    }
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
    <>
      <Modal closeOnEscape onClose={closeDialog} open={isOpen}>
        <Modal.Header content="SAVE AS DASHBOARD OR REPORT TEMPLATE" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <Form.Group>
                <label>Save as</label>
                <Form.Radio className={styles.noLeftPadding} label="Dashboard" name="radioGroup" defaultChecked />
                <Form.Radio label="Report template" name="radioGroup" />
              </Form.Group>
            </Form.Field>
            <Form.Field className={styles.formField}>
              <Form.Group>
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
              </Form.Group>
            </Form.Field>
            <Form.Field className={styles.formField}>
              <Form.Group>
                <label>Dashboard name</label>
                <Input onChange={changeDashboardName} value={dashboardName} />
              </Form.Group>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={closeDialog}>
            CANCEL
          </Button>
          <Button
            primary
            positive
            onClick={() =>
              saveDashboard(dashboardGroupName, dashboardName, dashboardGroups, {
                charts,
                layout,
                name: dashboardName
              })
            }
          >
            OK
          </Button>
        </Modal.Actions>
      </Modal>
      <Message
        className={`${styles.message} ${shouldShowSavedSuccessfullyNotification ? styles.visible : ''}`}
        positive
      >
        <Icon name="info circle" size="big" />
        Dashboard saved successfully.
      </Message>
    </>
  );
};

export default connect(
  controller.getState,
  () => controller.actionDispatchers
)(SaveAsDashboardOrReportTemplateDialogView);
