import React from 'react';
import type { ListItemViewProps } from './ListItemView';
import ListItemView from './ListItemView';
import type { Measure } from '../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import styles from './MeasureListItemView.module.scss';

const MeasureListItemView = (props: ListItemViewProps<Measure>) => (
  <ListItemView iconClassName={styles.icon} {...props} />
);

export default MeasureListItemView;
