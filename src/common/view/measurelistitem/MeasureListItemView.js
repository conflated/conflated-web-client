// @flow

import type { Element } from 'react';
import React from 'react';
import type { ListItemViewProps } from '../listitems/listitem/ListItemView';
import ListItemView from '../listitems/listitem/ListItemView';
import type { Measure } from '../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';

const MeasureListItemView = (props: ListItemViewProps<Measure>): Element<any> => (
  <ListItemView iconName="dashboard" {...props} />
);

export default MeasureListItemView;
