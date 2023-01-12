import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import type { AppState } from '../../../../store/AppState';
import ChartIconsView from './charticons/ChartIconsView';
import ChartTypeSelectorControllerFactory from '../controller/ChartTypeSelectorControllerFactory';
import SelectorView from '../../../../common/components/selector/view/SelectorView';

const mapAppStateToComponentProps = (appState: AppState) => ({
  selectedChart: appState.dataExplorerPage.chartAreaState.selectedChart
});

const createController = (dispatch: Dispatch) => new ChartTypeSelectorControllerFactory(dispatch).createController();
type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function ChartTypeSelectorView({ notifyDragEnd, notifyDragStart, selectChartType, selectedChart }: Props) {
  return (
    <SelectorView
      id="chartTypeSelector"
      titleText="CHART TYPE"
      selectorContent={
        <ChartIconsView
          selectedChartType={selectedChart.chartType}
          selectChartType={selectChartType}
          notifyDragStart={notifyDragStart}
          notifyDragEnd={notifyDragEnd}
        />
      }
      selectorStateNamespace="chartTypeSelector"
    />
  );
}

export default connect(mapAppStateToComponentProps, createController)(ChartTypeSelectorView);
