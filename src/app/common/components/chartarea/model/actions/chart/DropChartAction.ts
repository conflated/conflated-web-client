import _ from 'lodash';
import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import { Layout } from '../../state/types/Layout';
import { ChartType } from '../../../chart/model/state/types/ChartType';
import ChartFactory from '../../../chart/model/state/ChartFactory';
import { ChartConfiguration } from '../../../chart/model/state/ChartConfiguration';

export default class DropChartAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly newLayout: Layout,
    private readonly chartType: ChartType
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts, layout, selectedChart } = currentState;
    const largestIdValue = parseInt(_.maxBy(layout, 'i')?.i ?? '0', 10);
    const newId = (largestIdValue + 1).toString();

    const droppedChartConfig: ChartConfiguration = {
      id: newId,
      chartType: this.chartType,
      dataSource: selectedChart.dataSource,
      selectedMeasures: [],
      selectedDimensions: [],
      selectedFilters: [],
      selectedSortBys: [],
      chartData: {},
      xAxisCategoriesShownCount: 10,
      fetchedRowCount: 100
    };

    return {
      ...currentState,
      layout: this.newLayout.map((gridItem) =>
        gridItem.i === '__dropping-elem__' ? { ...gridItem, i: newId } : gridItem
      ),
      charts: [...charts, ChartFactory.createChart(droppedChartConfig)]
    };
  }
}
