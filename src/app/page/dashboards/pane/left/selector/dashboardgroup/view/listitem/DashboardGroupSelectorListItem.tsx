import React from 'react';
import type { ListItemViewProps } from '../../../../../../../../common/views/list/item/ListItemView';
import ListItemView from '../../../../../../../../common/views/list/item/ListItemView';
import type { DashboardGroup } from '../../../../../../model/state/types/DashboardGroup';

const DashboardGroupSelectorListItem = (props: ListItemViewProps<DashboardGroup>) => <ListItemView {...props} />;

export default DashboardGroupSelectorListItem;
