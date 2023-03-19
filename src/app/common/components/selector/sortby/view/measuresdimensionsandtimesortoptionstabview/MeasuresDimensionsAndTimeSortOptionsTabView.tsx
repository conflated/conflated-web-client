import React from 'react';
import MeasuresAndDimensionsTabView from '../../../../../view/tab/measuresanddimensions/MeasuresAndDimensionsTabView';

type Props = {
  measureListItems: Array<JSX.Element>;
  dimensionListItems: Array<JSX.Element>;
  timeSortOptionListItems?: Array<JSX.Element>;
};

const MeasuresDimensionsAndTimeSortOptionsTabView: React.FC<Props> = ({
  measureListItems,
  dimensionListItems,
  timeSortOptionListItems
}: Props) => (
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
