// @flow

import type { Element } from 'react';
import React from 'react';
import MeasuresAndDimensionsTabView from '../../../../view/measuresanddimensionstabview/MeasuresAndDimensionsTabView';

type Props = {
  measureListItems: Array<Element<any>>,
  dimensionListItems: Array<Element<any>>,
  timeSortOptionListItems?: Array<Element<any>>
};

const MeasuresDimensionsAndTimeSortOptionsTabView = ({
  measureListItems,
  dimensionListItems,
  timeSortOptionListItems
}: Props): Element<any> => (
  <MeasuresAndDimensionsTabView
    measureListItems={measureListItems}
    dimensionListItems={dimensionListItems}
    thirdTabPaneName="TIME"
    thirdTabPaneListItems={timeSortOptionListItems}
  />
);

MeasuresDimensionsAndTimeSortOptionsTabView.defaultProps = {
  timeSortOptionListItems: undefined
};

export default MeasuresDimensionsAndTimeSortOptionsTabView;
