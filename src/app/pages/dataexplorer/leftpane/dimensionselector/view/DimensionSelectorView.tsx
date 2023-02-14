import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import styles from './DimensionSelectorView.module.scss';
import DraggableDimensionListItemView from './draggabledimensionlistitem/DraggableDimensionListItemView';
import SelectedDimensionListItem from './selecteddimensionlistitem/SelectedDimensionListItem';
import type { AppState } from '../../../../../../store/AppState';
import SelectorWithDefaultActionsView from '../../../../../common/components/selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import type { Dimension } from '../model/state/entities/Dimension';
import type { SelectedDimension } from '../../../../../common/components/chartarea/chart/model/state/selecteddimension/SelectedDimension';
import type { DimensionVisualizationType } from '../../../../../common/components/chartarea/chart/model/state/selecteddimension/types/DimensionVisualizationType';
import type { Measure } from '../../measureselector/model/state/entities/Measure';
import DraggableMeasureAsDimensionListItemView from './draggabledimensionlistitem/DraggableMeasureAsDimensionListItemView';
import DimensionDropZoneListItemViewFactory from './dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import ListItemsView from '../../../../../common/view/listitems/ListItemsView';
import { ActionDispatchers, controller, State } from '../dimensionSelectorController';

type Props = ActionDispatchers & State;

const DimensionSelectorView = ({
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
}: Props) => {
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
      addIconTooltipText="Add new dimension"
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
};

export default connect(
  (appState: AppState) => controller.getState(appState),
  () => controller.getActionDispatchers()
)(DimensionSelectorView);
