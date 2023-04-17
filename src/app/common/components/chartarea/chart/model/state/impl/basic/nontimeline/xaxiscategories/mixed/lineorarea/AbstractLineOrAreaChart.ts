import type { SelectedMeasure } from '../../../../../../selectedmeasure/SelectedMeasure';
import type { Dimension } from '../../../../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { DimensionVisualizationType } from '../../../../../../selecteddimension/DimensionVisualizationType';
import type { Measure } from '../../../../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import AbstractMixedChart from '../AbstractMixedChart';
import { ChartConfiguration } from '../../../../../../ChartConfiguration';
import LineOrAreaChartSorts from '../../../../../../sorts/impl/LineOrAreaChartSorts';

export default class AbstractLineOrAreaChart extends AbstractMixedChart {
  constructor(chartConfiguration?: ChartConfiguration) {
    super(chartConfiguration);
    if (chartConfiguration) {
      this.sorts = new LineOrAreaChartSorts(chartConfiguration.sorts);
    }
  }

  override addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType) {
    if (this.hasTimestampXAxis()) {
      this.sorts.updateSortsWhenAddingSelectedDimension(dimension, visualizationType, this);
    }

    super.addSelectedDimension(dimension, visualizationType);
  }

  override getStrokeWidth(): number | number[] {
    if (this.selectedDimensions.length === 1) {
      return this.selectedMeasures.map(({ visualizationType }: SelectedMeasure) =>
        visualizationType === 'column' ? 0 : 3
      );
    } else if (
      this.selectedMeasures.length === 1 &&
      this.selectedDimensions.length === 2 &&
      this.selectedMeasures[0].visualizationType === 'column'
    ) {
      return 0;
    }

    return 3.0;
  }

  override hasContinuousXAxis(): boolean {
    return true;
  }

  override shouldShowStroke(): boolean {
    return true;
  }
}
