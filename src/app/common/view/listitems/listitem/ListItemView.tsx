import React from 'react';
import { List } from 'semantic-ui-react';
import classNames from 'classnames';
import styles from './ListItemView.module.scss';

export type ListItemAction = {
  iconName: string;
  onClick: () => void;
};

export type ListItemViewProps<T extends { readonly name: string }> = {
  dragEventDataKey?: string;
  draggable?: boolean;
  iconClassName?: string;
  iconName?: string;
  item: T;
  onItemClick: (item: T | undefined) => void;
  selectedItem?: T | null;
  actions?: ListItemAction[];
};

const { listItem, listItemContent, listItemIcon, selected } = styles;

const ListItemView = <T extends { readonly name: string }>({
  actions,
  dragEventDataKey,
  draggable,
  iconClassName,
  iconName,
  item,
  onItemClick,
  selectedItem
}: ListItemViewProps<T>) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(dragEventDataKey ?? '', event.currentTarget.id);
  };

  const className = classNames(listItem, { [selected]: item.name === (selectedItem?.name ?? '') });

  let listIcon;
  if (iconName) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listIcon = <List.Icon className={iconClassName || listItemIcon} name={iconName as any} />;
  }

  let actionIcons;
  if (actions) {
    actionIcons = actions.map((action) => <List.Icon className={listItemIcon} name={action.iconName as any} />);
  }

  return (
    <div id={item.name} draggable={draggable} onDragStart={onDragStart}>
      <List.Item className={className} onClick={() => onItemClick(item)}>
        {listIcon}
        <List.Content className={listItemContent}>{item.name}</List.Content>
        {actionIcons}
      </List.Item>
    </div>
  );
};

ListItemView.defaultProps = {
  actions: undefined,
  dragEventDataKey: '',
  draggable: false,
  iconClassName: '',
  iconName: '',
  selectedItem: null
};

export default ListItemView;
