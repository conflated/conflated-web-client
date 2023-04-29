import React from 'react';
import type { Dimension } from '../../../model/state/types/Dimension';
import type { ListItemViewProps } from '../../../../../../../../../common/views/list/item/ListItemView';
import ListItemView from '../../../../../../../../../common/views/list/item/ListItemView';

const DraggableDimensionListItemView = ({ item, ...restOfProps }: ListItemViewProps<Dimension>) => (
  <ListItemView
    draggable
    dragEventDataKey="dimensionName"
    iconName={`${item.isTimestamp ? 'calendar outline alternate' : 'cube'}`}
    item={item}
    {...restOfProps}
  />
);

export default DraggableDimensionListItemView;
