import { Form, Modal } from 'semantic-ui-react';
import React from 'react';
import stopEventPropagation from '../../../../utils/stopEventPropagation';

type Props = {
  handleCloseDialog: () => void;
};
const TriggerDetailsDialogView = ({ handleCloseDialog }: Props) => (
  <Modal closeOnEscape closeOnDimmerClick onClose={handleCloseDialog} onKeyDown={stopEventPropagation} open>
    <Modal.Header>ALERT DETAILS</Modal.Header>
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
