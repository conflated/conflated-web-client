/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Dropdown } from 'semantic-ui-react';
import styles from './DashboardsPageHeaderView.module.scss';
import type { AppState } from '../../../../../store/AppState';
import type { Dashboard } from '../../model/state/entities/Dashboard';
import type { DashboardGroup } from '../../model/state/entities/DashboardGroup';
import DashboardsSlideShowSlideChangeIntervalInputView from './slideshow/slidechangeintervalinput/DashboardsSlideShowSlideChangeIntervalInputView';
import DashboardsSlideShowPlayOrPauseButtonView from './slideshow/playorpausebutton/DashboardsSlideShowPlayOrPauseButtonView';
import DashboardsPageHeaderPinIconView from './pinicon/DashboardsPageHeaderPinIconView';
import { ActionDispatchers, controller, State } from '../dashboardsPageHeaderController';

type Props = ActionDispatchers & State;

const DashboardsPageHeaderView = ({
  cancelDelayedDashboardsHeaderHide,
  changeDashboardsSlideChangeInterval,
  dashboardGroups,
  dashboardSlideChangeIntervalInSecsStr,
  isDashboardsSlideShowPlaying,
  isFullScreenModeActive,
  hideDashboardsHeaderDelayed,
  selectedDashboardGroup,
  selectedDashboard,
  shouldShowDashboardsHeader,
  shouldShowDashboardsHeaderPermanently,
  showDashboard,
  showDashboardGroup,
  toggleDashboardsSlideShowPlay,
  toggleShouldShowDashboardsHeaderPermanently
}: Props) => {
  const dashboardDropDownItems = useMemo(
    () =>
      selectedDashboardGroup?.dashboards.map((dashboard: Dashboard) => (
        <Dropdown.Item
          key={dashboard.name}
          text={dashboard.name}
          value={dashboard as any}
          onClick={() => showDashboard(dashboard)}
        />
      )),
    [selectedDashboardGroup?.dashboards, showDashboard]
  );

  const dashboardGroupDropDownItems = useMemo(
    () =>
      dashboardGroups.map((dashboardGroup: DashboardGroup) => (
        <Dropdown.Item
          key={dashboardGroup.name}
          text={dashboardGroup.name}
          value={dashboardGroup as any}
          onClick={() => showDashboardGroup(dashboardGroup)}
        />
      )),
    [dashboardGroups, showDashboardGroup]
  );

  const dashboardSelectorContent = (() => {
    if (selectedDashboard) {
      return (
        <Dropdown scrolling className={styles.dashboardSelector} text={selectedDashboard.name.toUpperCase()}>
          <Dropdown.Menu>{dashboardDropDownItems}</Dropdown.Menu>
        </Dropdown>
      );
    }

    return null;
  })();

  const dashboardGroupSelectorContent = (() => {
    if (selectedDashboardGroup) {
      return (
        <Dropdown scrolling className={styles.dashboardGroupSelector} text={selectedDashboardGroup.name}>
          <Dropdown.Menu>{dashboardGroupDropDownItems}</Dropdown.Menu>
        </Dropdown>
      );
    }

    return null;
  })();

  const className = classNames(styles.header, {
    [styles.visible]: shouldShowDashboardsHeader || shouldShowDashboardsHeaderPermanently,
    [styles.fullScreen]: isFullScreenModeActive
  });

  return (
    <header
      className={className}
      onMouseEnter={cancelDelayedDashboardsHeaderHide}
      onFocus={cancelDelayedDashboardsHeaderHide}
      onMouseLeave={() => hideDashboardsHeaderDelayed(1000)}
      onBlur={() => hideDashboardsHeaderDelayed(1000)}
    >
      <div className={styles.dashboardSelectors}>
        {dashboardSelectorContent}
        {dashboardGroupSelectorContent}
      </div>
      <div className={styles.emptySpace} />
      <div>
        <DashboardsSlideShowSlideChangeIntervalInputView
          changeDashboardsSlideChangeInterval={changeDashboardsSlideChangeInterval}
          slideChangeIntervalInSecsStr={dashboardSlideChangeIntervalInSecsStr}
        />
        <DashboardsSlideShowPlayOrPauseButtonView
          isDashboardsSlideShowPlaying={isDashboardsSlideShowPlaying}
          toggleDashboardsSlideShowPlay={toggleDashboardsSlideShowPlay}
        />
        <DashboardsPageHeaderPinIconView
          shouldShowDashboardsHeaderPermanently={shouldShowDashboardsHeaderPermanently}
          toggleShouldShowDashboardsHeaderPermanently={toggleShouldShowDashboardsHeaderPermanently}
        />
      </div>
    </header>
  );
};

export default connect(
  (appState: AppState) => controller.getState(appState),
  () => controller.getActionDispatchers()
)(DashboardsPageHeaderView);
