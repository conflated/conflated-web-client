/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import type { ChartData } from '../../../../../chartarea/chart/model/state/chartdata/ChartData';
import type { SelectedFilter } from '../../../../../chartarea/chart/model/state/selectedfilters/selectedfilter/SelectedFilter';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  chartData: ChartData;
  className: string;
  selectedFilter: SelectedFilter;
};

export default function DropdownFilterInputView({
  changeFilterExpression,
  chartData,
  className,
  selectedFilter
}: Props) {
  const dropdownItems = chartData.getForSelectedFilter(selectedFilter);

  const dropdownOptions = dropdownItems.map((value: any) => ({
    key: value,
    text: value,
    value
  }));

  return (
    <Dropdown
      className={className}
      placeholder="Enter filter value..."
      fluid
      multiple
      selection
      search
      options={dropdownOptions}
      value={selectedFilter.filterExpression ? JSON.parse(selectedFilter.filterExpression) : []}
      onChange={(event: React.SyntheticEvent<HTMLElement>, { value }: any) =>
        changeFilterExpression(JSON.stringify(value))
      }
    />
  );
}
