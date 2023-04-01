import _ from 'lodash';
import OOReduxUtils from 'oo-redux-utils2';
import type { DashboardsPageState } from './DashboardsPageState';
import AbstractDashboardsPageAction from '../actions/AbstractDashboardsPageAction';

const initialDashboardsState: DashboardsPageState = {
  dashboardGroups: [],
  selectedDashboardGroup: undefined,
  selectedDashboard: undefined,
  isFetchingDashboardGroups: false,
  isDashboardsSlideShowPlaying: false,
  dashboardsSlideShowIntervalId: setInterval(() => _.noop(), Number.MAX_SAFE_INTEGER),
  dashboardSlideChangeIntervalInSecsStr: '90',
  dashboardIndexShownInSlideShow: 0,
  screenWakeLockPromise: undefined
};

export default OOReduxUtils.createStateReducer<DashboardsPageState>(
  initialDashboardsState,
  AbstractDashboardsPageAction
);
