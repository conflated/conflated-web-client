import React from 'react';
import type { ListItemViewProps } from '../../../../../../../../common/views/list/item/ListItemView';
import ListItemView from '../../../../../../../../common/views/list/item/ListItemView';
import type { Dashboard } from '../../../../../../model/state/types/Dashboard';

const DashboardSelectorListItemView = (props: ListItemViewProps<Dashboard>) => <ListItemView {...props} />;

export default DashboardSelectorListItemView;
