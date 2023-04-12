import { Inject } from 'noicejs';
import { ChartAreaStateNamespace } from '../../../../../chartarea/model/state/types/ChartAreaStateNamespace';
import AbstractChartAreaAction from '../../../../../chartarea/model/actions/AbstractChartAreaAction';
import { ChartAreaState } from '../../../../../chartarea/model/state/ChartAreaState';
import { TriggerChartDataService } from '../services/TriggerChartDataService';
import { ColumnNameToValuesMap } from '../../../../../chartarea/chart/model/state/data/ColumnNameToValuesMap';
import FinishFetchChartDataAction from '../../../../../chartarea/model/actions/chart/fetchdata/FinishFetchChartDataAction';

type ConstructorArgs = {
  alertChartDataService: TriggerChartDataService;
  goalChartDataService: TriggerChartDataService;
  stateNamespace: ChartAreaStateNamespace;
};

@Inject('alertChartDataService', 'goalChartDataService')
class StartFetchDataForTriggerChartsAction extends AbstractChartAreaAction {
  readonly alertChartDataService: TriggerChartDataService;

  readonly goalChartDataService: TriggerChartDataService;

  constructor({ alertChartDataService, goalChartDataService, stateNamespace }: ConstructorArgs) {
    super(stateNamespace);
    this.alertChartDataService = alertChartDataService;
    this.goalChartDataService = goalChartDataService;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts } = currentState;

    (this.stateNamespace === 'alertsPage' ? this.alertChartDataService : this.goalChartDataService)
      .fetchTriggerDataTableData()
      .then((columnNameToValuesMap: ColumnNameToValuesMap) =>
        this.dispatch(new FinishFetchChartDataAction(this.stateNamespace, columnNameToValuesMap, charts[0].id))
      );

    (this.stateNamespace === 'alertsPage' ? this.alertChartDataService : this.goalChartDataService)
      .fetchTriggerStatisticsChartData()
      .then((columnNameToValuesMap: ColumnNameToValuesMap) =>
        this.dispatch(new FinishFetchChartDataAction(this.stateNamespace, columnNameToValuesMap, charts[1].id))
      );

    return {
      ...currentState,
      charts: charts.map((chart) => {
        chart.setIsFetchingChartData(true);
        return chart;
      })
    };
  }
}

export default StartFetchDataForTriggerChartsAction;
