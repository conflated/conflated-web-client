import { Controller } from 'oo-redux-utils2';
import type { Chart } from '../../model/state/Chart';
import type { ChartAreaPageStateNamespace } from '../../../model/state/types/ChartAreaPageStateNamespace';
import DrillUpChartAction from '../../../model/actions/chart/drill/DrillUpChartAction';
import diContainer from '../../../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../../model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import store from '../../../../../../../store/store';
import { OwnProps } from '../view/DrillUpIconView';

class DrillUpIconController extends Controller<ChartAreaPageStateNamespace> {
  getActionDispatchers = (_: unknown, { pageStateNamespace }: OwnProps) => ({
    drillUpChart: (chart: Chart) => {
      this.dispatch(new DrillUpChartAction(pageStateNamespace, chart));
      this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, { chart, pageStateNamespace });
    }
  });
}

export const controller = new DrillUpIconController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
