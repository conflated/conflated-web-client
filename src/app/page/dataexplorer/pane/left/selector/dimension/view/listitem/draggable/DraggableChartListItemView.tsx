import React from 'react';
import type { ListItemViewProps } from '../../../../../../../../../common/views/list/item/ListItemView';
import ListItemView from '../../../../../../../../../common/views/list/item/ListItemView';

type Named = {
  name: string;
};

const DraggableDimensionListItemView = ({ item, ...restOfProps }: ListItemViewProps<Named>) => (
  <ListItemView draggable dragEventDataKey="chartId" iconName="chart area" item={item} {...restOfProps} />
);

export default DraggableDimensionListItemView;
