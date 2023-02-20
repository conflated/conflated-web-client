/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import _ from 'lodash';
import { Circle, Popup } from 'react-leaflet';
import type { Chart } from '../../../model/state/Chart';
import type { SelectedMeasure } from '../../../model/state/selectedmeasure/SelectedMeasure';
import HashValueCalculator from '../../../../../../model/state/utils/HashValueCalculator';
import MapTooltipTextFactory from '../factories/MapTooltipTextFactory';
import Utils from '../../../../../../model/state/utils/Utils';

export default class LeafletCircleGeometriesFactory {
  static createCircleGeometries(chart: Chart): Array<JSX.Element> {
    const handledRadiusTypeSelectedMeasures: any[] = [];

    const [latitudeValues, longitudeValues] = chart.chartData.getMapLocationData(chart.selectedDimensions);

    const filledCircles = Utils.pick(chart.selectedMeasures, 'visualizationType', 'color').map(
      (selectedMeasure: SelectedMeasure): Array<JSX.Element> =>
        chart.chartData
          .getForSelectedMeasure(selectedMeasure)
          .map((measureValue: number, valueIndex: number): JSX.Element => {
            const radiusTypeSelectedMeasure = chart.getRadiusTypeSelectedMeasureForColor(
              selectedMeasure.visualizationColor
            );

            handledRadiusTypeSelectedMeasures.push(radiusTypeSelectedMeasure);

            return (
              <Circle
                key={HashValueCalculator.hashValues(
                  selectedMeasure,
                  latitudeValues[valueIndex],
                  longitudeValues[valueIndex],
                  // eslint-disable-next-line no-bitwise
                  measureValue << 5
                )}
                center={[latitudeValues[valueIndex], longitudeValues[valueIndex]]}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                radius={chart.chartData.getForSelectedMeasure(radiusTypeSelectedMeasure)[valueIndex] ?? 100}
                fill
                stroke
                color={selectedMeasure.visualizationColor}
                opacity={measureValue / 100}
                fillOpacity={measureValue / 100}
              >
                <Popup>
                  {MapTooltipTextFactory.getTooltipTypeDimensionTooltipTexts(chart, valueIndex)}
                  <br />
                  {`${selectedMeasure.measure.name}: ${measureValue}`}
                  {MapTooltipTextFactory.getRadiusTypeMeasureTooltipText(radiusTypeSelectedMeasure, chart, valueIndex)}
                  {MapTooltipTextFactory.getTooltipTypeMeasureTooltipTexts(
                    selectedMeasure.visualizationColor,
                    chart,
                    valueIndex
                  )}
                </Popup>
              </Circle>
            );
          })
    );

    const strokedCircles = Utils.pick(chart.selectedMeasures, 'visualizationType', 'radius')
      .filter((selectedMeasure: SelectedMeasure) => !handledRadiusTypeSelectedMeasures.includes(selectedMeasure))
      .map(
        (selectedMeasure: SelectedMeasure): Array<JSX.Element> =>
          chart.chartData.getForSelectedMeasure(selectedMeasure).map(
            (measureValue: number, valueIndex: number): JSX.Element => (
              <Circle
                key={HashValueCalculator.hashValues(
                  selectedMeasure,
                  latitudeValues[valueIndex],
                  longitudeValues[valueIndex],
                  // eslint-disable-next-line no-bitwise
                  measureValue << 5
                )}
                center={[latitudeValues[valueIndex], longitudeValues[valueIndex]]}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                radius={measureValue}
                fill={false}
                fillOpacity={0}
                stroke
                color={selectedMeasure.visualizationColor}
                opacity={1}
              >
                <Popup>
                  {MapTooltipTextFactory.getTooltipTypeDimensionTooltipTexts(chart, valueIndex)}
                  <br />
                  {`${selectedMeasure.measure.name}: ${measureValue}`}
                  {MapTooltipTextFactory.getTooltipTypeMeasureTooltipTexts(
                    selectedMeasure.visualizationColor,
                    chart,
                    valueIndex
                  )}
                </Popup>
              </Circle>
            )
          )
      );

    return [..._.flatten(filledCircles), ..._.flatten(strokedCircles)];
  }
}
