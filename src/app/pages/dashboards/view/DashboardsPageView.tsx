import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import OOReduxUtils from 'oo-redux-utils';
import styles from './DashboardsPageView.module.scss';
import type { AppState } from '../../../../store/AppState';
import DashboardsPageControllerFactory from '../controller/DashboardsPageControllerFactory';
import PageView from '../../../common/components/page/view/PageView';
import DashboardsPageHeaderView from '../header/view/DashboardsPageHeaderView';
import DashboardsPageLeftPaneView from '../leftpane/view/DashboardsPageLeftPaneView';
import DashboardsPageRightPaneView from '../rightpane/view/DashboardsPageRightPaneView';
import ChartAreaView from '../../../common/components/chartarea/view/ChartAreaView';
import selectedNextDashboard from '../model/state/selectors/selectedNextDashboard';
import selectPreviousDashboardGroup from '../model/state/selectors/selectPreviousDashboardGroup';
import selectNextDashboardGroup from '../model/state/selectors/selectNextDashboardGroup';
import selectPreviousDashboard from '../model/state/selectors/selectPreviousDashboard';

const mapAppStateToComponentProps = (appState: AppState) =>
  OOReduxUtils.mergeOwnAndForeignState(appState.dashboardsPage.dashboardsState, {
    nextDashboard: selectedNextDashboard(appState),
    nextDashboardGroup: selectNextDashboardGroup(appState),
    previousDashboard: selectPreviousDashboard(appState),
    previousDashboardGroup: selectPreviousDashboardGroup(appState),
    shouldShowDashboardsPageHeaderPermanently: appState.dashboardsPage.headerState.shouldShowDashboardsHeaderPermanently
  });

const createController = (dispatch: Dispatch) => new DashboardsPageControllerFactory(dispatch).createController();

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function DashboardsPageView({
  nextDashboard,
  nextDashboardGroup,
  previousDashboard,
  previousDashboardGroup,
  shouldShowDashboardsPageHeaderPermanently,
  showDashboardsHeaderBriefly,
  showDashboard,
  showDashboardGroup,
  startFetchDashboardGroups
}: Props) {
  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    startFetchDashboardGroups();
  }, [startFetchDashboardGroups]);

  useEffect((): (() => void) => {
    function onKeyDown(keyboardEvent: KeyboardEvent) {
      let isKeyboardEventHandled = false;

      if (keyboardEvent.code === 'PageUp') {
        if (keyboardEvent.ctrlKey || keyboardEvent.shiftKey) {
          showDashboardGroup(previousDashboardGroup);
          isKeyboardEventHandled = true;
        } else {
          showDashboard(previousDashboard);
          isKeyboardEventHandled = true;
        }
      } else if (keyboardEvent.code === 'PageDown') {
        if (keyboardEvent.ctrlKey || keyboardEvent.shiftKey) {
          showDashboardGroup(nextDashboardGroup);
          isKeyboardEventHandled = true;
        } else {
          showDashboard(nextDashboard);
          isKeyboardEventHandled = true;
        }
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
}

export default connect(mapAppStateToComponentProps, createController)(DashboardsPageView);
