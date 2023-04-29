import React from 'react';
import { ListItemViewProps } from '../../../../../../../common/views/list/item/ListItemView';
import { Measure } from '../model/state/types/Measure';
import MeasureListItemView from '../../../../../../../common/views/list/item/MeasureListItemView';

const DraggableMeasureListItemView = ({ ...props }: ListItemViewProps<Measure>) => (
  <MeasureListItemView draggable dragEventDataKey="measureName" {...props} />
);

export default DraggableMeasureListItemView;
