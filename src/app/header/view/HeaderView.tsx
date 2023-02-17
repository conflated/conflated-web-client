import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './HeaderView.module.scss';
import type { AppState } from '../../../store/AppState';
import NavigationView from './navigation/NavigationView';
import UserMenuView from './usermenu/UserMenuView';
import FullScreenIconView from './fullscreen/icon/FullScreenIconView';
import FullScreenModeNotificationView from './fullscreen/notification/FullScreenModeNotificationView';
import FullScreenModeNotificationActivatorView from './fullscreen/notification/activator/FullScreenModeNotificationActivatorView';
import { ActionDispatchers, controller, State } from '../headerController';
import DropDownMenuView from './dropdownmenu/DropDownMenuView';

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
      {/* <h1 className={styles.appTitle}>Conflated</h1> */}
      <DropDownMenuView />
      <img className={styles.appTitle} height="60%" src="/images/nokia-logo.svg" alt="" />
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

export default connect(
  (appState: AppState) => controller.getState(appState),
  () => controller.actionDispatchers
)(HeaderView);
