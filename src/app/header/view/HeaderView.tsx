import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './HeaderView.module.scss';
import NavigationView from './navigation/NavigationView';
import UserMenuView from './usermenu/UserMenuView';
import FullScreenIconView from './fullscreen/icon/FullScreenIconView';
import FullScreenModeNotificationView from './fullscreen/notification/FullScreenModeNotificationView';
import FullScreenModeNotificationActivatorView from './fullscreen/notification/activator/FullScreenModeNotificationActivatorView';
import { ActionDispatchers, controller, State } from '../controller/headerController';
import MobileNavigationView from './navigation/MobileNavigationView';

type Props = ActionDispatchers & State;

// noinspection OverlyComplexFunctionJS
const HeaderView = ({
  dismissFullScreenModeNotification,
  exitFullScreenMode,
  isFullScreenModeActive,
  selectPage,
  shouldShowFullScreenModeNotification,
  showDashboardsHeader,
  showFullScreenModeNotification,
  switchToFullScreenMode
}: Props) => {
  useEffect(() => {
    function onKeyDown(keyboardEvent: KeyboardEvent) {
      if (keyboardEvent.code === 'Escape') {
        // noinspection JSIgnoredPromiseFromCall
        document.exitFullscreen();
        exitFullScreenMode();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [exitFullScreenMode]);

  useEffect(() => {
    function onFullScreenChange() {
      if (!document.fullscreenElement) {
        exitFullScreenMode();
      }
    }

    document.addEventListener('fullscreenchange', onFullScreenChange);

    return function cleanup() {
      document.removeEventListener('fullscreenchange', onFullScreenChange);
    };
  }, [exitFullScreenMode]);

  const requestFullScreenMode = useCallback(() => {
    const { documentElement } = document;

    if (documentElement && documentElement.requestFullscreen) {
      // noinspection JSIgnoredPromiseFromCall
      documentElement.requestFullscreen();
    }

    switchToFullScreenMode();
  }, [switchToFullScreenMode]);

  const handleFullScreenModeExit = useCallback(() => {
    // noinspection JSIgnoredPromiseFromCall
    document.exitFullscreen();
    exitFullScreenMode();
  }, [exitFullScreenMode]);

  const className = classNames(styles.appHeader, { [styles.hidden]: isFullScreenModeActive });

  return (
    <header className={className} onMouseOver={showDashboardsHeader} onFocus={showDashboardsHeader}>
      <MobileNavigationView />
      <img className={styles.appLogo} height="60%" src="/images/nokia-logo.svg" alt="" />
      <div className={styles.productName}>
        <b>CNI</b> Real-Time Monitoring
      </div>
      <NavigationView selectPage={selectPage} />
      <UserMenuView />
      <FullScreenIconView requestFullScreenMode={requestFullScreenMode} />
      <FullScreenModeNotificationView
        exitFullScreenMode={handleFullScreenModeExit}
        dismissFullScreenModeNotification={dismissFullScreenModeNotification}
        shouldShowFullScreenModeNotification={shouldShowFullScreenModeNotification}
      />
      <FullScreenModeNotificationActivatorView
        isFullScreenModeActive={isFullScreenModeActive}
        showFullScreenModeNotification={showFullScreenModeNotification}
      />
    </header>
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(HeaderView);
