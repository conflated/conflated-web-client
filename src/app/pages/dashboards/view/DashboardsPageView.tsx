import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './DashboardsPageView.module.scss';
import PageView from '../../../common/components/page/view/PageView';
import DashboardsPageHeaderView from '../header/view/DashboardsPageHeaderView';
import DashboardsPageLeftPaneView from '../leftpane/view/DashboardsPageLeftPaneView';
import DashboardsPageRightPaneView from '../rightpane/view/DashboardsPageRightPaneView';
import ChartAreaView from '../../../common/components/chartarea/view/ChartAreaView';
import { ActionDispatchers, controller, State } from '../controller/dashboardsPageController';

type Props = ActionDispatchers & State;

const DashboardsPageView = ({
  firstDashboard,
  lastDashboard,
  nextDashboard,
  nextDashboardGroup,
  previousDashboard,
  previousDashboardGroup,
  shouldShowDashboardsPageHeaderPermanently,
  showDashboardsHeaderBriefly,
  showDashboard,
  showDashboardGroup,
  startFetchDashboardGroups
}: Props) => {
  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    startFetchDashboardGroups();
  }, [startFetchDashboardGroups]);

  useEffect((): (() => void) => {
    function onKeyDown(keyboardEvent: KeyboardEvent) {
      let isKeyboardEventHandled = false;

      if (keyboardEvent.code === 'PageUp') {
        if (keyboardEvent.shiftKey) {
          showDashboardGroup(previousDashboardGroup);
          isKeyboardEventHandled = true;
        } else {
          showDashboard(previousDashboard);
          isKeyboardEventHandled = true;
        }
      } else if (keyboardEvent.code === 'PageDown') {
        if (keyboardEvent.shiftKey) {
          showDashboardGroup(nextDashboardGroup);
          isKeyboardEventHandled = true;
        } else {
          showDashboard(nextDashboard);
          isKeyboardEventHandled = true;
        }
      } else if (keyboardEvent.shiftKey && keyboardEvent.code === 'Home') {
        showDashboard(firstDashboard);
        isKeyboardEventHandled = true;
      } else if (keyboardEvent.shiftKey && keyboardEvent.code === 'End') {
        showDashboard(lastDashboard);
        isKeyboardEventHandled = true;
      }

      if (isKeyboardEventHandled) {
        keyboardEvent.preventDefault();
        keyboardEvent.stopPropagation();
        showDashboardsHeaderBriefly();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [
    firstDashboard,
    lastDashboard,
    nextDashboard,
    nextDashboardGroup,
    previousDashboard,
    previousDashboardGroup,
    showDashboard,
    showDashboardGroup,
    showDashboardsHeaderBriefly
  ]);

  return (
    <PageView
      header={<DashboardsPageHeaderView />}
      leftPane={<DashboardsPageLeftPaneView />}
      middlePane={
        <ChartAreaView
          className={shouldShowDashboardsPageHeaderPermanently ? styles.withHeader : ''}
          pageStateNamespace="dashboardsPage"
        />
      }
      rightPane={<DashboardsPageRightPaneView />}
      pageStateNamespace="dashboardsPage"
      showPaneActivatorHintsOnComponentMount
    />
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(DashboardsPageView);
