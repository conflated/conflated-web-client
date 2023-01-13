import React from 'react';
import type { SelectedMeasure } from '../../../model/state/selectedmeasure/SelectedMeasure';
import type { Chart } from '../../../model/state/Chart';
import type { SelectedDimension } from '../../../model/state/selecteddimension/SelectedDimension';

export default class MapTooltipTextFactory {
  static getRadiusTypeMeasureTooltipText = (
    radiusTypeSelectedMeasure: SelectedMeasure | null | undefined,
    chart: Chart,
    index: number
  ): JSX.Element | null => {
    if (radiusTypeSelectedMeasure != null) {
      const measureValues = chart.chartData.getForSelectedMeasure(radiusTypeSelectedMeasure);

      if (measureValues.length > 0) {
        return (
          <>
            <br />
            {`${radiusTypeSelectedMeasure.measure.name}: ${measureValues[index]}`}
          </>
        );
      }
    }

    return null;
  };

  static getTooltipTypeMeasureTooltipTexts = (
    wantedColor: string,
    chart: Chart,
    index: number
  ): Array<JSX.Element | null> =>
    chart.selectedMeasures
      .filter(
        ({ visualizationColor, visualizationType }: SelectedMeasure) =>
          visualizationType === 'tooltip' && visualizationColor === wantedColor
      )
      .map((selectedMeasure: SelectedMeasure): JSX.Element | null => {
        const measureValues = chart.chartData.getForSelectedMeasure(selectedMeasure);
        if (measureValues.length > 0) {
          return (
            <>
              <br />
              {`${selectedMeasure.measure.name}: ${measureValues[index]}`}
            </>
          );
        }
        return null;
      });

  static getTooltipTypeDimensionTooltipTexts = (chart: Chart, index: number): Array<JSX.Element | null> =>
    chart.selectedDimensions
      .filter(({ visualizationType }: SelectedDimension) => visualizationType === 'Tooltip')
      .map((selectedDimension: SelectedDimension): JSX.Element | null => {
        const dimensionValues = chart.chartData.getForSelectedDimension(selectedDimension);
        if (dimensionValues.length > 0) {
          return (
            <>
              <br />
              {`${selectedDimension.dimension.name}: `}
              {`${dimensionValues[index]}`}
            </>
          );
        }
        return null;
      });
}
