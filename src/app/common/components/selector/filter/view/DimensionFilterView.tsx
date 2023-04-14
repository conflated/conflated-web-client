import React from 'react';
import { Dropdown, Icon, List } from 'semantic-ui-react';
import styles from './FilterView.module.scss';
import type { FilterInputType } from '../../../chartarea/chart/model/state/filters/filter/inputtype/FilterInputType';
import type { DataScopeType } from '../../../chartarea/chart/model/state/types/DataScopeType';
import DataScopePickerView from '../../../../views/picker/datascope/DataScopePickerView';
import type { ChartData } from '../../../chartarea/chart/model/state/data/ChartData';
import type { Filter } from '../../../chartarea/chart/model/state/filters/filter/Filter';

type Props = {
  changeFilterExpression: (expression: string) => void;
  changeFilterInputType: (filterInputType: FilterInputType) => void;
  changeFilterDataScopeType: (dataScopeType: DataScopeType) => void;
  chartData: ChartData;
  removeFilter: () => void;
  filter: Filter;
};

// noinspection FunctionWithMoreThanThreeNegationsJS
const DimensionFilterView = ({
  changeFilterDataScopeType,
  changeFilterExpression,
  changeFilterInputType,
  chartData,
  removeFilter,
  filter
}: Props) => {
  let filterInputTypeDropdownItems;

  if (!filter.isDrillDownFilter && !filter.isSelectionFilter) {
    filterInputTypeDropdownItems = filter.allowedDimensionFilterInputTypes.map((filterInputType: FilterInputType) => (
      <Dropdown.Item
        text={filterInputType}
        value={filterInputType}
        onClick={() => changeFilterInputType(filterInputType)}
      />
    ));
  }

  return (
    <List.Item className={styles.listItem} key={filter.measureOrDimension.name}>
      <div className={styles.measureOrDimensionName}>{filter.measureOrDimension.name}</div>
      <DataScopePickerView
        changeDataScopeType={changeFilterDataScopeType}
        selectedDataScopeType={filter.dataScopeType}
      />
      <Dropdown className={styles.filterInputType} icon="setting">
        <Dropdown.Menu direction="left">{filterInputTypeDropdownItems}</Dropdown.Menu>
      </Dropdown>
      <Icon className={styles.icon} name="close" onClick={() => removeFilter()} />
      {filter.getFilterInputView(styles.filterInput, chartData, changeFilterExpression)}
    </List.Item>
  );
};

export default DimensionFilterView;
