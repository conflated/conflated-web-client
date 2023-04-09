import React from 'react';
import type { ListItemViewProps } from '../../../../../../../../common/views/list/item/ListItemView';
import ListItemView from '../../../../../../../../common/views/list/item/ListItemView';
import type { DataSource } from '../../../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';

const DataSourceListItem = (props: ListItemViewProps<DataSource>) => <ListItemView {...props} />;

export default DataSourceListItem;
