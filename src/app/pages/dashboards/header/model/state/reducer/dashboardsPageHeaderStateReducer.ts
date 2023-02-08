import _ from 'lodash';
import OOReduxUtils from 'oo-redux-utils2';
import type { DashboardsPageHeaderState } from '../DashboardsPageHeaderState';
import AbstractDashboardsPageHeaderAction from '../../actions/AbstractDashboardsPageHeaderAction';

const initialDashboardsPageHeaderState: DashboardsPageHeaderState = {
  shouldShowDashboardsHeader: false,
  shouldShowDashboardsHeaderPermanently: false,
  dashboardsHeaderHideDelayInMillis: 200,
  dashboardsHeaderHideTimeoutId: setTimeout(() => _.noop(), Number.MAX_SAFE_INTEGER),
  dashboardsHeaderDelayedHideTimeoutId: setTimeout(() => _.noop(), Number.MAX_SAFE_INTEGER)
};

export default OOReduxUtils.createStateReducer<DashboardsPageHeaderState>(initialDashboardsPageHeaderState, [
  AbstractDashboardsPageHeaderAction,
  undefined
]);
