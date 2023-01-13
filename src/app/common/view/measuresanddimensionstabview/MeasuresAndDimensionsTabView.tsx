import React from 'react';
import SelectorTabView from '../selectortabview/SelectorTabView';

type Props = {
  dimensionListItems: Array<JSX.Element>;
  measureListItems: Array<JSX.Element>;
  thirdTabPaneListItems?: Array<JSX.Element>;
  thirdTabPaneName?: string;
};

const MeasuresAndDimensionsTabView: React.FC<Props> = ({
  dimensionListItems,
  measureListItems,
  thirdTabPaneListItems,
  thirdTabPaneName
}: Props) => (
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
