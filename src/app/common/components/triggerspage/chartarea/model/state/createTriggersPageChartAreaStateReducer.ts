import OOReduxUtils from 'oo-redux-utils2';
import initialAlertsPageChartAreaState from '../../../../../../pages/alerts/chartarea/model/state/initialAlertsPageChartAreaState';
import initialGoalsPageChartAreaState from '../../../../../../pages/goals/chartarea/model/state/initialGoalsPageChartAreaState';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import type { ChartAreaState } from '../../../../chartarea/model/state/ChartAreaState';
import AbstractChartAreaAction from '../../../../chartarea/model/actions/AbstractChartAreaAction';
import type { ChartAreaPageStateNamespace } from '../../../../chartarea/model/state/types/ChartAreaPageStateNamespace';

export default (stateNamespace: TriggersPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<ChartAreaState, ChartAreaPageStateNamespace>(
    stateNamespace === 'alertsPage' ? initialAlertsPageChartAreaState : initialGoalsPageChartAreaState,
    AbstractChartAreaAction,
    stateNamespace
  );
