import _ from 'lodash';
import type { DrillDown } from '../types/DrillDown';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';
import AbstractChartImpl from './AbstractChartImpl';

export default abstract class DrillDownChartImpl extends AbstractChartImpl {
  drillDown(drillDown: DrillDown, newDrillDownSelectedDimension: SelectedDimension) {
    this.drillDowns?.push(drillDown);
    this.currentDrillDownSelectedDimension = newDrillDownSelectedDimension;
    this.selectedFilters.addDrillDownFilter(drillDown);
  }

  drillUp(): boolean {
    const newDrillDownSelectedDimension = this.getPreviousDrillDownSelectedDimension();

    if (this.currentDrillDownSelectedDimension !== newDrillDownSelectedDimension) {
      const lastDrillDownFilter = this.selectedFilters.getLastDrillDownFilter();

      if (lastDrillDownFilter != null) {
        this.selectedFilters.removeSelectedFilter(lastDrillDownFilter);
      }

      this.drillDowns = this.drillDowns?.slice(0, -1);
      this.currentDrillDownSelectedDimension = newDrillDownSelectedDimension;
      return true;
    }

    return false;
  }

  getNextDrillDownSelectedDimension(): SelectedDimension {
    if (this.currentDrillDownSelectedDimension) {
      const currentDrillDownSelectedDimensionIndex = this.selectedDimensions.indexOf(
        this.currentDrillDownSelectedDimension
      );

      const nextDrillDownSelectedDimension = this.selectedDimensions.find(
        ({ visualizationType }: SelectedDimension, index: number) =>
          index > currentDrillDownSelectedDimensionIndex && visualizationType === 'Drilldown'
      );
      // $FlowFixMe
      return nextDrillDownSelectedDimension ?? this.currentDrillDownSelectedDimension;
    } else {
      const firstDrillDownSelectedDimension = this.getSelectedDimensionOfType('Drilldown');
      return firstDrillDownSelectedDimension ?? this.selectedDimensions[0];
    }
  }

  getPreviousDrillDownSelectedDimension(): SelectedDimension {
    if (this.currentDrillDownSelectedDimension) {
      const currentDrillDownSelectedDimensionIndex = this.selectedDimensions.indexOf(
        this.currentDrillDownSelectedDimension
      );

      const previousDrillDownSelectedDimension = _.findLast(
        this.selectedDimensions,
        ({ visualizationType }: SelectedDimension, index: number) =>
          index > currentDrillDownSelectedDimensionIndex && visualizationType === 'Drilldown'
      );

      return previousDrillDownSelectedDimension ?? this.selectedDimensions[0];
    } else {
      return this.selectedDimensions[0];
    }
  }

  getSubtitleText(): string {
    const { drillDowns, selectedDimensions, selectedMeasures } = this;
    let text = '';

    if (selectedDimensions.length > 0 && selectedMeasures.length > 0) {
      if (drillDowns != null && drillDowns.length > 0) {
        text = drillDowns
          .map((drillDown: DrillDown) => `${drillDown.selectedDimension.dimension.name} ${drillDown.value}`)
          .toString();
        text += ': ';
      }

      text += this.currentDrillDownSelectedDimension?.dimension.name ?? selectedDimensions[0].dimension.name;
    }

    return text;
  }
}
