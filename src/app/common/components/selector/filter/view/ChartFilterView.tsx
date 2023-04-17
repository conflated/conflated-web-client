import React from 'react';
import { Icon, List } from 'semantic-ui-react';
import styles from './FilterView.module.scss';
import DataScopePickerView from '../../../../views/picker/datascope/DataScopePickerView';
import type { Filter } from '../../../chartarea/chart/model/state/filters/filter/Filter';
import { FilterSelectorStateNamespace } from '../model/state/FilterSelectorStateNamespace';
import { DataScope } from '../../../chartarea/chart/model/state/types/DataScope';

type Props = {
  changeFilterDataScopeType: (dataScopeType: DataScope) => void;
  filter: Filter;
  removeFilter: () => void;
  stateNamespace: FilterSelectorStateNamespace;
};

const ChartFilterView = ({ changeFilterDataScopeType, filter, removeFilter, stateNamespace }: Props) => (
  <List.Item className={styles.listItem} key={filter.filteringChart?.getName(stateNamespace)}>
    <div className={styles.measureOrDimensionName}>{filter.filteringChart?.getName(stateNamespace)}</div>
    <DataScopePickerView
      changeDataScopeType={changeFilterDataScopeType}
      className={styles.dataScopePicker}
      selectedDataScopeType={filter.dataScope}
    />
    <Icon className={styles.icon} name="close" onClick={() => removeFilter()} />
  </List.Item>
);

export default ChartFilterView;
