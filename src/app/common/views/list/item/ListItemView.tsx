/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { List, Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import _ from 'lodash';
import styles from './ListItemView.module.scss';
import stopEventPropagation from '../../../utils/stopEventPropagation';

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
  key: string;
  onItemClick: (item: T | undefined) => void;
  onItemDblClick?: (...args: any[]) => void;
  onItemLongClick?: () => void;
  selectedItem?: T | null;
  actions?: ListItemAction[];
};

const { listItem, listItemContent, listItemActionIcon, selected } = styles;

const ListItemView = <T extends { readonly name: string }>({
  actions,
  dragEventDataKey,
  draggable,
  iconClassName,
  iconName,
  item,
  key,
  onItemDblClick,
  onItemLongClick,
  onItemClick,
  selectedItem
}: ListItemViewProps<T>) => {
  const [lastMouseDownTimestampInMs, setLastMouseDownTimestampInMs] = useState(0);
  const [clickCount, setClickCount] = useState(1);
  const [clickTimerId, setClickTimerId] = useState(undefined as NodeJS.Timeout | undefined);
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(dragEventDataKey ?? '', event.currentTarget.id);
  };

  const handleMouseDown = () => {
    setLastMouseDownTimestampInMs(Date.now());
  };

  const handleItemClick = () => {
    setClickCount(clickCount + 1);

    if (clickCount === 1) {
      setClickTimerId(
        setTimeout(() => {
          setClickCount(1);
          onItemClick(item);
        }, 250)
      );
    } else if (clickCount === 2) {
      clearTimeout(clickTimerId);
      setClickCount(1);
      onItemDblClick?.();
    }
  };

  const handleMouseUp = () => {
    if (lastMouseDownTimestampInMs && Date.now() - lastMouseDownTimestampInMs > 1000) {
      onItemLongClick?.();
    }
  };

  const className = classNames(listItem, { [selected]: item.name === (selectedItem?.name ?? '') });

  let listIcon: any;
  if (iconName) {
    listIcon = <List.Icon className={iconClassName || ''} name={iconName as any} />;
  }

  let actionIcons: any;
  if (actions) {
    actionIcons = actions.map((action) => {
      const iconElem = (
        <List.Icon
          className={listItemActionIcon}
          name={action.iconName as any}
          onClick={_.flow(stopEventPropagation, action.perform)}
        />
      );

      if (action.tooltipText) {
        return (
          <Popup
            content={action.tooltipText}
            inverted
            key={action.iconName}
            mouseEnterDelay={1000}
            trigger={iconElem}
          />
        );
      } else {
        return iconElem;
      }
    });
  }

  return item.name ? (
    <div key={key} id={item.name} draggable={draggable} onDragStart={onDragStart}>
      <List.Item className={className} onClick={_.flow(stopEventPropagation, handleItemClick)}>
        {listIcon}
        <List.Content
          className={listItemContent}
          onMouseDown={_.flow(stopEventPropagation, handleMouseDown)}
          onMouseUp={_.flow(stopEventPropagation, handleMouseUp)}
        >
          {item.name}
        </List.Content>
        <div className={styles.actionIcons}>{actionIcons}</div>
      </List.Item>
    </div>
  ) : (
    <div />
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
