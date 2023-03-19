import React from 'react';
import type { ListItemViewProps } from '../ListItemView';
import ListItemView from '../ListItemView';
import type { Measure } from '../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';

const MeasureListItemView = (props: ListItemViewProps<Measure>) => <ListItemView iconName="dashboard" {...props} />;

export default MeasureListItemView;
