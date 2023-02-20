import React from 'react';
import type { ListItemViewProps } from '../../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../../common/view/listitems/listitem/ListItemView';
import type { DashboardGroup } from '../../../../model/state/types/DashboardGroup';

const DashboardGroupListItem = (props: ListItemViewProps<DashboardGroup>) => <ListItemView {...props} />;

export default DashboardGroupListItem;
