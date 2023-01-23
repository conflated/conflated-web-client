import React from 'react';
import type { Dimension } from '../../model/state/entities/Dimension';
import type { ListItemViewProps } from '../../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../../common/view/listitems/listitem/ListItemView';

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
