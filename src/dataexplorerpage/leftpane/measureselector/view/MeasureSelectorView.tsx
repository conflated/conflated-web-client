import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import OOReduxUtils from 'oo-redux-utils';
import { List } from 'semantic-ui-react';
import styles from './MeasureSelectorView.module.scss';
import SelectedMeasureListItemView from './selectedmeasure/listitem/SelectedMeasureListItemView';
import DimensionListItemView from '../../../../common/view/dimensionlistitem/DimensionListItemView';
import MeasureListItemView from '../../../../common/view/measurelistitem/MeasureListItemView';
import type { AppState } from '../../../../store/AppState';
import MeasureSelectorControllerFactory from '../controller/MeasureSelectorControllerFactory';
import SelectorWithDefaultActionsView from '../../../../common/components/selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import selectShownDimensions from '../../../../common/model/state/selectors/createShownDimensionsSelector';
import selectShownMeasures from '../../../../common/model/state/selectors/selectShownMeasures';
import type { SelectedMeasure } from '../../../../common/components/chartarea/chart/model/state/selectedmeasure/SelectedMeasure';
import type { Measure } from '../model/state/entities/Measure';
import type { Dimension } from '../../dimensionselector/model/state/entities/Dimension';
import type { AggregationFunction } from '../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { MeasureVisualizationType } from '../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/MeasureVisualizationType';
import ListItemsView from '../../../../common/view/listitems/ListItemsView';
import SelectorWithDefaultActionsControllerFactory from '../../../../common/components/selectorwithdefaultactions/controller/SelectorWithDefaultActionsControllerFactory';

const mapAppStateToComponentProps = (appState: AppState) =>
  OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.measureSelectorState, {
    shownDimensions: selectShownDimensions(false)(appState),
    shownMeasures: selectShownMeasures(appState),
    selectedChart: appState.dataExplorerPage.chartAreaState.selectedChart,
    isLayoutSelectorOpen: appState.common.selectorStates.layoutSelector.isSelectorOpen,
    isChartTypeSelectorOpen: appState.common.selectorStates.chartTypeSelector.isSelectorOpen,
    isDataSourceSelectorOpen: appState.common.selectorStates.dataSourceSelector.isSelectorOpen,
    isDimensionSelectorOpen: appState.common.selectorStates.dimensionSelector.isSelectorOpen,
    theme: appState.dataExplorerPage.settingsState.theme
  });

const createController = (dispatch: Dispatch) => ({
  toggleMaximizeSelector: new SelectorWithDefaultActionsControllerFactory(
    dispatch,
    'measureSelector'
  ).createController().toggleMaximizeSelector,

  ...new MeasureSelectorControllerFactory(dispatch).createController()
});

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function MeasureSelectorView({
  addSelectedMeasureToSelectedChart,
  changeSelectedMeasureAggregationFunctionForSelectedChart,
  changeSelectedMeasureVisualizationColorForSelectedChart,
  changeSelectedMeasureVisualizationTypeForSelectedChart,
  isChartTypeSelectorOpen,
  isDataSourceSelectorOpen,
  isDimensionSelectorOpen,
  isLayoutSelectorOpen,
  removeSelectedMeasureFromSelectedChart,
  selectedChart,
  shownDimensions,
  shownMeasures,
  theme,
  toggleMaximizeSelector
}: Props) {
  const handleMaximizeIconClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isLayoutSelectorOpen,
          stateNamespace: 'layoutSelector'
        },
        {
          isOpen: isChartTypeSelectorOpen,
          stateNamespace: 'chartTypeSelector'
        },
        {
          isOpen: isDimensionSelectorOpen,
          stateNamespace: 'dimensionSelector'
        },
        {
          isOpen: isDataSourceSelectorOpen,
          stateNamespace: 'dataSourceSelector'
        }
      ]);
    },
    [
      isChartTypeSelectorOpen,
      isDataSourceSelectorOpen,
      isDimensionSelectorOpen,
      isLayoutSelectorOpen,
      toggleMaximizeSelector
    ]
  );

  const selectedMeasureListItems = useMemo(
    () =>
      selectedChart.selectedMeasures.map((selectedMeasure: SelectedMeasure) => (
        <SelectedMeasureListItemView
          key={selectedMeasure.measure.name}
          selectedMeasure={selectedMeasure}
          chart={selectedChart}
          theme={theme}
          removeSelectedMeasure={() => removeSelectedMeasureFromSelectedChart(selectedMeasure)}
          changeAggregationFunction={(aggregationFunction: AggregationFunction) =>
            changeSelectedMeasureAggregationFunctionForSelectedChart(selectedMeasure, aggregationFunction)
          }
          changeVisualizationType={(visualizationType: MeasureVisualizationType) =>
            changeSelectedMeasureVisualizationTypeForSelectedChart(selectedMeasure, visualizationType)
          }
          changeVisualizationColor={(color: string) =>
            changeSelectedMeasureVisualizationColorForSelectedChart(selectedMeasure, color)
          }
        />
      )),
    [
      changeSelectedMeasureAggregationFunctionForSelectedChart,
      changeSelectedMeasureVisualizationColorForSelectedChart,
      changeSelectedMeasureVisualizationTypeForSelectedChart,
      removeSelectedMeasureFromSelectedChart,
      selectedChart,
      theme
    ]
  );

  const measureAndDimensionListItems = useMemo(() => {
    const measureListItems = shownMeasures.map((measure: Measure) => (
      <MeasureListItemView
        key={measure.name}
        iconClassName=""
        item={measure}
        onItemClick={() => addSelectedMeasureToSelectedChart(measure, 'SUM')}
      />
    ));

    const dimensionListItems = shownDimensions.map((dimension: Dimension) => (
      <DimensionListItemView
        key={dimension.name}
        iconClassName=""
        item={dimension}
        onItemClick={() => addSelectedMeasureToSelectedChart(dimension, 'SUM')}
      />
    ));

    return [...measureListItems, ...dimensionListItems];
  }, [addSelectedMeasureToSelectedChart, shownDimensions, shownMeasures]);

  return (
    <SelectorWithDefaultActionsView
      id="measureSelector"
      titleText="MEASURE"
      selectedListItemsContent={
        <section className={styles.selectedListItems}>
          <List>{selectedMeasureListItems}</List>
        </section>
      }
      listItemsContent={
        <ListItemsView
          listItems={measureAndDimensionListItems}
          noContentFirstLineText="No measures"
          noContentSecondLineText="Select data source first"
        />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace="measureSelector"
    />
  );
}

export default connect(mapAppStateToComponentProps, createController)(MeasureSelectorView);
