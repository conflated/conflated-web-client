import { Form, Icon, Modal } from 'semantic-ui-react';
import React from 'react';
import stopEventPropagation from '../../../../utils/stopEventPropagation';
import styles from './TriggerDetailsDialogView.module.scss';

type Props = {
  closeDialog: () => void;
};
const TriggerDetailsDialogView = ({ closeDialog }: Props) => (
  <Modal
    className={styles.modal}
    closeOnEscapes
    closeOnDimmerClick
    onClose={closeDialog}
    onKeyDown={stopEventPropagation}
    open
  >
    <Modal.Header className={`${styles.header} withBackButton`}>
      <Icon className={styles.icon} name="angle left" onClick={closeDialog} size="big" />
      <div className={styles.text}> ALERT DETAILS</div>
    </Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Form.Group>
            <label className={styles.label}>Severity</label>
            <input className={styles.critical} value="Critical" />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group>
            <label className={styles.label}>Description</label>
            <input className="borderless large" value="Very High gNB Setup Failure Rate" />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group>
            <label className={styles.label}>Data source</label>
            <input className="borderless" value="Active CNI Alerts" />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group>
            <label className={styles.label}>Trigger time</label>
            <input className="borderless" value="2019-04-01 12:00:00" />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group>
            <label className={styles.label}>Active duration</label>
            <input className="borderless" value="3 hours" />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group>
            <label className={styles.label}>Labels</label>
            <input className="borderless" value="5G RAN, gNB 2345, Error: Signalling Congestion" />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group>
            <label className={styles.label}>Trigger values</label>
            <input className="borderless" value="Setup Failure Rate: 18%" />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group>
            <label className={styles.label}>Status</label>
            <input className="borderless" value="New" />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group>
            <label className={styles.label}>Assignee</label>
            <input className="borderless" value="Petri Silen" />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group>
            <label className={styles.label}>Status last modified</label>
            <input className="borderless" value="2019-04-01 12:00:00" />
          </Form.Group>
        </Form.Field>
      </Form>
    </Modal.Content>
  </Modal>
);

export default TriggerDetailsDialogView;
