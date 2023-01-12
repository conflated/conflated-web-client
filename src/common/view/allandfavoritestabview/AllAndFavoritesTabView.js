// @flow

import type { Element } from 'react';
import React from 'react';
import SelectorTabView from '../selectortabview/SelectorTabView';

type Props = $Exact<{
  firstTabPaneListItems: Array<Element<any>>,
  secondTabPaneListItems: Array<Element<any>>
}>;

const AllAndFavoritesTabView = ({
  firstTabPaneListItems,

  secondTabPaneListItems
}: Props): Element<any> => (
  <SelectorTabView
    firstTabPaneName="ALL"
    firstTabPaneListItems={firstTabPaneListItems}
    secondTabPaneName="FAVORITES"
    secondTabPaneListItems={secondTabPaneListItems}
  />
);

export default AllAndFavoritesTabView;
