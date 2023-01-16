import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import OOReduxUtils from 'oo-redux-utils';
import { List } from 'semantic-ui-react';
import styles from './DimensionSelectorView.module.scss';
import DraggableDimensionListItemView from './draggabledimensionlistitem/DraggableDimensionListItemView';
import SelectedDimensionListItem from './selecteddimensionlistitem/SelectedDimensionListItem';
import type { AppState } from '../../../../../../store/AppState';
import DimensionSelectorControllerFactory from '../controller/DimensionSelectorControllerFactory';
import SelectorWithDefaultActionsView from '../../../../../common/components/selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import selectShownMeasures from '../../../../../common/model/state/selectors/selectShownMeasures';
import type { Dimension } from '../model/state/entities/Dimension';
import type { SelectedDimension } from '../../../../../common/components/chartarea/chart/model/state/selecteddimension/SelectedDimension';
import type { DimensionVisualizationType } from '../../../../../common/components/chartarea/chart/model/state/selecteddimension/types/DimensionVisualizationType';
import type { Measure } from '../../measureselector/model/state/entities/Measure';
import createShownDimensionsSelector from '../../../../../common/model/state/selectors/createShownDimensionsSelector';
import DraggableMeasureAsDimensionListItemView from './draggabledimensionlistitem/DraggableMeasureAsDimensionListItemView';
import DimensionDropZoneListItemViewFactory from './dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import ListItemsView from '../../../../../common/view/listitems/ListItemsView';
import SelectorWithDefaultActionsController from '../../../../../common/components/selectorwithdefaultactions/selectorWithDefaultActionsController';

const mapAppStateToComponentProps = (appState: AppState) =>
  OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.dimensionSelectorState, {
    shownMeasures: selectShownMeasures(appState),
    shownDimensions: createShownDimensionsSelector(true)(appState),
    selectedChart: appState.dataExplorerPage.chartAreaState.selectedChart,
    isLayoutSelectorOpen: appState.common.selectorStates.layoutSelector.isSelectorOpen,
    isChartTypeSelectorOpen: appState.common.selectorStates.chartTypeSelector.isSelectorOpen,
    isDataSourceSelectorOpen: appState.common.selectorStates.dataSourceSelector.isSelectorOpen,
    isMeasureSelectorOpen: appState.common.selectorStates.measureSelector.isSelectorOpen,
    theme: appState.dataExplorerPage.settingsState.theme
  });

const createController = (dispatch: Dispatch) => ({
  toggleMaximizeSelector: new SelectorWithDefaultActionsController(dispatch, 'dimensionSelector').createController()
    .toggleMaximizeSelector,

  ...new DimensionSelectorControllerFactory(dispatch).createController()
});

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function DimensionSelectorView({
  addSelectedDimensionToSelectedChart,
  changeSelectedDimensionColorForSelectedChart,
  dimensions,
  isChartTypeSelectorOpen,
  isDataSourceSelectorOpen,
  isLayoutSelectorOpen,
  isMeasureSelectorOpen,
  removeSelectedDimensionFromSelectedChart,
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
          isOpen: isMeasureSelectorOpen,
          stateNamespace: 'measureSelector'
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
      isLayoutSelectorOpen,
      isMeasureSelectorOpen,
      toggleMaximizeSelector
    ]
  );

  const leaveDropZone = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    const targetStyle = event.currentTarget.style;
    targetStyle.border = '';
    targetStyle.color = '';
    targetStyle.fontWeight = 'normal';
  }, []);

  const dropDimension = useCallback(
    (event: React.DragEvent<HTMLDivElement>, visualizationType: DimensionVisualizationType) => {
      event.preventDefault();
      leaveDropZone(event);

      const droppedDimensionName = event.dataTransfer.getData('dimensionName');
      const dimension = dimensions.find(({ name }: Dimension) => name === droppedDimensionName);
      if (dimension) {
        addSelectedDimensionToSelectedChart(dimension, visualizationType);
      }
    },
    [addSelectedDimensionToSelectedChart, dimensions, leaveDropZone]
  );

  const selectedDimensionListItems = useMemo(
    () =>
      selectedChart.selectedDimensions.map((selectedDimension: SelectedDimension) => (
        <SelectedDimensionListItem
          key={selectedDimension.dimension.name}
          selectedDimension={selectedDimension}
          removeSelectedDimension={() => removeSelectedDimensionFromSelectedChart(selectedDimension)}
          theme={theme}
          changeVisualizationColor={(color: string) =>
            changeSelectedDimensionColorForSelectedChart(selectedDimension, color)
          }
          shouldShowVisualizationColorPicker={selectedChart.supportsSelectedDimensionVisualizationColor()}
        />
      )),
    [changeSelectedDimensionColorForSelectedChart, removeSelectedDimensionFromSelectedChart, selectedChart, theme]
  );

  const dimensionDropZoneListItems = useMemo(() => {
    function enterDropZone(event: React.DragEvent<HTMLDivElement>) {
      event.preventDefault();
      if (event.dataTransfer.getData('dimensionName')) {
        const targetStyle = event.currentTarget.style;
        targetStyle.border = '2px dashed var(--brand-color-1)';
        targetStyle.color = 'var(--brand-color-1)';
        targetStyle.fontWeight = 'bold';
      }
    }

    const dimensionDropZoneListItemViewFactory = new DimensionDropZoneListItemViewFactory(
      styles.dimensionDropZone,
      enterDropZone,
      leaveDropZone,
      dropDimension
    );

    return selectedChart.getDimensionDropZoneListItemViews(dimensionDropZoneListItemViewFactory);
  }, [dropDimension, leaveDropZone, selectedChart]);

  const dimensionAndMeasureListItems = useMemo(() => {
    const dimensionListItems = shownDimensions.map((dimension: Dimension) => (
      <DraggableDimensionListItemView
        key={dimension.name}
        item={dimension}
        onItemClick={() => addSelectedDimensionToSelectedChart(dimension)}
      />
    ));

    const measureListItems = shownMeasures.map((measure: Measure) => (
      <DraggableMeasureAsDimensionListItemView
        key={measure.name}
        item={measure}
        onItemClick={() => addSelectedDimensionToSelectedChart(measure)}
      />
    ));

    return [...dimensionListItems, ...measureListItems];
  }, [addSelectedDimensionToSelectedChart, shownDimensions, shownMeasures]);

  return (
    <SelectorWithDefaultActionsView
      id="dimensionSelector"
      titleText="DIMENSION"
      selectedListItemsContent={
        <section className={styles.selectedDimensionsAndDropZonesSection}>
          <List className={styles.list}>{selectedDimensionListItems}</List>
          <List className={styles.list}>{dimensionDropZoneListItems}</List>
        </section>
      }
      listItemsContent={
        <ListItemsView
          listItems={dimensionAndMeasureListItems}
          noContentFirstLineText="No dimensions"
          noContentSecondLineText="Select data source first"
        />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace="dimensionSelector"
    />
  );
}

export default connect(mapAppStateToComponentProps, createController)(DimensionSelectorView);
