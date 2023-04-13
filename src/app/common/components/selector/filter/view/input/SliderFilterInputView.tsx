import React from 'react';
import SliderView from '../../../../../views/slider/SliderView';
import type { ChartData } from '../../../../chartarea/chart/model/state/data/ChartData';
import type { Filter } from '../../../../chartarea/chart/model/state/filters/filter/Filter';
import NumberRangesParser from '../../../../../utils/numberrange/NumberRangesParser';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  chartData: ChartData;
  className: string;
  selectedFilter: Filter;
};

const SliderFilterInputView = ({ changeFilterExpression, chartData, className, selectedFilter }: Props) => {
  const changeSliderValues = (newSelectedMinValue: number, newSelectedMaxValue: number) => {
    const newFilterExpression = `${newSelectedMinValue}-${newSelectedMaxValue}`;
    changeFilterExpression(newFilterExpression);
  };

  const { startValue: selectedMinValue, endValue: selectedMaxValue } = NumberRangesParser.parseNumberRange(
    selectedFilter.filterExpression
  );

  const [sliderMinValue, sliderMaxValue] = chartData.getMinAndMaxValueForSelectedFilter(selectedFilter);

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
