import React from 'react';
import type { ListItemViewProps } from './ListItemView';
import ListItemView from './ListItemView';

type Named = {
  name: string;
};

const ChartListItemView = (props: ListItemViewProps<Named>) => <ListItemView iconName="chart area" {...props} />;

export default ChartListItemView;
