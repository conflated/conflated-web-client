import React from 'react';
import ListItemView, { ListItemViewProps } from '../../../../../views/list/item/ListItemView';

type Named = {
  name: string;
};

const TimeSortOptionListItemView = (props: ListItemViewProps<Named>) => (
  // eslint-disable-next-line react/destructuring-assignment
  <ListItemView iconName="calendar outline alternate" {...props} />
);

export default TimeSortOptionListItemView;
