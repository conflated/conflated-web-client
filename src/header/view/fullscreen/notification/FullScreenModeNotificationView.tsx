import React from 'react';
import { Notification } from 'react-notification';
import Constants from '../../../../common/Constants';

type Props = {
  exitFullScreenMode: () => void;
  dismissFullScreenModeNotification: () => void;
  shouldShowFullScreenModeNotification: boolean;
};

export default function FullScreenModeNotificationView({
  exitFullScreenMode,
  dismissFullScreenModeNotification,
  shouldShowFullScreenModeNotification
}: Props) {
  return (
    <Notification
      isActive={shouldShowFullScreenModeNotification}
      message={shouldShowFullScreenModeNotification ? '' : 'Press ESC to return to normal mode'}
      action={shouldShowFullScreenModeNotification ? 'Exit' : 'Dismiss'}
      title="FULL SCREEN MODE"
      dismissAfter={Constants.NOTIFICATION_DISMISS_INTERVAL_IN_MILLIS}
      onClick={shouldShowFullScreenModeNotification ? exitFullScreenMode : dismissFullScreenModeNotification}
      onDismiss={dismissFullScreenModeNotification}
      activeBarStyle={{ zIndex: 'var(--notification-z-index)', top: 0, bottom: 'auto', left: 'auto' }}
    />
  );
}
