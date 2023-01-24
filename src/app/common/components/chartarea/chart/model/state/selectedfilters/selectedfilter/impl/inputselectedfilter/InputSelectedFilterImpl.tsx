import React from 'react';
import type { ChartData } from '../../../../chartdata/ChartData';
import InputFilterInputView from '../../../../../../../../filterselector/view/selectedfilter/filterinput/input/InputFilterInputView';
import AbstractSelectedFilterImpl from '../AbstractSelectedFilterImpl';

export default abstract class InputSelectedFilterImpl extends AbstractSelectedFilterImpl {
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
      />
    );
  }
}
