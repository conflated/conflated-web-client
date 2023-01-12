// @flow

import type { Element } from 'react';
import React from 'react';
import type { ListItemViewProps } from '../listitems/listitem/ListItemView';
import type { Dimension } from '../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import ListItemView from '../listitems/listitem/ListItemView';

const DimensionListItemView = (props: ListItemViewProps<Dimension>): Element<any> => (
  // eslint-disable-next-line react/destructuring-assignment
  <ListItemView iconName={`${props.item.isTimestamp ? 'calendar outline alternate' : 'cube'}`} {...props} />
);

export default DimensionListItemView;
