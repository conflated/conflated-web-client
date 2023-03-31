import React from 'react';
import type { ListItemViewProps } from './ListItemView';
import type { Dimension } from '../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import ListItemView from './ListItemView';

const DimensionListItemView = (props: ListItemViewProps<Dimension>) => (
  // eslint-disable-next-line react/destructuring-assignment
  <ListItemView iconName={`${props.item.isTimestamp ? 'calendar outline alternate' : 'cube'}`} {...props} />
);

export default DimensionListItemView;