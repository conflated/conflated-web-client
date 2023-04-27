/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Icon, Message, Modal, Popup, Tab } from 'semantic-ui-react';
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
  const [errorShouldBeShown, setErrorShouldBeShown] = useState(false);
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
            {reportingRelativity === 'last' && <input className={`${styles.reportingPeriodValue}`} value="15" />}
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
      <Modal.Header className={styles.header}>
        <Popup
          content="Close (Esc)"
          inverted
          mouseEnterDelay={1250}
          trigger={<Icon className={styles.closeIcon} name="angle left" onClick={close} size="big" />}
        />
        <div className={styles.title}>GENERATE REPORT</div>
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field className={styles.formField}>
            <Form.Group>
              <div className={styles.divider}>Report Name and Period</div>
            </Form.Group>
          </Form.Field>
          <Form.Field className={styles.formField2}>
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
          <Form.Field className={styles.formField3}>
            <Form.Group>
              <div className={styles.divider}>Parameters</div>
            </Form.Group>
          </Form.Field>
          <Form.Field className={styles.formField2}>
            <Form.Group>
              <label>Subscriber MSISDN</label>
              <input value="0504877334" />
            </Form.Group>
          </Form.Field>
          <Form.Field className={styles.formField}>
            <Form.Group>
              <label>Parameter 2</label>
              <input className={errorShouldBeShown ? 'error' : ''} value="" />
              {errorShouldBeShown && <Icon className={styles.errorIcon} name="exclamation circle" size="large" />}
            </Form.Group>
          </Form.Field>
          <Form.Field className={styles.formField}>
            <Form.Group>
              <label>Parameter 3</label>
              <input className={errorShouldBeShown ? 'error' : ''} value="" />
              {errorShouldBeShown && <Icon className={styles.errorIcon} name="exclamation circle" size="large" />}
            </Form.Group>
          </Form.Field>
          <Form.Field className={styles.formField}>
            {!errorShouldBeShown && (
              <Form.Group>
                <label />
                <Button secondary onClick={() => setErrorShouldBeShown(true)} tabIndex="0">
                  GENERATE REPORT
                </Button>
              </Form.Group>
            )}
            {errorShouldBeShown && (
              <Form.Group>
                <label />
                <Message error icon onDismiss={() => setErrorShouldBeShown(false)}>
                  <Icon name="exclamation circle" />
                  <Message.Content>
                    <Message.Header>Following errors occurred:</Message.Header>
                    <Message.List>
                      <Message.Item>Parameter 2 cannot be empty</Message.Item>
                      <Message.Item>Parameter 3 cannot be empty</Message.Item>
                    </Message.List>
                  </Message.Content>
                </Message>
              </Form.Group>
            )}
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(GenerateReportDialogView);
