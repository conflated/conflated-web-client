import React, { useEffect } from 'react';
import { Message } from 'semantic-ui-react';
import styles from './FullScreenModeNotificationView.module.scss';
import Constants from '../../../../common/Constants';

type Props = {
  exitFullScreenMode: () => void;
  dismissFullScreenModeNotification: () => void;
  shouldShowFullScreenModeNotification: boolean;
};

const FullScreenModeNotificationView = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exitFullScreenMode,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dismissFullScreenModeNotification,
  shouldShowFullScreenModeNotification
}: Props) => {
  useEffect(() => {
    const timeoutId = setTimeout(
      () => dismissFullScreenModeNotification(),
      Constants.NOTIFICATION_DISMISS_INTERVAL_IN_MILLIS
    );

    return () => clearTimeout(timeoutId);
  });

  return shouldShowFullScreenModeNotification ? (
    <Message className={styles.message}>
      <Message.Header>FULL SCREEN MODE</Message.Header>
      <p>Press ESC to return to normal mode</p>
    </Message>
  ) : null;
};

export default FullScreenModeNotificationView;
