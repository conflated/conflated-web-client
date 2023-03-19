import { Form, Icon, Modal, TextArea } from 'semantic-ui-react';
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
        <Form.Field>
          <Form.Group>
            <label className={styles.label}>Resolution instructions</label>
            <TextArea className={styles.textArea}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Arcu odio ut sem nulla pharetra diam sit amet. In eu mi bibendum neque egestas
              congue. At imperdiet dui accumsan sit amet nulla. Sit amet consectetur adipiscing elit. Fames ac turpis
              egestas sed tempus urna et pharetra. Libero nunc consequat interdum varius sit amet mattis vulputate. Arcu
              ac tortor dignissim convallis aenean et tortor at risus. Parturient montes nascetur ridiculus mus mauris
              vitae ultricies leo. Senectus et netus et malesuada fames ac turpis. Turpis massa tincidunt dui ut ornare
              lectus sit. Rhoncus aenean vel elit scelerisque mauris. Arcu ac tortor dignissim convallis aenean et.
              Iaculis urna id volutpat lacus laoreet non curabitur gravida. In massa tempor nec feugiat. Tincidunt id
              aliquet risus feugiat. Tempus quam pellentesque nec nam aliquam. Diam in arcu cursus euismod. Nisl
              suscipit adipiscing bibendum est ultricies integer quis. Posuere lorem ipsum dolor sit amet. Ut tristique
              et egestas quis ipsum suspendisse ultrices. Sit amet nisl suscipit adipiscing. Pretium lectus quam id leo
              in vitae. Dui accumsan sit amet nulla. Urna nunc id cursus metus aliquam eleifend mi in nulla. Consequat
              semper viverra nam libero justo. Aliquet enim tortor at auctor. Accumsan lacus vel facilisis volutpat est
              velit. Arcu bibendum at varius vel pharetra. Magnis dis parturient montes nascetur ridiculus mus mauris
              vitae. Eleifend mi in nulla posuere
            </TextArea>
          </Form.Group>
        </Form.Field>
      </Form>
    </Modal.Content>
  </Modal>
);

export default TriggerDetailsDialogView;
