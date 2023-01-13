import React from 'react';
import { List } from 'semantic-ui-react';
import styles from './ListItemsView.module.scss';

type Props = {
  listItems: Array<JSX.Element>;
  noContentFirstLineText: string;
  noContentSecondLineText: string;
};

const ListItemsView = ({ listItems, noContentFirstLineText, noContentSecondLineText }: Props) => {
  const listItemsContent = (() => {
    if (listItems.length > 0) {
      return <List>{listItems}</List>;
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

  return <div className={styles.list}>{listItemsContent}</div>;
};

export default ListItemsView;
