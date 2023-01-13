import OOReduxUtils from 'oo-redux-utils';
import initialAlertsPageChartAreaState from '../../../../../../../pages/alertspage/chartarea/model/state/initialAlertsPageChartAreaState';
import initialGoalsPageChartAreaState from '../../../../../../../pages/goalspage/chartarea/model/state/initialGoalsPageChartAreaState';
import type { TriggersPageStateNamespace } from '../../../../model/state/namespace/TriggersPageStateNamespace';
import type { ChartAreaState } from '../../../../../chartarea/model/state/ChartAreaState';
import AbstractChartAreaDispatchingAction from '../../../../../chartarea/model/actions/AbstractChartAreaDispatchingAction';
import AbstractChartAreaAction from '../../../../../chartarea/model/actions/AbstractChartAreaAction';
import type { ChartAreaPageStateNamespace } from '../../../../../chartarea/model/state/namespace/ChartAreaPageStateNamespace';

export default (stateNamespace: TriggersPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<ChartAreaState, ChartAreaPageStateNamespace>(
    stateNamespace === 'alertsPage' ? initialAlertsPageChartAreaState : initialGoalsPageChartAreaState,
    [AbstractChartAreaAction, AbstractChartAreaDispatchingAction],
    stateNamespace
  );
