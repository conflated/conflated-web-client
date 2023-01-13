import React from 'react';
import type { ListItemViewProps } from '../../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../../common/view/listitems/listitem/ListItemView';
import type { DataSource } from '../../../../../../common/model/state/datasource/DataSource';

export default function DataSourceListItem(props: ListItemViewProps<DataSource>) {
  return <ListItemView {...props} />;
}
