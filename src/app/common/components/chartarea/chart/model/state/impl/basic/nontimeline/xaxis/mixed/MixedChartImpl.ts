import XAxisChartImpl from '../XAxisChartImpl';
import type { MeasureVisualizationType } from '../../../../../selectedmeasure/types/MeasureVisualizationType';
import type { SelectedMeasure } from '../../../../../selectedmeasure/SelectedMeasure';
import Utils from '../../../../../../../../../../model/state/utils/Utils';

export default class MixedChartImpl extends XAxisChartImpl {
  getApexChartType(): string {
    if (this.selectedMeasures.length === 1) {
      return this.selectedMeasures[0].visualizationType === 'column'
        ? 'bar'
        : this.selectedMeasures[0].visualizationType;
    }

    return super.getApexChartType();
  }

  getSupportedMeasureVisualizationTypes(selectedMeasure: SelectedMeasure): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['column', 'line', 'area']);
  }

  hasSharedTooltip(): boolean {
    const columnSelectedMeasures = Utils.pick(this.selectedMeasures, 'visualizationType', 'column');
    const areAllSelectedMeasuresOfTypeColumn = columnSelectedMeasures.length === this.selectedMeasures.length;

    return (
      (this.selectedMeasures.length > 1 && !areAllSelectedMeasuresOfTypeColumn) ||
      (this.hasSelectedDimensionOfType('Legend') &&
        (this.selectedMeasures[0]?.visualizationType === 'area' ||
          this.selectedMeasures[0]?.visualizationType === 'line'))
    );
  }
}
