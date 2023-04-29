import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import _ from 'lodash';
import styles from './MeasureSelectorView.module.scss';
import SelectedMeasureListItemView from './selected/listitem/SelectedMeasureListItemView';
import DimensionListItemView from '../../../../../../../common/views/list/item/DimensionListItemView';
import SelectorWithDefaultActionsView from '../../../../../../../common/components/selector/withtitleactions/view/SelectorWithTitleActionsView';
import type { SelectedMeasure } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/SelectedMeasure';
import type { Dimension } from '../../dimension/model/state/types/Dimension';
import type { AggregationFunction } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { MeasureVisualizationType } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/MeasureVisualizationType';
import ListView from '../../../../../../../common/views/list/ListView';
import { ActionDispatchers, controller, State } from '../controller/measureSelectorController';
import emptyDataSource from '../../../../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import { Measure } from '../model/state/types/Measure';
import stopEventPropagation from '../../../../../../../common/utils/stopEventPropagation';
import MeasureDropZoneListItemViewFactory from './MeasureDropZoneListItemViewFactory';
import DraggableMeasureListItemView from './DraggableMeasureListItemView';

type Props = ActionDispatchers & State;

const MeasureSelectorView = ({
  addSelectedMeasureToSelectedChart,
  changeSelectedMeasureAggregationFunctionForSelectedChart,
  changeSelectedMeasureVisualizationColorForSelectedChart,
  changeSelectedMeasureVisualizationTypeForSelectedChart,
  isChartTypeSelectorOpen,
  isDataSourceSelectorOpen,
  isDimensionSelectorOpen,
  isLayoutSelectorOpen,
  measures,
  removeSelectedMeasureFromSelectedChart,
  selectedChart,
  shownDimensions,
  shownMeasures,
  theme,
  toggleMaximizeSelector
}: Props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMaximizeIconClick = useCallback(
    _.debounce(
      () =>
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
            isOpen: isDimensionSelectorOpen,
            selectorStateNamespace: 'dimensionSelector'
          },
          {
            isOpen: isDataSourceSelectorOpen,
            selectorStateNamespace: 'dataSourceSelector'
          }
        ]),
      150
    ),
    [
      isChartTypeSelectorOpen,
      isDataSourceSelectorOpen,
      isDimensionSelectorOpen,
      isLayoutSelectorOpen,
      toggleMaximizeSelector
    ]
  );

  const leaveDropZone = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    const targetStyle = event.currentTarget.style;
    targetStyle.border = '';
    targetStyle.color = '';
    targetStyle.fontWeight = 'normal';
  }, []);

  const dropMeasure = useCallback(
    (event: React.DragEvent<HTMLDivElement>, visualizationType: MeasureVisualizationType) => {
      event.preventDefault();
      leaveDropZone(event);
      const droppedMeasureName = event.dataTransfer.getData('measureName');
      const measure = measures.find(({ name }: Dimension) => name === droppedMeasureName);

      if (measure) {
        addSelectedMeasureToSelectedChart(measure, measure.unit === 'percent' ? 'AVG' : 'SUM', visualizationType);
      }
    },
    [addSelectedMeasureToSelectedChart, measures, leaveDropZone]
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

  const measureDropZoneListItems = useMemo(() => {
    function enterDropZone(event: React.DragEvent<HTMLDivElement>) {
      event.preventDefault();

      const targetStyle = event.currentTarget.style;
      targetStyle.border = '2px dashed var(--brand-color-1)';
      targetStyle.color = 'var(--brand-color-1)';
      targetStyle.fontWeight = 'bold';
    }

    const measureDropZoneListItemViewFactory = new MeasureDropZoneListItemViewFactory(
      styles.measureDropZone,
      enterDropZone,
      leaveDropZone,
      dropMeasure
    );

    return selectedChart.getMeasureDropZoneListItemViews(measureDropZoneListItemViewFactory);
  }, [dropMeasure, leaveDropZone, selectedChart]);

  const measureListItems = useMemo(() => {
    const isSelectedMeasure = (measure: Measure) =>
      selectedChart.selectedMeasures.some((selectedMeasure) => selectedMeasure.measure === measure);

    return shownMeasures
      .filter((measure: Measure) => !isSelectedMeasure(measure))
      .map((measure) => (
        <DraggableMeasureListItemView
          key={measure.name}
          item={measure}
          onItemClick={() =>
            addSelectedMeasureToSelectedChart(
              measure,
              measure.unit === 'percent' ? 'AVG' : 'SUM',
              selectedChart.getNextMeasureVisualizationType()
            )
          }
          onItemDblClick={handleMaximizeIconClick}
          actions={
            measure.unit === 'percent'
              ? [
                  {
                    iconName: 'pencil',
                    perform: () => {},
                    tooltipText: 'Edit'
                  },
                  {
                    iconName: 'trash alternate outline',
                    perform: () => {},
                    tooltipText: 'Delete'
                  }
                ]
              : undefined
          }
        />
      ));
  }, [addSelectedMeasureToSelectedChart, handleMaximizeIconClick, selectedChart, shownMeasures]);

  const dimensionListItems = useMemo(
    () =>
      shownDimensions.map((dimension: Dimension) => (
        <DimensionListItemView
          key={dimension.name}
          iconClassName=""
          item={dimension}
          onItemClick={() =>
            addSelectedMeasureToSelectedChart(
              dimension,
              dimension.unit === 'percent' ? 'AVG' : 'SUM',
              selectedChart.getNextMeasureVisualizationType()
            )
          }
          onItemDblClick={handleMaximizeIconClick}
        />
      )),
    [addSelectedMeasureToSelectedChart, handleMaximizeIconClick, selectedChart, shownDimensions]
  );

  return (
    <SelectorWithDefaultActionsView
      id="measureSelector"
      titleText="MEASURES"
      addIconTooltipText="Add new measure"
      position="leftPane"
      selectedListItemsContent={
        <section className={styles.selectedListItems}>
          <List className={styles.list}>{selectedMeasureListItems}</List>
          <List className={styles.list}>{measureDropZoneListItems}</List>
        </section>
      }
      listItemsContent={
        <>
          <ListView
            listItems={measureListItems}
            noContentFirstLineText="No measures"
            noContentSecondLineText={selectedChart.dataSource === emptyDataSource ? 'Select data source first' : ''}
          />
          {selectedChart.dataSource.type === 'raw' && (
            <ListView
              className={styles.divider}
              listItems={dimensionListItems}
              noContentFirstLineText=""
              noContentSecondLineText=""
            />
          )}
        </>
      }
      handleMaximizeIconClick={_.flow(stopEventPropagation, handleMaximizeIconClick)}
      selectorStateNamespace="measureSelector"
    />
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(MeasureSelectorView);
