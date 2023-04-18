import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Popup } from 'semantic-ui-react';
import styles from './DataExplorerActionIconsView.module.scss';
import { ActionDispatchers, controller } from '../controller/dataExplorerActionIconsController';

type Props = ActionDispatchers;

const DataExplorerActionIconsView = ({ openSaveAsDashboardOrReportTemplateDialog }: Props) => (
  <section id="dataExplorerPageActionIcons" className={styles.actionIcons}>
    <Popup
      mouseEnterDelay={1000}
      trigger={<Icon className={styles.actionIcon} name="refresh" size="large" />}
      content="Refresh chart data now"
      inverted
    />
    <Popup
      content="Chart data refresh interval"
      inverted
      mouseEnterDelay={1250}
      trigger={
        <Dropdown className={styles.refreshInterval} text="Auto">
          <Dropdown.Menu>
            <Dropdown.Item text="Auto" />
            <Dropdown.Item text="1 min" />
            <Dropdown.Item text="5 min" />
            <Dropdown.Item text="15 min" />
            <Dropdown.Item text="30 min" />
            <Dropdown.Item text="1 hour" />
          </Dropdown.Menu>
        </Dropdown>
      }
    />
    <Popup
      mouseEnterDelay={1000}
      trigger={
        <Icon
          className={styles.actionIcon}
          name="save"
          size="large"
          onClick={openSaveAsDashboardOrReportTemplateDialog}
        />
      }
      content="Save charts as a new dashboard or report template"
      inverted
    />
    <Popup
      mouseEnterDelay={1000}
      trigger={<Icon className={styles.actionIcon} name="trash alternate" size="large" />}
      content="Clear charts"
      inverted
    />
    <Popup
      mouseEnterDelay={1000}
      trigger={<Icon className={styles.actionIcon} name="upload" size="large" />}
      content="Export"
      inverted
    />
    <Popup
      mouseEnterDelay={1000}
      trigger={<Icon className={styles.actionIcon} name="setting" size="large" />}
      content="Settings"
      inverted
    />
  </section>
);

export default connect(null, () => controller.actionDispatchers)(DataExplorerActionIconsView);
