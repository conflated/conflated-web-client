import { createSelector } from 'reselect';
import FilterUtils from '../utils/FilterUtils';
import type { AppState } from '../../../../../store/AppState';
import type { Dimension } from '../../../../pages/dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { Chart } from '../../../components/chartarea/chart/model/state/Chart';

export default function createShownDimensionsSelector(checkIfTimeLineChart: boolean) {
  const dimensionsSelector = (appState: AppState): Dimension[] =>
    appState.dataExplorerPage.dimensionSelectorState.dimensions;

  const searchedValueSelector = (appState: AppState): string =>
    appState.common.selectorWithDefaultActionsStates.dimensionSelector.searchedValue;

  const selectedChartSelector = (appState: AppState): Chart => appState.dataExplorerPage.chartAreaState.selectedChart;

  return createSelector(
    [dimensionsSelector, searchedValueSelector, selectedChartSelector],
    (dimensions: Dimension[], searchedValue: string, selectedChart: Chart) =>
      FilterUtils.filterNamedObjectsByName(dimensions, searchedValue).filter(
        ({ isTimestamp }: Dimension) =>
          !checkIfTimeLineChart || !selectedChart.isTimelineChart() || (selectedChart.isTimelineChart() && isTimestamp)
      )
  );
}
