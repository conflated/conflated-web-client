import OOReduxUtils from 'oo-redux-utils2';
import initialAlertsPageChartAreaState from '../../../../../../../page/alerts/chartarea/model/state/initialAlertsPageChartAreaState';
import initialGoalsPageChartAreaState from '../../../../../../../page/goals/chartarea/model/state/initialGoalsPageChartAreaState';
import type { ChartAreaState } from '../../../../../chartarea/model/state/ChartAreaState';
import AbstractChartAreaAction from '../../../../../chartarea/model/actions/AbstractChartAreaAction';
import { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import { ChartAreaStateNamespace } from '../../../../../chartarea/model/state/types/ChartAreaStateNamespace';

export default (stateNamespace: TriggersPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<ChartAreaState, ChartAreaStateNamespace>(
    stateNamespace === 'alertsPage' ? initialAlertsPageChartAreaState : initialGoalsPageChartAreaState,
    AbstractChartAreaAction,
    stateNamespace
  );
