import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import styles from '../../DashboardsPageHeaderView.module.scss';

type Props = {
  isDashboardsSlideShowPlaying: boolean;
  toggleDashboardsSlideShowPlay: () => void;
};

export default function DashboardsSlideShowPlayOrPauseButtonView({
  isDashboardsSlideShowPlaying,
  toggleDashboardsSlideShowPlay
}: Props) {
  return (
    <Popup
      inverted
      trigger={
        <Icon
          className={styles.actionIcon}
          size="large"
          name={isDashboardsSlideShowPlaying ? 'pause' : 'play'}
          onClick={toggleDashboardsSlideShowPlay}
        />
      }
      content={
        isDashboardsSlideShowPlaying
          ? 'Stop dashboards slide show'
          : 'Start slide show of dashboards in current dashboard group'
      }
    />
  );
}
