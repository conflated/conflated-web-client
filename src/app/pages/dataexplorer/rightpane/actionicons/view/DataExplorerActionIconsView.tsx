import React from 'react';
import { connect } from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react';
import styles from './DataExplorerActionsIconsView.module.scss';
import { ActionDispatchers, controller } from '../controller/dataExplorerActionIconsController';

type Props = ActionDispatchers;

const DataExplorerActionIconsView = ({ openSaveAsDashboardOrReportTemplateDialog }: Props) => (
  <section id="dataExplorerPageActionIcons" className={styles.actionIcons}>
    <Popup
      trigger={<Icon className={styles.actionIcon} name="refresh" size="large" />}
      content="Refresh chart data"
      inverted
    />
    <Popup
      trigger={
        <Icon
          className={styles.actionIcon}
          name="save"
          size="large"
          onClick={openSaveAsDashboardOrReportTemplateDialog}
        />
      }
      content="Save charts as new dashboard"
      inverted
    />
    <Popup
      trigger={<Icon className={styles.actionIcon} name="trash alternate" size="large" />}
      content="Clear charts"
      inverted
    />
    <Popup
      trigger={<Icon className={styles.actionIcon} name="external share" size="large" />}
      content="Export"
      inverted
    />
    <Popup trigger={<Icon className={styles.actionIcon} name="setting" size="large" />} content="Settings" inverted />
  </section>
);

export default connect(null, () => controller.actionDispatchers)(DataExplorerActionIconsView);
