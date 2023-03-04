/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { List, Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import styles from './ListItemView.module.scss';

export type ListItemAction = {
  iconName: string;
  perform: () => void;
  tooltipText?: string;
};

export type ListItemViewProps<T extends { readonly name: string }> = {
  dragEventDataKey?: string;
  draggable?: boolean;
  iconClassName?: string;
  iconName?: string;
  item: T;
  onItemClick: (item: T | undefined) => void;
  onItemDblClick?: () => void;
  onItemLongClick?: () => void;
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
  onItemDblClick,
  onItemLongClick,
  onItemClick,
  selectedItem
}: ListItemViewProps<T>) => {
  const [lastMouseDownTimestampInMs, setLastMouseDownTimestampInMs] = useState(0);
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(dragEventDataKey ?? '', event.currentTarget.id);
  };

  const handleMouseDown = () => {
    setLastMouseDownTimestampInMs(Date.now());
  };

  const handleMouseUp = () => {
    if (lastMouseDownTimestampInMs && Date.now() - lastMouseDownTimestampInMs > 1000) {
      onItemLongClick?.();
    }
  };

  const performAction = (event: React.MouseEvent, action: ListItemAction) => {
    event.stopPropagation();
    event.preventDefault();
    action.perform();
  };

  const className = classNames(listItem, { [selected]: item.name === (selectedItem?.name ?? '') });

  let listIcon;
  if (iconName) {
    listIcon = <List.Icon className={iconClassName || listItemIcon} name={iconName as any} />;
  }

  let actionIcons;
  if (actions) {
    actionIcons = actions.map((action) => {
      if (action.tooltipText) {
        return (
          <Popup
            content={action.tooltipText}
            inverted
            key={action.iconName}
            trigger={
              <List.Icon
                className={listItemIcon}
                name={action.iconName as any}
                onClick={(event: React.MouseEvent) => performAction(event, action)}
              />
            }
          />
        );
      } else {
        return (
          <List.Icon
            className={listItemIcon}
            key={action.iconName}
            name={action.iconName as any}
            onClick={(event: React.MouseEvent) => performAction(event, action)}
          />
        );
      }
    });
  }

  return (
    <div id={item.name} draggable={draggable} onDragStart={onDragStart}>
      <List.Item className={className} onClick={() => onItemClick(item)}>
        {listIcon}
        <List.Content
          className={listItemContent}
          onDoubleClick={onItemDblClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {item.name}{' '}
        </List.Content>
        <div style={{ whiteSpace: 'nowrap' }}>{actionIcons}</div>
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
  selectedItem: null,
  onItemDblClick: undefined,
  onItemLongClick: undefined
};

export default ListItemView;
