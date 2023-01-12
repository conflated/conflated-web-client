import React from 'react';
import type { ListItemViewProps } from '../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../common/view/listitems/listitem/ListItemView';
import type { DashboardGroup } from '../../../../model/state/entities/DashboardGroup';

export default function DashboardGroupListItem(props: ListItemViewProps<DashboardGroup>) {
  return <ListItemView {...props} />;
}
