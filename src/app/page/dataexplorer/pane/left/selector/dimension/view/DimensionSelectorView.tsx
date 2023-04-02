import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import styles from './DimensionSelectorView.module.scss';
import DraggableDimensionListItemView from './draggabledimensionlistitem/DraggableDimensionListItemView';
import SelectedDimensionListItem from './selecteddimensionlistitem/SelectedDimensionListItem';
import SelectorWithActionsView from '../../../../../../../common/components/selector/withactions/view/SelectorWithActionsView';
import type { Dimension } from '../model/state/types/Dimension';
import type { SelectedDimension } from '../../../../../../../common/components/chartarea/chart/model/state/selecteddimension/SelectedDimension';
import type { DimensionVisualizationType } from '../../../../../../../common/components/chartarea/chart/model/state/selecteddimension/types/DimensionVisualizationType';
import type { Measure } from '../../measure/model/state/types/Measure';
import DraggableMeasureAsDimensionListItemView from './draggabledimensionlistitem/DraggableMeasureAsDimensionListItemView';
import DimensionDropZoneListItemViewFactory from './dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import ListView from '../../../../../../../common/views/list/ListView';
import { ActionDispatchers, controller, State } from '../controller/dimensionSelectorController';
import emptyDataSource from '../../../../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import DraggableChartListItemView from './draggabledimensionlistitem/DraggableChartListItemView';

type Props = ActionDispatchers & State;

const DimensionSelectorView = ({
  addSelectedDimensionToSelectedChart,
  changeSelectedDimensionColorForSelectedChart,
  charts,
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
          selectorStateNamespace: 'layoutSelector'
        },
        {
          isOpen: isChartTypeSelectorOpen,
          selectorStateNamespace: 'chartTypeSelector'
        },
        {
          isOpen: isMeasureSelectorOpen,
          selectorStateNamespace: 'measureSelector'
        },
        {
          isOpen: isDataSourceSelectorOpen,
          selectorStateNamespace: 'dataSourceSelector'
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

    const chartFilteringDimensionDropZOneListItem =
      dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('0', 'X-axis categories', 'filtering chart');

    return [
      selectedChart.selectedDimensions.length === 0 ? chartFilteringDimensionDropZOneListItem : [],
      ...selectedChart.getDimensionDropZoneListItemViews(dimensionDropZoneListItemViewFactory)
    ];
  }, [dropDimension, leaveDropZone, selectedChart]);

  const dimensionListItems = useMemo(
    () =>
      shownDimensions.map((dimension: Dimension) => (
        <DraggableDimensionListItemView
          key={dimension.name}
          item={dimension}
          onItemClick={() => addSelectedDimensionToSelectedChart(dimension)}
        />
      )),
    [addSelectedDimensionToSelectedChart, shownDimensions]
  );

  const chartListItems = useMemo(
    () =>
      charts
        .filter((chart) => chart !== selectedChart)
        .map((chart) => (
          <DraggableChartListItemView key={chart.getName()} item={{ name: chart.getName() }} onItemClick={() => {}} />
        )),
    [charts, selectedChart]
  );

  const measureListItems = useMemo(
    () =>
      shownMeasures.map((measure: Measure) => (
        <DraggableMeasureAsDimensionListItemView
          key={measure.name}
          item={measure}
          onItemClick={() => addSelectedDimensionToSelectedChart(measure)}
        />
      )),
    [addSelectedDimensionToSelectedChart, shownMeasures]
  );

  return (
    <SelectorWithActionsView
      id="dimensionSelector"
      titleText="DIMENSIONS"
      position="leftPane"
      addIconTooltipText="Add new dimension"
      selectedListItemsContent={
        <section className={styles.selectedDimensionsAndDropZonesSection}>
          <List className={styles.list}>{selectedDimensionListItems}</List>
          <List className={styles.list}>{dimensionDropZoneListItems}</List>
        </section>
      }
      listItemsContent={
        <>
          <ListView
            listItems={dimensionListItems}
            noContentFirstLineText="No dimensions"
            noContentSecondLineText={selectedChart.dataSource === emptyDataSource ? 'Select data source first' : ''}
          />
          {selectedChart.selectedDimensions.length === 0 && (
            <ListView
              className={styles.divider}
              listItems={chartListItems}
              noContentFirstLineText=""
              noContentSecondLineText=""
            />
          )}
          {selectedChart.dataSource.type === 'raw' && (
            <ListView
              className={styles.divider}
              listItems={measureListItems}
              noContentFirstLineText=""
              noContentSecondLineText=""
            />
          )}
        </>
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace="dimensionSelector"
    />
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(DimensionSelectorView);