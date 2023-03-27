import React from 'react';
import SelectorTabView from '../selector/SelectorTabView';

type Props = {
  firstTabPaneListItems: Array<JSX.Element> | JSX.Element;
  isListItemReorderModeActive?: boolean;
  secondTabPaneListItems: Array<JSX.Element>;
};

const AllAndFavoritesTabView: React.FC<Props> = ({
  firstTabPaneListItems,
  isListItemReorderModeActive,
  secondTabPaneListItems
}: Props) => (
  <SelectorTabView
    firstTabPaneName="ALL"
    firstTabPaneListItems={firstTabPaneListItems}
    listItemsAreReorderable={isListItemReorderModeActive}
    secondTabPaneName="FAVORITES"
    secondTabPaneListItems={secondTabPaneListItems}
  />
);

AllAndFavoritesTabView.defaultProps = {
  isListItemReorderModeActive: false
};

export default AllAndFavoritesTabView;
