/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import styles from './CheckboxesFilterInputView.module.scss';
import type { ChartData } from '../../../../../chartarea/chart/model/state/data/ChartData';
import type { Filter } from '../../../../../chartarea/chart/model/state/filters/filter/Filter';

type Props = {
  chartData: ChartData;
  className: string;
  selectedFilter: Filter;
  changeFilterExpression: (filterExpression: string) => void;
};

const CheckboxesFilterInputView = ({
  chartData,
  className,
  selectedFilter,
  selectedFilter: { filterExpression },
  changeFilterExpression
}: Props) => {
  const changeCheckboxState = (event: React.SyntheticEvent<HTMLElement>, { label: filterItem, checked }: any) => {
    let selectedFilterItems = filterExpression ? JSON.parse(filterExpression) : [];

    if (checked && !selectedFilterItems.includes(filterItem)) {
      selectedFilterItems.push(filterItem);
    } else if (!checked && selectedFilterItems.includes(filterItem)) {
      selectedFilterItems = _.without(selectedFilterItems, filterItem);
    }

    changeFilterExpression(JSON.stringify(selectedFilterItems));
  };

  const checkboxItems = _.uniq(chartData.getForFilter(selectedFilter));
  const checkedItems = filterExpression ? JSON.parse(filterExpression) : [];

  const checkboxes = checkboxItems.map((item: any) => (
    <Checkbox
      key={item}
      label={item}
      checked={checkedItems.includes(item)}
      style={{ display: 'block' }}
      onChange={changeCheckboxState}
    />
  ));

  return <div className={`${className} ${styles.checkboxesSelector} small-checkboxes`}>{checkboxes}</div>;
};

export default CheckboxesFilterInputView;
