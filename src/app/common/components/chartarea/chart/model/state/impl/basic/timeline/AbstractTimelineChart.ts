/* eslint-disable @typescript-eslint/no-explicit-any */
import AbstractBasicChart from '../AbstractBasicChart';
import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { DimensionVisualizationType } from '../../../selecteddimension/DimensionVisualizationType';
import type { SelectedDimension } from '../../../selecteddimension/SelectedDimension';
import DimensionDropZoneListItemViewFactory from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/view/dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import Utils from '../../../../../../../../utils/Utils';
import type { DataSeries } from '../../../types/DataSeries';
import type { SelectedMeasure } from '../../../selectedmeasure/SelectedMeasure';
import { ChartConfiguration } from '../../../ChartConfiguration';
import TimelineChartSorts from '../../../sorts/impl/TimelineChartSorts';

export default abstract class AbstractTimelineChart extends AbstractBasicChart {
  constructor(chartConfiguration?: ChartConfiguration) {
    super(chartConfiguration);
    if (chartConfiguration) {
      this.sorts = new TimelineChartSorts(chartConfiguration.sorts);
    }
  }

  override addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType) {
    this.selectedDimensions = [];
    this.sorts.updateSortsWhenAddingSelectedDimension(dimension, visualizationType, this);
    super.addSelectedDimension(dimension, visualizationType);
  }

  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  override getApexDataSeries(shownXAxisCategories: Array<any>): DataSeries[] | any[] {
    const timeValues = this.getDataForSelectedDimensionOfType('Timeline');

    if (this.selectedMeasures.length > 0) {
      const dataSeries: DataSeries[] = [];

      this.selectedMeasures.forEach((selectedMeasure: SelectedMeasure) => {
        let measureValues = this.data.getForSelectedMeasure(selectedMeasure);

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

  override getConvertedSelectedDimensions(): SelectedDimension[] {
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

  override getApexXAxisOptions(): object {
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
  override getNextDimensionVisualizationType(): DimensionVisualizationType {
    return 'Timeline';
  }

  override isTimelineChart(): boolean {
    return true;
  }
}
