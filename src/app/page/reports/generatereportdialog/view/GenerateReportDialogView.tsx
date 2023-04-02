/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Modal, Tab } from 'semantic-ui-react';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import stopEventPropagation from '../../../../common/utils/stopEventPropagation';
import styles from './GenerateReportDialogView.module.scss';
import { ActionDispatchers, controller, State } from '../controller/generateReportDialogController';

type Props = State & ActionDispatchers;

const GenerateReportDialogView = ({ close, isOpen }: Props) => {
  const [activePaneIndex, setActivePaneIndex] = useState(0);
  const [reportingRelativity, setReportingRelativity] = useState('last');
  const [reportingTimeUnit, setReportingTimeUnit] = useState('minutes');
  const changeActivePane = (_: React.SyntheticEvent, { activeIndex }: any) => setActivePaneIndex(activeIndex);

  const reportingPeriodRelativityOptions = [
    { key: 'l', text: 'Last', value: 'last' },
    { key: 't', text: 'This', value: 'this' }
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const reportingTimeUnitOptions = [
    { key: 'm', text: 'Minutes', value: 'minutes' },
    { key: 'h', text: 'Hours', value: 'hours' },
    { key: 'd', text: 'Days', value: 'days' },
    { key: '2', text: 'Weeks', value: 'weeks' },
    { key: 'mo', text: 'Months', value: 'months' },
    { key: 'y', text: 'Years', value: 'years' }
  ];

  const reportingTimeUnitOptions2 = [
    { key: 'm', text: 'Minute', value: 'minutes' },
    { key: 'h', text: 'Hour', value: 'hours' },
    { key: 'd', text: 'Day', value: 'days' },
    { key: 'w', text: 'Week', value: 'weeks' },
    { key: 'mo', text: 'Month', value: 'months' },
    { key: 'q', text: 'Quarter', value: 'quarters' },
    { key: 'hy', text: 'Half year', value: 'halfyear' },
    { key: 'y', text: 'Year', value: 'years' }
  ];

  const tabPanes = [
    {
      menuItem: 'Relative',
      render: () => (
        <Tab.Pane className={styles.tabPane}>
          <Form.Group className={styles.formGroup}>
            <Form.Select
              fluid
              options={reportingPeriodRelativityOptions}
              onChange={(_: React.SyntheticEvent<HTMLElement>, { value }: any) => setReportingRelativity(value)}
              value={reportingRelativity}
            />
            {reportingRelativity === 'last' && (
              <input className={`${styles.reportingPeriodValue} borderless`} value="15" />
            )}
            <Form.Select
              fluid
              onChange={(_: React.SyntheticEvent<HTMLElement>, { value }: any) => setReportingTimeUnit(value)}
              options={reportingRelativity === 'last' ? reportingTimeUnitOptions : reportingTimeUnitOptions2}
              value={reportingTimeUnit}
            />
          </Form.Group>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Absolute',
      render: () => <Tab.Pane>Empty</Tab.Pane>
    }
  ];

  return (
    <Modal
      className={styles.modal}
      closeOnEscape
      closeOnDimmerClick={false}
      onClose={close}
      onKeyDown={stopEventPropagation}
      open={isOpen}
    >
      <Modal.Header>GENERATE REPORT</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Form.Group>
              <label>Report template name</label>
              <input className="borderless large" value="Subscriber Failures" />
            </Form.Group>
          </Form.Field>
          <Form.Field className={styles.formField}>
            <Form.Group>
              <label>Report name</label>
              <input value="Subscriber {{Subscriber MSISDN}} Failures" />
            </Form.Group>
          </Form.Field>
          <Form.Field className={styles.formField}>
            <Form.Group>
              <label>Reporting period</label>
              <Tab
                activeIndex={activePaneIndex}
                menu={{ secondary: true, pointing: true }}
                onTabChange={changeActivePane}
                panes={tabPanes}
              />
            </Form.Group>
          </Form.Field>
          <Form.Field className={styles.formField}>
            <Form.Group>
              <label>Subscriber MSISDN</label>
              <input value="0504877334" />
            </Form.Group>
          </Form.Field>
          <Form.Field className={styles.formField}>
            <Form.Group>
              <label>Parameter 2</label>
              <input value="" />
            </Form.Group>
          </Form.Field>
          <Form.Field className={styles.formField}>
            <Form.Group>
              <label>Parameter 3</label>
              <input value="" />
            </Form.Group>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button secondary onClick={close} tabIndex="0">
          CANCEL
        </Button>
        <Button primary positive onClick={close} tabIndex="0">
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(GenerateReportDialogView);