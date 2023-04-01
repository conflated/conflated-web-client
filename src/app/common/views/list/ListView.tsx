/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { List } from 'semantic-ui-react';
import { Draggable } from 'react-drag-reorder';
import styles from './ListView.module.scss';

type Props = {
  className?: string;
  listItems: Array<JSX.Element>;
  itemsAreReorderable?: boolean;
  noContentFirstLineText: string;
  noContentSecondLineText: string;
};

const ListView: React.FC<Props> = ({
  className,
  listItems,
  itemsAreReorderable,
  noContentFirstLineText,
  noContentSecondLineText
}: Props) => {
  const listItemsContent = (() => {
    if (listItems.length > 0) {
      if (itemsAreReorderable) {
        return (
          <List>
            <Draggable onPosChange={() => {}}>{listItems}</Draggable>
          </List>
        );
      } else {
        return <List>{listItems}</List>;
      }
    } else {
      return (
        <div className={styles.noContent}>
          {' '}
          {noContentFirstLineText}
          <br />
          {noContentSecondLineText}
        </div>
      );
    }
  })();

  return (
    <div className={`${styles.list} ${listItems.length > 0 && className ? className : ''}`}>{listItemsContent}</div>
  );
};

ListView.defaultProps = {
  className: undefined,
  itemsAreReorderable: false
};

export default ListView;
