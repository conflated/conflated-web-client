import React from 'react';
import type { ListItemViewProps } from '../../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../../common/view/listitems/listitem/ListItemView';
import type { Dashboard } from '../../../../model/state/types/Dashboard';

const DashboardListItem = (props: ListItemViewProps<Dashboard>) => <ListItemView {...props} />;

export default DashboardListItem;
