import React from 'react';
import { connect } from 'react-redux';
import ChartTypeIconsView from './icons/ChartTypeIconsView';
import SelectorView from '../../../../../../../common/components/selector/view/SelectorView';
import { ActionDispatchers, controller, State } from '../controller/chartTypeSelectorController';

type Props = ActionDispatchers & State;

const ChartTypeSelectorView = ({ notifyDragEnd, notifyDragStart, selectChartType, selectedChart }: Props) => (
  <SelectorView
    id="chartTypeSelector"
    titleText="CHART TYPES"
    position="leftPane"
    selectorContent={
      <ChartTypeIconsView
        selectedChart={selectedChart}
        selectChartType={selectChartType}
        notifyDragStart={notifyDragStart}
        notifyDragEnd={notifyDragEnd}
      />
    }
    selectorStateNamespace="chartTypeSelector"
  />
);

export default connect(controller.getState, () => controller.actionDispatchers)(ChartTypeSelectorView);
