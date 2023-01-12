// @flow

import type { Element } from 'react';
import React from 'react';
import { Dropdown, Icon, List } from 'semantic-ui-react';
import styles from '../SortBySelectorView.module.scss';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { SortDirection } from '../../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/SortDirection';
import type { SelectedSortBy } from '../../../chartarea/chart/model/state/selectedsortbys/selectedsortby/SelectedSortBy';
import type { DataScopeType } from '../../../../model/state/types/DataScopeType';
import AggregationFunctionPickerView from '../../../../view/aggregationfunctionpicker/AggregationFunctionPickerView';
import type { Chart } from '../../../chartarea/chart/model/state/Chart';
import DataScopePickerView from '../../../../view/datascopepicker/DataScopePickerView';

const { icon, listItem, measureOrDimensionOrTimeSortOptionName, sortDirectionSelector } = styles;

type Props = {
  changeSelectedSortByAggregationFunction: (aggregationFunction: AggregationFunction) => void,
  changeSelectedSortByDataScopeType: (dataScopeType: DataScopeType) => void,
  changeSelectedSortByDirection: (sortDirection: SortDirection) => void,
  chart: Chart,
  selectedSortBy: SelectedSortBy,
  removeSelectedSortBy: () => void,
};

const SelectedSortByListItemView = ({
  changeSelectedSortByAggregationFunction,
  changeSelectedSortByDataScopeType,
  changeSelectedSortByDirection,
  chart,
  removeSelectedSortBy,
  selectedSortBy,
}: Props): Element<any> => {
  const sortByName = selectedSortBy.measureOrDimension.name || selectedSortBy.timeSortOption;
  let aggregationFunctionPickerView;

  if (selectedSortBy.type === 'measure' && selectedSortBy.aggregationFunction !== 'NONE') {
    aggregationFunctionPickerView = (
      <AggregationFunctionPickerView
        aggregationFunctions={chart.getSupportedAggregationFunctions()}
        changeAggregationFunction={changeSelectedSortByAggregationFunction}
        selectedAggregationFunction={selectedSortBy.aggregationFunction}
      />
    );
  }

  return (
    <List.Item className={listItem} key={sortByName}>
      <Dropdown className={sortDirectionSelector} text={selectedSortBy.sortDirection}>
        <Dropdown.Menu>
          <Dropdown.Item text="ASC" onClick={() => changeSelectedSortByDirection('ASC')} />
          <Dropdown.Item text="DESC" onClick={() => changeSelectedSortByDirection('DESC')} />
        </Dropdown.Menu>
      </Dropdown>
      {aggregationFunctionPickerView}
      <div className={measureOrDimensionOrTimeSortOptionName}>{sortByName}</div>
      <DataScopePickerView
        changeDataScopeType={changeSelectedSortByDataScopeType}
        selectedDataScopeType={selectedSortBy.dataScopeType}
      />
      <Icon className={icon} name="close" onClick={removeSelectedSortBy} />
    </List.Item>
  );
};

export default SelectedSortByListItemView;
