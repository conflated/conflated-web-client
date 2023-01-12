import React from 'react';
import { Dropdown, Icon, List } from 'semantic-ui-react';
import styles from '../SelectedFilterView.module.scss';
import type { AggregationFunction } from '../../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { FilterInputType } from '../../../../chartarea/chart/model/state/selectedfilters/selectedfilter/types/FilterInputType';
import type { DataScopeType } from '../../../../../model/state/types/DataScopeType';
import AggregationFunctionPickerView from '../../../../../view/aggregationfunctionpicker/AggregationFunctionPickerView';
import type { Chart } from '../../../../chartarea/chart/model/state/Chart';
import DataScopePickerView from '../../../../../view/datascopepicker/DataScopePickerView';
import type { SelectedFilter } from '../../../../chartarea/chart/model/state/selectedfilters/selectedfilter/SelectedFilter';

type Props = {
  changeSelectedFilterAggregationFunction: (aggregationFunction: AggregationFunction) => void;
  changeSelectedFilterExpression: (expression: string) => void;
  changeSelectedFilterInputType: (filterInputType: FilterInputType) => void;
  changeSelectedFilterDataScopeType: (dataScopeType: DataScopeType) => void;
  chart: Chart;
  removeSelectedFilter: () => void;
  selectedFilter: SelectedFilter;
};

export default function MeasureSelectedFilterView({
  changeSelectedFilterAggregationFunction,
  changeSelectedFilterExpression,
  changeSelectedFilterInputType,
  changeSelectedFilterDataScopeType,
  chart,
  removeSelectedFilter,
  selectedFilter
}: Props) {
  return (
    <List.Item key={selectedFilter.measureOrDimension.name}>
      <AggregationFunctionPickerView
        aggregationFunctions={chart.getSupportedAggregationFunctions()}
        changeAggregationFunction={changeSelectedFilterAggregationFunction}
        selectedAggregationFunction={selectedFilter.aggregationFunction}
      />
      <div className={styles.measureOrDimensionName}>{selectedFilter.measureOrDimension.name}</div>
      <DataScopePickerView
        changeDataScopeType={changeSelectedFilterDataScopeType}
        selectedDataScopeType={selectedFilter.dataScopeType}
      />
      <Dropdown className={styles.icon} icon="setting">
        <Dropdown.Menu direction="left">
          <Dropdown.Item
            text="Input filter"
            value="Input filter"
            onClick={() => changeSelectedFilterInputType('Input filter')}
          />
          <Dropdown.Item
            text="Range filter"
            value="Range filter"
            onClick={() => changeSelectedFilterInputType('Range filter')}
          />
        </Dropdown.Menu>
      </Dropdown>
      <Icon className={styles.icon} name="close" onClick={() => removeSelectedFilter()} />
      {selectedFilter.getFilterInputView(styles.filterInput, chart.chartData, changeSelectedFilterExpression)}
    </List.Item>
  );
}
