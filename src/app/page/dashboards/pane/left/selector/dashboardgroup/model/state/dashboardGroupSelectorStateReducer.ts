import OOReduxUtils from 'oo-redux-utils2';
import { DashboardGroupSelectorState } from './DashboardGroupSelectorState';
import AbstractDashboardGroupSelectorAction from '../actions/AbstractDashboardGroupSelectorAction';

const initialDashboardGroupSelectorState: DashboardGroupSelectorState = {
  dashboardGroupToBeDeleted: undefined,
  dashboardGroupToBeRenamed: undefined
};

export default OOReduxUtils.createStateReducer<DashboardGroupSelectorState>(
  initialDashboardGroupSelectorState,
  AbstractDashboardGroupSelectorAction
);
