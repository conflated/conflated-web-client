import OOReduxUtils from 'oo-redux-utils2';
import { DashboardGroupSelectorState } from './DashboardGroupSelectorState';
import AbstractDashboardGroupSelectorAction from '../actions/AbstractDashboardGroupSelectorAction';

const initialDashboardGroupSelectorState: DashboardGroupSelectorState = {
  dashboardGroupToBeRenamed: undefined
};

export default OOReduxUtils.createStateReducer<DashboardGroupSelectorState>(
  initialDashboardGroupSelectorState,
  AbstractDashboardGroupSelectorAction
);
