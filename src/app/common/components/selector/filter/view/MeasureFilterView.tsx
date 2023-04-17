import React from 'react';
import { Dropdown, Icon, List } from 'semantic-ui-react';
import styles from './FilterView.module.scss';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { FilterInputType } from '../../../chartarea/chart/model/state/filters/filter/inputtype/FilterInputType';
import type { DataScopeType } from '../../../chartarea/chart/model/state/types/DataScopeType';
import AggregationFunctionPickerView from '../../../../views/picker/aggregationfunction/AggregationFunctionPickerView';
import type { Chart } from '../../../chartarea/chart/model/state/Chart';
import DataScopePickerView from '../../../../views/picker/datascope/DataScopePickerView';
import type { Filter } from '../../../chartarea/chart/model/state/filters/filter/Filter';

type Props = {
  changeFilterAggregationFunction: (aggregationFunction: AggregationFunction) => void;
  changeFilterExpression: (expression: string) => void;
  changeFilterInputType: (filterInputType: FilterInputType) => void;
  changeFilterDataScopeType: (dataScopeType: DataScopeType) => void;
  chart: Chart;
  removeFilter: () => void;
  filter: Filter;
};

const MeasureFilterView = ({
  changeFilterAggregationFunction,
  changeFilterExpression,
  changeFilterInputType,
  changeFilterDataScopeType,
  chart,
  removeFilter,
  filter
}: Props) => (
  <List.Item className={styles.listItem} key={filter.measureOrDimension.name}>
    <AggregationFunctionPickerView
      aggregationFunctions={chart.getSupportedAggregationFunctions()}
      changeAggregationFunction={changeFilterAggregationFunction}
      selectedAggregationFunction={filter.aggregationFunction}
    />
    <div className={styles.measureOrDimensionName}>{filter.measureOrDimension.name}</div>
    <DataScopePickerView
      changeDataScopeType={changeFilterDataScopeType}
      className={styles.dataScopePicker}
      selectedDataScopeType={filter.dataScopeType}
    />
    <Dropdown className={styles.filterInputType} icon="setting">
      <Dropdown.Menu direction="left">
        <Dropdown.Item text="Input filter" value="Input filter" onClick={() => changeFilterInputType('Input filter')} />
        <Dropdown.Item text="Range filter" value="Range filter" onClick={() => changeFilterInputType('Range filter')} />
      </Dropdown.Menu>
    </Dropdown>
    <Icon className={styles.icon} name="close" onClick={() => removeFilter()} />
    {filter.getFilterInputView(styles.filterInput, chart.data, changeFilterExpression)}
  </List.Item>
);
export default MeasureFilterView;
