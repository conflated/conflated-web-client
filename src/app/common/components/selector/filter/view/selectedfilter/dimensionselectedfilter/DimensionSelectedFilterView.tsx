import React from 'react';
import { Dropdown, Icon, List } from 'semantic-ui-react';
import styles from '../SelectedFilterView.module.scss';
import type { FilterInputType } from '../../../../../chartarea/chart/model/state/selectedfilters/selectedfilter/types/FilterInputType';
import type { DataScopeType } from '../../../../../chartarea/chart/model/state/types/DataScopeType';
import DataScopePickerView from '../../../../../../view/picker/datascope/DataScopePickerView';
import type { ChartData } from '../../../../../chartarea/chart/model/state/chartdata/ChartData';
import type { SelectedFilter } from '../../../../../chartarea/chart/model/state/selectedfilters/selectedfilter/SelectedFilter';

type Props = {
  changeSelectedFilterExpression: (expression: string) => void;
  changeSelectedFilterInputType: (filterInputType: FilterInputType) => void;
  changeSelectedFilterDataScopeType: (dataScopeType: DataScopeType) => void;
  chartData: ChartData;
  removeSelectedFilter: () => void;
  selectedFilter: SelectedFilter;
};

// noinspection FunctionWithMoreThanThreeNegationsJS
const DimensionSelectedFilterView = ({
  changeSelectedFilterDataScopeType,
  changeSelectedFilterExpression,
  changeSelectedFilterInputType,
  chartData,
  removeSelectedFilter,
  selectedFilter
}: Props) => {
  const [dimensionFilterInputTypeDropdownItems, filterRemoveIcon] = (() => {
    if (!selectedFilter.isDrillDownFilter && !selectedFilter.isSelectionFilter) {
      return [
        selectedFilter.allowedDimensionFilterInputTypes.map((filterInputType: FilterInputType) => (
          <Dropdown.Item
            text={filterInputType}
            value={filterInputType}
            onClick={() => changeSelectedFilterInputType(filterInputType)}
          />
        )),
        <Icon className={styles.icon} name="close" onClick={() => removeSelectedFilter()} />
      ];
    }

    return [undefined, undefined];
  })();

  return (
    <List.Item key={selectedFilter.measureOrDimension.name}>
      <div className={styles.measureOrDimensionName}>{selectedFilter.measureOrDimension.name}</div>
      <DataScopePickerView
        changeDataScopeType={changeSelectedFilterDataScopeType}
        selectedDataScopeType={selectedFilter.dataScopeType}
      />
      <Dropdown className={styles.icon} icon="setting">
        <Dropdown.Menu direction="left">{dimensionFilterInputTypeDropdownItems}</Dropdown.Menu>
      </Dropdown>
      {filterRemoveIcon}
      {selectedFilter.getFilterInputView(styles.filterInput, chartData, changeSelectedFilterExpression)}
    </List.Item>
  );
};

export default DimensionSelectedFilterView;