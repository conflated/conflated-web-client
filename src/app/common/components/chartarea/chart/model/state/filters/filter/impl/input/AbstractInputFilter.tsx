import React from 'react';
import type { ChartData } from '../../../../data/ChartData';
import InputFilterInputView from '../../../../../../../../selector/filter/view/input/InputFilterInputView';
import AbstractFilter from '../AbstractFilter';

export default abstract class AbstractInputFilter extends AbstractFilter {
  abstract getPlaceholder(): string;

  getFilterInputView(
    className: string,
    chartData: ChartData,
    changeFilterExpression: (filterExpression: string) => void
  ): JSX.Element {
    return (
      <InputFilterInputView
        changeFilterExpression={changeFilterExpression}
        className={className}
        filterExpression={this.filterExpression}
        isSelectionFilter={this.isSelectionFilter}
        placeholder={this.getPlaceholder()}
      />
    );
  }
}
