// @flow

import type { Element } from 'react';
import React from 'react';
import { List } from 'semantic-ui-react';
import styles from './ListItemsView.module.scss';

type Props = $Exact<{
  listItems: Array<Element<any>>,
  noContentFirstLineText: string,
  noContentSecondLineText: string,
}>;

const ListItemsView = ({ listItems, noContentFirstLineText, noContentSecondLineText }: Props): Element<any> => {
  let listItemsContent;

  if (listItems.length > 0) {
    listItemsContent = <List>{listItems}</List>;
  } else {
    listItemsContent = (
      <div className={styles.noContent}>
        {' '}
        {noContentFirstLineText}
        <br />
        {noContentSecondLineText}
      </div>
    );
  }

  return <div className={styles.list}>{listItemsContent}</div>;
};

export default ListItemsView;
