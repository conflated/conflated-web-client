import React from 'react';
import type { ListItemViewProps } from '../../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../../common/view/listitems/listitem/ListItemView';
import type { Dashboard } from '../../../../model/state/entities/Dashboard';

export default function DashboardListItem(props: ListItemViewProps<Dashboard>) {
  return <ListItemView {...props} />;
}
