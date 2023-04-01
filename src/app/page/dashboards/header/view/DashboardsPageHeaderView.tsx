/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Dropdown, Icon, Input, Popup } from 'semantic-ui-react';
import styles from './DashboardsPageHeaderView.module.scss';
import type { Dashboard } from '../../model/state/types/Dashboard';
import type { DashboardGroup } from '../../model/state/types/DashboardGroup';
import DashboardsSlideShowSlideChangeIntervalInputView from './slideshow/slidechangeintervalinput/DashboardsSlideShowSlideChangeIntervalInputView';
import DashboardsSlideShowPlayOrPauseButtonView from './slideshow/playorpausebutton/DashboardsSlideShowPlayOrPauseButtonView';
import DashboardsPageHeaderPinIconView from './pinicon/DashboardsPageHeaderPinIconView';
import { ActionDispatchers, controller, State } from '../controller/dashboardsPageHeaderController';
import KeyboardShortcutsMessageView from './keyboardshortcutsmessage/KeyboardShortcutsMessageView';

type Props = ActionDispatchers & State;

const DashboardsPageHeaderView = ({
  activateDashboardsTabPane,
  activateDashboardGroupsTabPane,
  activeDashboardsTabPane,
  activeDashboardGroupsTabPane,
  cancelDelayedDashboardsHeaderHide,
  changeDashboardsSlideChangeInterval,
  dashboardGroupNameFilterText,
  dashboardNameFilterText,
  dashboardGroups,
  dashboardSlideChangeIntervalInSecsStr,
  filterDashboards,
  filterDashboardGroups,
  isDashboardsSlideShowPlaying,
  isFullScreenModeActive,
  hideDashboardsHeaderDelayed,
  hideKeyboardShortcutsMessage,
  nextDashboard,
  previousDashboard,
  selectedDashboardGroup,
  selectedDashboard,
  shouldShowDashboardsHeader,
  shouldShowDashboardsHeaderPermanently,
  shouldShowKeyboardShortcutsMessage,
  showDashboard,
  showDashboardGroup,
  showKeyboardShortcutsMessage,
  toggleDashboardsSlideShowPlay,
  toggleShouldShowDashboardsHeaderPermanently
}: Props) => {
  const stopEventPropagation = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      cancelDelayedDashboardsHeaderHide();
    },
    [cancelDelayedDashboardsHeaderHide]
  );

  const dashboardDropDownItems = useMemo(() => {
    if (activeDashboardsTabPane === 'ALL') {
      return selectedDashboardGroup?.dashboards
        .filter((dashboard: Dashboard) => dashboard.name.includes(dashboardNameFilterText))
        .map((dashboard: Dashboard) => (
          <Dropdown.Item
            key={dashboard.name}
            text={dashboard.name}
            value={dashboard.name}
            onClick={() => showDashboard(dashboard)}
          />
        ));
    } else {
      return null;
    }
  }, [activeDashboardsTabPane, dashboardNameFilterText, selectedDashboardGroup?.dashboards, showDashboard]);

  const dashboardGroupDropDownItems = useMemo(() => {
    if (activeDashboardGroupsTabPane === 'ALL') {
      return dashboardGroups
        .filter((dashboardGroup: DashboardGroup) => dashboardGroup.name.includes(dashboardGroupNameFilterText))
        .map((dashboardGroup: DashboardGroup) => (
          <Dropdown.Item
            key={dashboardGroup.name}
            text={dashboardGroup.name}
            value={dashboardGroup.name}
            onClick={() => showDashboardGroup(dashboardGroup)}
          />
        ));
    } else {
      return null;
    }
  }, [activeDashboardGroupsTabPane, dashboardGroupNameFilterText, dashboardGroups, showDashboardGroup]);

  const dashboardSelectorContent = (() => {
    if (selectedDashboard) {
      return (
        <Dropdown scrolling className={styles.dashboardSelector} text={selectedDashboard.name}>
          <Dropdown.Menu>
            <Input
              fluid
              size="small"
              icon="search"
              iconPosition="left"
              onClick={stopEventPropagation}
              onChange={(__, { value }: any) => filterDashboards(value)}
            />
            <div className={styles.tabs}>
              <span
                className={activeDashboardsTabPane === 'ALL' ? styles.selected : ''}
                onClick={_.flow(stopEventPropagation, () => activateDashboardsTabPane('ALL'))}
              >
                ALL
              </span>
              <span
                className={activeDashboardsTabPane === 'FAVORITES' ? styles.selected : ''}
                onClick={_.flow(stopEventPropagation, () => activateDashboardsTabPane('FAVORITES'))}
              >
                FAVORITES
              </span>
            </div>
            {dashboardDropDownItems}
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return null;
  })();

  const dashboardGroupSelectorContent = (() => {
    if (selectedDashboardGroup) {
      return (
        <Dropdown scrolling className={styles.dashboardGroupSelector} text={selectedDashboardGroup.name}>
          <Dropdown.Menu>
            <Input
              fluid
              size="small"
              icon="search"
              iconPosition="left"
              onClick={stopEventPropagation}
              onChange={(__, { value }: any) => filterDashboardGroups(value)}
            />
            <div className={styles.tabs}>
              <span
                className={activeDashboardGroupsTabPane === 'ALL' ? styles.selected : ''}
                onClick={_.flow(stopEventPropagation, () => activateDashboardGroupsTabPane('ALL'))}
              >
                ALL
              </span>
              <span
                className={activeDashboardGroupsTabPane === 'FAVORITES' ? styles.selected : ''}
                onClick={_.flow(stopEventPropagation, () => activateDashboardGroupsTabPane('FAVORITES'))}
              >
                FAVORITES
              </span>
            </div>
            {dashboardGroupDropDownItems}
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    return null;
  })();

  const className = classNames(styles.header, {
    [styles.visible]: shouldShowDashboardsHeader || shouldShowDashboardsHeaderPermanently,
    [styles.fullScreen]: isFullScreenModeActive
  });

  const pointerIsCoarse = window.matchMedia && window.matchMedia('screen and (any-pointer: coarse)').matches;

  return pointerIsCoarse ? (
    <header className={styles.header}>
      <Icon
        className={styles.actionIcon}
        size="big"
        name="angle left"
        onClick={() => showDashboard(previousDashboard)}
      />
      <div className={styles.dashboardSelectors}>
        {dashboardSelectorContent}
        {dashboardGroupSelectorContent}
      </div>
      <Icon className={styles.actionIcon} size="big" name="angle right" onClick={() => showDashboard(nextDashboard)} />
    </header>
  ) : (
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
      <div>
        <DashboardsSlideShowSlideChangeIntervalInputView
          changeDashboardsSlideChangeInterval={changeDashboardsSlideChangeInterval}
          slideChangeIntervalInSecsStr={dashboardSlideChangeIntervalInSecsStr}
        />
        <DashboardsSlideShowPlayOrPauseButtonView
          isDashboardsSlideShowPlaying={isDashboardsSlideShowPlaying}
          toggleDashboardsSlideShowPlay={toggleDashboardsSlideShowPlay}
        />
        <Popup
          content="Show keyboard shortcuts"
          inverted
          mouseEnterDelay={1000}
          trigger={
            <Icon className={styles.actionIcon} name="keyboard" onClick={showKeyboardShortcutsMessage} size="large" />
          }
        />
        <DashboardsPageHeaderPinIconView
          shouldShowDashboardsHeaderPermanently={shouldShowDashboardsHeaderPermanently}
          toggleShouldShowDashboardsHeaderPermanently={toggleShouldShowDashboardsHeaderPermanently}
        />
      </div>
      {shouldShowKeyboardShortcutsMessage ? (
        <KeyboardShortcutsMessageView onDismissMessage={hideKeyboardShortcutsMessage} />
      ) : undefined}
    </header>
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(DashboardsPageHeaderView);
