import React from 'react';
import SliderView from '../../../../../../../view/slider/SliderView';
import type { ChartData } from '../../../../../../chartarea/chart/model/state/chartdata/ChartData';
import type { SelectedFilter } from '../../../../../../chartarea/chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import NumberRangesParser from '../../../../../../chartarea/chart/model/state/selectedfilters/selectedfilter/numberrange/NumberRangesParser';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  chartData: ChartData;
  className: string;
  selectedFilter: SelectedFilter;
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
