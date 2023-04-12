import _ from 'lodash';
import moment from 'moment';
import type { DimensionVisualizationType } from '../../../../selecteddimension/DimensionVisualizationType';
import type { Dimension } from '../../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { AggregationFunction } from '../../../../selectedmeasure/types/AggregationFunction';
import type { SelectedDimension } from '../../../../selecteddimension/SelectedDimension';
import DimensionDropZoneListItemViewFactory from '../../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/view/dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import AbstractNonTimelineChart from '../AbstractNonTimelineChart';

export default abstract class AbstractXAxisCategoriesChart extends AbstractNonTimelineChart {
  override addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType) {
    if (this.selectedDimensions.length === 1 && visualizationType === 'Legend') {
      this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    }

    this.selectedSortBys.updateSelectedSortBysWhenAddingSelectedDimension(dimension, visualizationType, this);
    super.addSelectedDimension(dimension, visualizationType);
  }

  override addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    const selectedMeasureCountBeforeAdd = this.selectedMeasures.length;
    super.addSelectedMeasure(measureOrDimension, aggregationFunction);

    if (
      selectedMeasureCountBeforeAdd === this.selectedMeasures.length - 1 &&
      this.hasSelectedDimensionOfType('Legend') &&
      this.selectedMeasures.length >= 1
    ) {
      this.selectedMeasures[selectedMeasureCountBeforeAdd] = {
        ...this.selectedMeasures[selectedMeasureCountBeforeAdd],
        visualizationType: 'tooltip',
        visualizationColor: this.selectedMeasures[0].visualizationColor
      };
    }
  }

  override getApexXAxisOptions(): object {
    const commonOptions = {
      labels: {
        maxHeight: 180
      },
      tooltip: {
        enabled: false
      },
      axisBorder: {
        show: this.selectedMeasures.length > 0
      }
    };

    const xAxisValues = this.chartData.getForSelectedDimensionOfType(this.selectedDimensions, 'X-axis categories');

    if (xAxisValues.length > 0) {
      let categories = this.sliceOrFillXAxisData(_.uniq(xAxisValues));

      if (!this.hasContinuousXAxis() && this.hasTimestampXAxis()) {
        categories = categories.map((category: string) => moment(category).format('MMM DD HH:mm'));
      }

      const hasContinuousTimestampXAxis = this.hasContinuousXAxis() && this.hasTimestampXAxis();

      return {
        ...commonOptions,
        type: hasContinuousTimestampXAxis ? 'datetime' : 'category',
        categories: hasContinuousTimestampXAxis ? [] : categories
      };
    }

    return {
      ...commonOptions,
      type: 'category',
      categories: undefined,
      axisTicks: {
        show: this.selectedMeasures.length && this.selectedDimensions.length > 0
      }
    };
  }

  override getConvertedSelectedDimensions(): SelectedDimension[] {
    const convertedSelectedDimensions = [];

    if (this.selectedDimensions.length >= 1) {
      convertedSelectedDimensions.push({
        ...this.selectedDimensions[0],
        visualizationType: 'X-axis categories'
      });
    }

    if (this.selectedDimensions.length >= 2) {
      convertedSelectedDimensions.push({
        ...this.selectedDimensions[1],
        visualizationType: 'Legend'
      });
    }

    if (this.selectedDimensions.length >= 3) {
      this.selectedDimensions.slice(2).forEach((selectedDimension: SelectedDimension) =>
        convertedSelectedDimensions.push({
          ...selectedDimension,
          visualizationType: selectedDimension.visualizationType === 'Tooltip' ? 'Tooltip' : 'Drilldown'
        })
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return convertedSelectedDimensions as any;
  }

  getDimensionDropZoneListItemViews(
    dimensionDropZoneListItemViewFactory: DimensionDropZoneListItemViewFactory
  ): Array<JSX.Element> {
    const dimensionDropZoneListItemViews = [];

    if (this.hasSelectedDimensionOfType('X-axis categories')) {
      if (!this.hasSelectedDimensionOfType('Legend') && this.supportsLegend() && this.selectedMeasures.length <= 1) {
        dimensionDropZoneListItemViews.push(
          dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem(
            '1',
            'X-axis categories',
            this.getLegendType()
          )
        );
      }

      dimensionDropZoneListItemViews.push(
        dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('3', 'Drilldown', 'In-place drilldown')
      );
    } else {
      dimensionDropZoneListItemViews.push(
        dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('1', 'X-axis categories')
      );
    }

    return dimensionDropZoneListItemViews;
  }

  override getLegendType(): string {
    return 'legend';
  }

  override getMaxScrollPosition(): number {
    const xAxisValues = this.chartData.getForSelectedDimensionOfType(this.selectedDimensions, 'X-axis categories');

    return this.isXAxisScrollable() && xAxisValues.length > 0 ? _.uniq(xAxisValues).length - 1 : 0;
  }

  override getNextDimensionVisualizationType(): DimensionVisualizationType {
    if (!this.hasSelectedDimensionOfType('X-axis categories')) {
      return 'X-axis categories';
    } else if (!this.hasSelectedDimensionOfType('Legend')) {
      return 'Legend';
    } else if (this.hasSelectedDimensionOfType('X-axis categories') && this.hasSelectedDimensionOfType('Legend')) {
      return 'Drilldown';
    }

    return super.getNextDimensionVisualizationType();
  }

  override getPrimarySelectedDimensionType(): DimensionVisualizationType {
    return 'X-axis categories';
  }

  override hasTimestampXAxis(): boolean {
    const xAxisCategoriesSelectedDimension =
      this.currentDrillDownSelectedDimension ?? this.getSelectedDimensionOfType('X-axis categories');

    return (
      xAxisCategoriesSelectedDimension != null &&
      (xAxisCategoriesSelectedDimension.dimension.isTimestamp || xAxisCategoriesSelectedDimension.dimension.isDate)
    );
  }

  override isXAxisScrollable(): boolean {
    return !this.hasTimestampXAxis();
  }

  override removeSelectedDimension(selectedDimension: SelectedDimension) {
    this.selectedSortBys.updateSelectedSortBysWhenRemovingSelectedDimension(selectedDimension, this.selectedMeasures);

    const legendSelectedDimension = this.getSelectedDimensionOfType('Legend');

    if (legendSelectedDimension != null && selectedDimension.visualizationType === 'X-axis categories') {
      super.removeSelectedDimension(legendSelectedDimension);
    }

    super.removeSelectedDimension(selectedDimension);
  }

  override supportsDataPointsCount(): boolean {
    return true;
  }

  override supportsLegend(): boolean {
    return true;
  }

  override supportsSelectedMeasureVisualizationColor(): boolean {
    return !this.hasSelectedDimensionOfType('Legend') || this.hasTimestampLegend();
  }

  override supportsTooltipSelectedDimension(): boolean {
    return false;
  }
}
