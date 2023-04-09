import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import { Layout } from '../../state/types/Layout';
import { ChartType } from '../../../chart/model/state/types/ChartType';
import ChartFactory from '../../../chart/model/state/ChartFactory';
import { ChartConfiguration } from '../../../chart/model/state/ChartConfiguration';
import emptyDataSource from '../../../chart/model/state/datasource/emptyDataSource';

export default class DropChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly newLayout: Layout,
    private readonly chartType: ChartType
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts } = currentState;

    const droppedChartConfig: ChartConfiguration = {
      id: this.newLayout.length.toString(),
      chartType: this.chartType,
      dataSource: emptyDataSource,
      selectedMeasures: [],
      selectedDimensions: [],
      selectedFilters: [],
      selectedSortBys: [],
      chartData: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    console.log(this.newLayout);

    return {
      ...currentState,
      layout: this.newLayout.map((gridItem) =>
        gridItem.i === '__dropping-elem__' ? { ...gridItem, i: this.newLayout.length.toString() } : gridItem
      ),
      charts: [...charts, ChartFactory.createChart(droppedChartConfig)]
    };
  }
}
