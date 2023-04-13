/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Radio } from 'semantic-ui-react';
import { checkboxesSelector } from './checkboxes/CheckboxesFilterInputView.module.scss';
import type { ChartData } from '../../../../chartarea/chart/model/state/data/ChartData';
import type { Filter } from '../../../../chartarea/chart/model/state/filters/filter/Filter';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  chartData: ChartData;
  className: string;
  selectedFilter: Filter;
};

const RadioButtonsFilterInputView = ({ changeFilterExpression, chartData, className, selectedFilter }: Props) => {
  const radioButtonItems = chartData.getForSelectedFilter(selectedFilter);

  const radioButtons = radioButtonItems.map((item: any) => (
    <Radio
      key={item}
      label={item}
      checked={selectedFilter.filterExpression === item}
      style={{ display: 'block' }}
      onChange={(event: React.SyntheticEvent<HTMLElement>, { label: filterItem, checked }: any) =>
        changeFilterExpression(checked ? filterItem : '')
      }
    />
  ));

  return <div className={`${className} ${checkboxesSelector} small-checkboxes`}>{radioButtons}</div>;
};

export default RadioButtonsFilterInputView;