/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Dropdown, Icon } from 'semantic-ui-react';
import styles from './DashboardsPageHeaderView.module.scss';
import type { Dashboard } from '../../model/state/types/Dashboard';
import type { DashboardGroup } from '../../model/state/types/DashboardGroup';
import DashboardsSlideShowSlideChangeIntervalInputView from './slideshow/slidechangeintervalinput/DashboardsSlideShowSlideChangeIntervalInputView';
import DashboardsSlideShowPlayOrPauseButtonView from './slideshow/playorpausebutton/DashboardsSlideShowPlayOrPauseButtonView';
import DashboardsPageHeaderPinIconView from './pinicon/DashboardsPageHeaderPinIconView';
import { ActionDispatchers, controller, State } from '../controller/dashboardsPageHeaderController';

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
          value={dashboard.name}
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
          value={dashboardGroup.name}
          onClick={() => showDashboardGroup(dashboardGroup)}
        />
      )),
    [dashboardGroups, showDashboardGroup]
  );

  const dashboardSelectorContent = (() => {
    if (selectedDashboard) {
      return (
        <Dropdown scrolling className={styles.dashboardSelector} text={selectedDashboard.name}>
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
      <div className={styles.keyboardShortcuts}>
        <table className={styles.keyboardShortcutsTable}>
          <tbody>
            <tr>
              <td>
                <span>PgUp</span>
              </td>
              <td>Prev dashboard</td>
            </tr>
            <tr>
              <td>
                <span>PgDown</span>
              </td>
              <td>Next dashboard</td>
            </tr>
          </tbody>
        </table>
        <table className={styles.keyboardShortcutsTable}>
          <tbody>
            <tr>
              <td>
                <span className={styles.first}>Shift</span>
                <b>+</b>
                <span className={styles.second}>PgUp</span>
              </td>
              <td>Prev dashboard group</td>
            </tr>
            <tr>
              <td>
                <span className={styles.first}>Shift</span>
                <b>+</b>
                <span className={styles.second}>PgDown</span>
              </td>
              <td>Next dashboard group</td>
            </tr>
          </tbody>
        </table>
        <table className={styles.keyboardShortcutsTable}>
          <tbody>
            <tr>
              <td>
                <span className={styles.first}>Shift</span>
                <b>+</b>
                <span className={styles.second}>Home</span>
              </td>
              <td>First dashboard</td>
            </tr>
            <tr>
              <td>
                <span className={styles.first}>Shift</span>
                <b>+</b>
                <span className={styles.second}>End</span>
              </td>
              <td>Last dashboard </td>
            </tr>
          </tbody>
        </table>
        <table className={styles.keyboardShortcutsTable}>
          <tbody>
            <tr>
              <td>
                <span>
                  <Icon className={styles.keyboardShortcutIcon} name="arrow left" />
                </span>
              </td>
              <td>Scroll chart 1 data point left</td>
            </tr>
            <tr>
              <td>
                <span>
                  <Icon className={styles.keyboardShortcutIcon} name="arrow right" />
                </span>
              </td>
              <td>Scroll chart 1 data point right</td>
            </tr>
          </tbody>
        </table>
        <table className={styles.keyboardShortcutsTable}>
          <tbody>
            <tr>
              <td>
                <span className={styles.first}>Ctrl</span>
                <b>+</b>
                <span className={styles.second}>
                  <Icon className={styles.keyboardShortcutIcon} name="arrow left" />
                </span>
              </td>
              <td>Scroll chart 1 page left</td>
            </tr>
            <tr>
              <td>
                <span className={styles.first}>Ctrl</span>
                <b>+</b>
                <span className={styles.second}>
                  <Icon className={styles.keyboardShortcutIcon} name="arrow right" />
                </span>
              </td>
              <td>Scroll chart 1 page right</td>
            </tr>
          </tbody>
        </table>
        <table className={styles.keyboardShortcutsTable}>
          <tbody>
            <tr>
              <td>
                <span>Home</span>
              </td>
              <td>First chart data point</td>
            </tr>
            <tr>
              <td>
                <span>End</span>
              </td>
              <td>Last chart data point</td>
            </tr>
          </tbody>
        </table>
      </div>

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

export default connect(controller.getState, () => controller.actionDispatchers)(DashboardsPageHeaderView);
