// @flow

import type { Element } from 'react';
import React from 'react';
import SelectorTabView from '../selectortabview/SelectorTabView';

type Props = $Exact<{
  dimensionListItems: Array<Element<any>>,
  measureListItems: Array<Element<any>>,
  thirdTabPaneListItems?: Array<Element<any>>,
  thirdTabPaneName?: string
}>;

const MeasuresAndDimensionsTabView = ({
  dimensionListItems,
  measureListItems,
  thirdTabPaneListItems,
  thirdTabPaneName
}: Props): Element<any> => (
  <SelectorTabView
    firstTabPaneName="MEASURES"
    firstNoContentLineText="No"
    firstTabPaneListItems={measureListItems}
    secondTabPaneName="DIMENSIONS"
    secondTabPaneListItems={dimensionListItems}
    secondNoContentLineText="Select a data source first"
    thirdTabPaneListItems={thirdTabPaneListItems}
    thirdTabPaneName={thirdTabPaneName}
  />
);

MeasuresAndDimensionsTabView.defaultProps = {
  thirdTabPaneListItems: [],
  thirdTabPaneName: ''
};

export default MeasuresAndDimensionsTabView;
