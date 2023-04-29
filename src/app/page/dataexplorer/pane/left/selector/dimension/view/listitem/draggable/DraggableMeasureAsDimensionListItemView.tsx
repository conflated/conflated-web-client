import React from 'react';
import type { Measure } from '../../../../measure/model/state/types/Measure';
import type { ListItemViewProps } from '../../../../../../../../../common/views/list/item/ListItemView';
import ListItemView from '../../../../../../../../../common/views/list/item/ListItemView';

const DraggableMeasureAsDimensionListItemView = (props: ListItemViewProps<Measure>) => (
  <ListItemView draggable dragEventDataKey="measureName" iconName="dashboard" {...props} />
);

export default DraggableMeasureAsDimensionListItemView;
