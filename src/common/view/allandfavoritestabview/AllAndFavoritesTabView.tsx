import React from 'react';
import SelectorTabView from '../selectortabview/SelectorTabView';

type Props = {
  firstTabPaneListItems: Array<JSX.Element>;
  secondTabPaneListItems: Array<JSX.Element>;
};

const AllAndFavoritesTabView = ({ firstTabPaneListItems, secondTabPaneListItems }: Props) => (
  <SelectorTabView
    firstTabPaneName="ALL"
    firstTabPaneListItems={firstTabPaneListItems}
    secondTabPaneName="FAVORITES"
    secondTabPaneListItems={secondTabPaneListItems}
  />
);

export default AllAndFavoritesTabView;
