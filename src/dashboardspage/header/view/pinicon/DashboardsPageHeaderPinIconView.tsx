import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import styles from '../DashboardsPageHeaderView.module.scss';

type Props = {
  shouldShowDashboardsHeaderPermanently: boolean;
  toggleShouldShowDashboardsHeaderPermanently: () => void;
};

export default function DashboardsPageHeaderPinIconView({
  shouldShowDashboardsHeaderPermanently,
  toggleShouldShowDashboardsHeaderPermanently
}: Props) {
  return (
    <Popup
      inverted
      trigger={
        <Icon
          className={styles.actionIcon}
          style={{ color: shouldShowDashboardsHeaderPermanently ? 'var(--brand-color-1)' : 'rgb(0,0,0' }}
          size="large"
          name="pin"
          onClick={toggleShouldShowDashboardsHeaderPermanently}
        />
      }
      content={shouldShowDashboardsHeaderPermanently ? 'Unpin dashboards header' : 'Pin dashboards header'}
    />
  );
}
