import React from 'react';
import type { ListItemViewProps } from '../listitems/listitem/ListItemView';
import ListItemView from '../listitems/listitem/ListItemView';
import type { Measure } from '../../../pages/dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';

const MeasureListItemView = (props: ListItemViewProps<Measure>) => <ListItemView iconName="dashboard" {...props} />;

export default MeasureListItemView;
