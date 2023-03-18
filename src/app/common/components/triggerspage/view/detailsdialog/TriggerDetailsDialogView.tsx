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
    closeOnEscape
    closeOnDimmerClick
    onClose={closeDialog}
    onKeyDown={stopEventPropagation}
    open
  >
    <Modal.Header className={styles.header}>
      <Icon className={styles.icon} name="angle left" onClick={closeDialog} size="big" />
      <div className={styles.text}> ALERT DETAILS</div>
    </Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Group>
          <label>Severity</label>
          <input readOnly value="Critical" />
        </Form.Group>
        <Form.Group>
          <label>Description</label>
          <input readOnly value="Description" />
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

export default TriggerDetailsDialogView;
