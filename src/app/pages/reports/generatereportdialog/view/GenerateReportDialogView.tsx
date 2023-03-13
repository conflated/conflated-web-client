/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, Button, Form, Icon, Modal, Tab } from 'semantic-ui-react';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import stopEventPropagation from '../../../../common/utils/stopEventPropagation';
import styles from './GenerateReportDialogView.module.scss';
import { ActionDispatchers, controller, State } from '../controller/generateReportDialogController';

type Props = State & ActionDispatchers;

const GenerateReportDialogView = ({ close, isOpen }: Props) => {
  const [parametersShouldBeShown, setParametersShouldBeShown] = useState(true);
  const [activePaneIndex, setActivePaneIndex] = useState(0);
  const changeActivePane = (_: React.SyntheticEvent, { activeIndex }: any) => setActivePaneIndex(activeIndex);

  const reportingPeriodRelativityOptions = [
    { key: 'l', text: 'Last', value: 'last' },
    { key: 't', text: 'This', value: 'this' }
  ];

  const reportingPeriodTimeUnitOptions = [
    { key: 'm', text: 'Minutes', value: 'minutes' },
    { key: 'h', text: 'Hours', value: 'hours' },
    { key: 'd', text: 'Days', value: 'days' },
    { key: 'mo', text: 'Months', value: 'months' },
    { key: 'y', text: 'Years', value: 'years' }
  ];

  const tabPanes = [
    {
      menuItem: 'Relative reporting period',
      render: () => (
        <Tab.Pane className={styles.tabPane}>
          <Form.Group className={styles.formGroup}>
            <Form.Select fluid options={reportingPeriodRelativityOptions} value="last" />
            <Form.Input className={styles.reportingPeriodValue} value="15" />
            <Form.Select fluid options={reportingPeriodTimeUnitOptions} value="minutes" />
          </Form.Group>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Absolute reporting period',
      render: () => <Tab.Pane>Empty</Tab.Pane>
    }
  ];

  return (
    <Modal closeOnEscape closeOnDimmerClick={false} onClose={close} onKeyDown={stopEventPropagation} open={isOpen}>
      <Modal.Header>GENERATE REPORT</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Report template name</label>
            <input readOnly value="Subscriber Failures" />
          </Form.Field>
          <Form.Field className={styles.formField}>
            <label>Report name</label>
            <input value="Subs {{Subscriber MSISDN}} Failures" />
          </Form.Field>
          <Form.Field className={styles.formField}>
            <Tab
              activeIndex={activePaneIndex}
              menu={{ secondary: true, pointing: true }}
              onTabChange={changeActivePane}
              panes={tabPanes}
            />
          </Form.Field>
          <Form.Field className={styles.formField}>
            <Accordion>
              <Accordion.Title active={parametersShouldBeShown} index={0}>
                <Icon name="dropdown" onClick={() => setParametersShouldBeShown(!parametersShouldBeShown)} />
                Parameters
              </Accordion.Title>
              <Accordion.Content active={parametersShouldBeShown}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        {' '}
                        <label>Subscriber MSISDN</label>
                      </td>
                      <td>
                        <input />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {' '}
                        <label>Parameter 2</label>
                      </td>
                      <td>
                        <input />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {' '}
                        <label>Parameter 3</label>
                      </td>
                      <td>
                        <input />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Accordion.Content>
            </Accordion>
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