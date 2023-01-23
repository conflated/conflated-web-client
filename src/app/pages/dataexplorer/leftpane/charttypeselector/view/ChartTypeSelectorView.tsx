import React from 'react';
import { connect } from 'react-redux';
import type { AppState } from '../../../../../../store/AppState';
import ChartIconsView from './charticons/ChartIconsView';
import SelectorView from '../../../../../common/components/selector/view/SelectorView';
import { ActionDispatchers, controller, State } from '../chartTypeSelectorController';

type Props = ActionDispatchers & State;

const ChartTypeSelectorView = ({ notifyDragEnd, notifyDragStart, selectChartType, selectedChart }: Props) => (
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

export default connect(
  (appState: AppState) => controller.getState(appState),
  () => controller.getActionDispatchers()
)(ChartTypeSelectorView);
