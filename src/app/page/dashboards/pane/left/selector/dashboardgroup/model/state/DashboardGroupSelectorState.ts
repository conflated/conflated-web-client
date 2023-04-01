import { DashboardGroup } from '../../../../../../model/state/types/DashboardGroup';

export type DashboardGroupSelectorState = {
  readonly dashboardGroupToBeDeleted?: DashboardGroup;
  readonly dashboardGroupToBeRenamed?: DashboardGroup;
};
