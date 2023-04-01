import React from 'react';
import { connect } from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react';
import styles from './DataExplorerActionIconsView.module.scss';
import { ActionDispatchers, controller } from '../controller/dataExplorerActionIconsController';

type Props = ActionDispatchers;

const DataExplorerActionIconsView = ({ openSaveAsDashboardOrReportTemplateDialog }: Props) => (
  <section id="dataExplorerPageActionIcons" className={styles.actionIcons}>
    <Popup
      mouseEnterDelay={1000}
      trigger={<Icon className={styles.actionIcon} name="refresh" size="large" />}
      content="Refresh chart data"
      inverted
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
