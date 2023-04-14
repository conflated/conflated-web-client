import React from 'react';
import SliderView from '../../../../../views/slider/SliderView';
import type { ChartData } from '../../../../chartarea/chart/model/state/data/ChartData';
import type { Filter } from '../../../../chartarea/chart/model/state/filters/filter/Filter';
import NumberRangesParser from '../../../../../utils/numberrange/NumberRangesParser';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  chartData: ChartData;
  className: string;
  filter: Filter;
};

const SliderFilterInputView = ({ changeFilterExpression, chartData, className, filter }: Props) => {
  const changeSliderValues = (newSelectedMinValue: number, newSelectedMaxValue: number) => {
    const newFilterExpression = `${newSelectedMinValue}-${newSelectedMaxValue}`;
    changeFilterExpression(newFilterExpression);
  };

  const { startValue: selectedMinValue, endValue: selectedMaxValue } = filter.filterExpression
    ? NumberRangesParser.parseNumberRange(filter.filterExpression)
    : { startValue: NaN, endValue: NaN };

  const [sliderMinValue, sliderMaxValue] = chartData.getMinAndMaxValueForSelectedFilter(filter);

  return (
    <SliderView
      className={className}
      sliderMinValue={sliderMinValue}
      sliderMaxValue={sliderMaxValue}
      selectedMinValue={selectedMinValue}
      selectedMaxValue={selectedMaxValue}
      onSliderValuesChange={changeSliderValues}
    />
  );
};

export default SliderFilterInputView;
