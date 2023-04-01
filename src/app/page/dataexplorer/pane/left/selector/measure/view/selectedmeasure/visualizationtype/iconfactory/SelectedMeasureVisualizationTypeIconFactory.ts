import type { MeasureVisualizationType } from '../../../../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/MeasureVisualizationType';

export default class SelectedMeasureVisualizationTypeIconFactory {
  static createMeasureVisualizationTypeIcon(
    measureVisualizationType: MeasureVisualizationType,
    hasAllDimension: boolean
  ): string {
    switch (measureVisualizationType) {
      case 'line':
        if (hasAllDimension) {
          return 'chart bar';
        } else {
          return 'chart line';
        }
      case 'area':
        if (hasAllDimension) {
          return 'chart bar';
        } else {
          return 'chart area';
        }
      case 'column':
        return 'chart bar';
      case 'radius':
        return 'resize horizontal';
      case 'color':
        return 'tint';
      case 'tooltip':
        return 'comment outline';
      case 'text':
        return 'font';
      case 'x-axis':
        return 'arrow right';
      case 'y-axis':
        return 'arrow up';
      default:
        return '';
    }
  }
}
