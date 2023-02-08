import OOReduxUtils from 'oo-redux-utils2';
import AddSelectDimensionToSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/add/selecteddimension/AddSelectDimensionToSelectedChartAction';
import RemoveSelectedDimensionFromSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/remove/RemoveSelectedDimensionFromSelectedChartAction';
import ChangeSelectedDimensionColorForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/change/selecteddimension/ChangeSelectedDimensionColorForSelectedChartAction';
import type { DimensionVisualizationType } from '../../../../common/components/chartarea/chart/model/state/selecteddimension/types/DimensionVisualizationType';
import type { Dimension } from './model/state/entities/Dimension';
import type { SelectedDimension } from '../../../../common/components/chartarea/chart/model/state/selecteddimension/SelectedDimension';
import diContainer from '../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import type { Measure } from '../measureselector/model/state/entities/Measure';
import store from '../../../../../store/store';
import Controller from '../../../../../Controller';
import { ChartAreaPageStateNamespace } from '../../../../common/components/chartarea/model/state/namespace/ChartAreaPageStateNamespace';
import { AppState } from '../../../../../store/AppState';
import selectShownMeasures from '../../../../common/model/state/selectors/selectShownMeasures';
import createShownDimensionsSelector from '../../../../common/model/state/selectors/createShownDimensionsSelector';
import { controller as selectorWithDefaultActionsController } from '../../../../common/components/selectorwithdefaultactions/selectorWithDefaultActionsController';

export default class DimensionSelectorController extends Controller<ChartAreaPageStateNamespace> {
  getState(appState: AppState) {
    return OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.dimensionSelectorState, {
      shownMeasures: selectShownMeasures(appState),
      shownDimensions: createShownDimensionsSelector(true)(appState),
      selectedChart: appState.dataExplorerPage.chartAreaState.selectedChart,
      isLayoutSelectorOpen: appState.common.selectorStates.layoutSelector.isSelectorOpen,
      isChartTypeSelectorOpen: appState.common.selectorStates.chartTypeSelector.isSelectorOpen,
      isDataSourceSelectorOpen: appState.common.selectorStates.dataSourceSelector.isSelectorOpen,
      isMeasureSelectorOpen: appState.common.selectorStates.measureSelector.isSelectorOpen,
      theme: appState.dataExplorerPage.settingsState.theme
    });
  }

  getActionDispatchers() {
    return {
      addSelectedDimensionToSelectedChart: (
        dimension: Dimension | Measure,
        possibleVisualizationType?: DimensionVisualizationType
      ) => {
        this.dispatch(
          new AddSelectDimensionToSelectedChartAction('dataExplorerPage', dimension, possibleVisualizationType)
        );

        this.dispatchWithDi(diContainer, StartFetchDataForSelectedChartAction, {
          stateNamespace: 'dataExplorerPage'
        });
      },

      removeSelectedDimensionFromSelectedChart: (selectedDimension: SelectedDimension) => {
        this.dispatch(new RemoveSelectedDimensionFromSelectedChartAction('dataExplorerPage', selectedDimension));

        this.dispatchWithDi(diContainer, StartFetchDataForSelectedChartAction, {
          stateNamespace: 'dataExplorerPage'
        });
      },

      changeSelectedDimensionColorForSelectedChart: (selectedDimension: SelectedDimension, color: string) => {
        this.dispatch(
          new ChangeSelectedDimensionColorForSelectedChartAction('dataExplorerPage', selectedDimension, color)
        );
      },

      toggleMaximizeSelector:
        selectorWithDefaultActionsController.getActionDispatchers('dimensionSelector').toggleMaximizeSelector
    };
  }
}

export const controller = new DimensionSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
