import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import styles from '../DashboardsPageHeaderView.module.scss';

type Props = {
  shouldShowDashboardsHeaderPermanently: boolean;
  toggleShouldShowDashboardsHeaderPermanently: () => void;
};

const DashboardsPageHeaderPinIconView = ({
  shouldShowDashboardsHeaderPermanently,
  toggleShouldShowDashboardsHeaderPermanently
}: Props) => (
  <Popup
    inverted
    trigger={
      <Icon
        className={styles.actionIcon}
        style={{
          color: shouldShowDashboardsHeaderPermanently
            ? 'var(--primary-text-color-on-hover)'
            : 'var(--dashboards-page-header-foreground-color)'
        }}
        size="large"
        name="pin"
        onClick={toggleShouldShowDashboardsHeaderPermanently}
      />
    }
    content={shouldShowDashboardsHeaderPermanently ? 'Unpin dashboards header' : 'Pin dashboards header'}
  />
);

export default DashboardsPageHeaderPinIconView;
