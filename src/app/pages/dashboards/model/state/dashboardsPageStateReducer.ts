import _ from 'lodash';
import OOReduxUtils from 'oo-redux-utils2';
import type { DashboardsState } from './DashboardsState';
import AbstractDashboardsPageAction from '../actions/AbstractDashboardsPageAction';

const initialDashboardsState: DashboardsState = {
  dashboardGroups: [],
  selectedDashboardGroup: undefined,
  selectedDashboard: undefined,
  isFetchingDashboardGroups: false,
  isDashboardsSlideShowPlaying: false,
  dashboardsSlideShowIntervalId: setInterval(() => _.noop(), Number.MAX_SAFE_INTEGER),
  dashboardSlideChangeIntervalInSecsStr: '90',
  dashboardIndexShownInSlideShow: 0
};

export default OOReduxUtils.createStateReducer<DashboardsState>(initialDashboardsState, AbstractDashboardsPageAction);
