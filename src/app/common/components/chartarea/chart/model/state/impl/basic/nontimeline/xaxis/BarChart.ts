import AbstractXAxisChart from './AbstractXAxisChart';

export default class BarChart extends AbstractXAxisChart {
  getSubtitleText(): string {
    if (this.selectedDimensions.length === 0 && this.selectedMeasures.length > 0) {
      return 'All';
    }

    return super.getSubtitleText();
  }

  isXAxisScrollable(): boolean {
    return true;
  }

  supportsAllDimension(): boolean {
    return true;
  }
}
