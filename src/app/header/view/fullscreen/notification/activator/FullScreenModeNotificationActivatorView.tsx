import React from 'react';
import classNames from 'classnames';
import styles from './FullScreenModeNotificationActivatorView.module.scss';

type Props = {
  isFullScreenModeActive: boolean;
  showFullScreenModeNotification: () => void;
};

const FullScreenModeNotificationActivatorView = ({ isFullScreenModeActive, showFullScreenModeNotification }: Props) => {
  const className = classNames(styles.fullScreenModeNotificationActivator, {
    [styles.hidden]: !isFullScreenModeActive
  });

  return (
    <div className={className} onMouseOver={showFullScreenModeNotification} onFocus={showFullScreenModeNotification} />
  );
};

export default FullScreenModeNotificationActivatorView;
