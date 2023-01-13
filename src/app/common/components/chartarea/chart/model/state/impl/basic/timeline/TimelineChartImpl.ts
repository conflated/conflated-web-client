/* eslint-disable @typescript-eslint/no-explicit-any */
import BasicChartImpl from '../BasicChartImpl';
import type { Dimension } from '../../../../../../../../../pages/dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { Measure } from '../../../../../../../../../pages/dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
import type { DimensionVisualizationType } from '../../../selecteddimension/types/DimensionVisualizationType';
import type { SelectedDimension } from '../../../selecteddimension/SelectedDimension';
import DimensionDropZoneListItemViewFactory from '../../../../../../../../../pages/dataexplorerpage/leftpane/dimensionselector/view/dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import Utils from '../../../../../../../../model/state/utils/Utils';
import type { DataSeries } from '../../../types/DataSeries';
import type { SelectedMeasure } from '../../../selectedmeasure/SelectedMeasure';

export default class TimelineChartImpl extends BasicChartImpl {
  addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType) {
    this.selectedDimensions = [];
    this.selectedSortBys.updateSelectedSortBysWhenAddingSelectedDimension(dimension, visualizationType, this);
    super.addSelectedDimension(dimension, visualizationType);
  }

  // eslint-disable-next-line no-unused-vars
  getApexChartDataSeries(): DataSeries[] | any[] {
    const timeValues = this.getChartDataForSelectedDimensionOfType('Timeline');

    if (this.selectedMeasures.length > 0) {
      const dataSeries: DataSeries[] = [];

      this.selectedMeasures.forEach((selectedMeasure: SelectedMeasure) => {
        let measureValues = this.chartData.getForSelectedMeasure(selectedMeasure);

        measureValues = timeValues.map((timeValue: string, valueIndex: number) => ({
          x: timeValue,
          y: measureValues[valueIndex]
        }));

        dataSeries.push({
          name: selectedMeasure.measure.name,
          type: this.getDataSeriesType(selectedMeasure.visualizationType),
          data: measureValues.length > 0 ? measureValues : [0]
        });
      });

      return dataSeries;
    }

    return this.getEmptyDataSeries();
  }

  getConvertedSelectedDimensions(): SelectedDimension[] {
    const convertedSelectedDimensions: SelectedDimension[] = [];

    if (
      (this.selectedDimensions.length >= 1 && this.selectedDimensions[0].dimension.isTimestamp) ||
      this.selectedDimensions[0].dimension.isDate
    ) {
      convertedSelectedDimensions.push({
        ...this.selectedDimensions[0],
        visualizationType: 'Timeline'
      });
    }

    return convertedSelectedDimensions;
  }

  getApexXAxisOptions(): object {
    return {
      type: 'datetime',
      labels: {
        maxHeight: 180
      },
      tooltip: {
        enabled: true
      },
      axisBorder: {
        show: this.selectedMeasures.length > 0
      }
    };
  }

  getDimensionDropZoneListItemViews(
    dimensionDropZoneListItemViewFactory: DimensionDropZoneListItemViewFactory
  ): Array<JSX.Element> {
    if (Utils.findElem(this.selectedDimensions, 'visualizationType', 'Timeline') != null) {
      return [
        dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('1', 'Timeline', 'date or timestamp')
      ];
    }

    return [];
  }

  // noinspection JSMethodCanBeStatic
  getNextDimensionVisualizationType(): DimensionVisualizationType {
    return 'Timeline';
  }

  isTimelineChart(): boolean {
    return true;
  }
}
