import React from 'react';
import type { Dimension } from '../../model/state/entities/Dimension';
import type { ListItemViewProps } from '../../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../../common/view/listitems/listitem/ListItemView';

export default function DraggableDimensionListItemView({ item, ...restOfProps }: ListItemViewProps<Dimension>) {
  return (
    <ListItemView
      draggable
      dragEventDataKey="dimensionName"
      iconName={`${item.isTimestamp ? 'calendar outline alternate' : 'cube'}`}
      item={item}
      {...restOfProps}
    />
  );
}
