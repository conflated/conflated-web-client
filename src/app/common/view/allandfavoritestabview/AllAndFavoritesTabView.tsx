import React from 'react';
import SelectorTabView from '../selectortabview/SelectorTabView';

type Props = {
  firstTabPaneListItems: Array<JSX.Element>;
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
