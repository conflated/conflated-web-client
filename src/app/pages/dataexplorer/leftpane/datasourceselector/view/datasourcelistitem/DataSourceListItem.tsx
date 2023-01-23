import React from 'react';
import type { ListItemViewProps } from '../../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../../common/view/listitems/listitem/ListItemView';
import type { DataSource } from '../../../../../../common/model/state/datasource/DataSource';

const DataSourceListItem = (props: ListItemViewProps<DataSource>) => <ListItemView {...props} />;

export default DataSourceListItem;
