import React from 'react';
import type { ListItemViewProps } from '../../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../../common/view/listitems/listitem/ListItemView';

type Named = {
  name: string;
};

const DraggableDimensionListItemView = ({ item, ...restOfProps }: ListItemViewProps<Named>) => (
  <ListItemView draggable dragEventDataKey="chartId" iconName="chart area" item={item} {...restOfProps} />
);

export default DraggableDimensionListItemView;
