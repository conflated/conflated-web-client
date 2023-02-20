import React from 'react';
import type { Measure } from '../../../measureselector/model/state/types/Measure';
import type { ListItemViewProps } from '../../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../../common/view/listitems/listitem/ListItemView';

const DraggableMeasureAsDimensionListItemView = (props: ListItemViewProps<Measure>) => (
  <ListItemView draggable dragEventDataKey="measureName" iconName="dashboard" {...props} />
);

export default DraggableMeasureAsDimensionListItemView;
