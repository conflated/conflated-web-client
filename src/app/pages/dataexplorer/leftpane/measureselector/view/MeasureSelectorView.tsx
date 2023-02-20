import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import styles from './MeasureSelectorView.module.scss';
import SelectedMeasureListItemView from './selectedmeasure/listitem/SelectedMeasureListItemView';
import DimensionListItemView from '../../../../../common/view/dimensionlistitem/DimensionListItemView';
import MeasureListItemView from '../../../../../common/view/measurelistitem/MeasureListItemView';
import SelectorWithDefaultActionsView from '../../../../../common/components/selectorwithactions/view/SelectorWithActionsView';
import type { SelectedMeasure } from '../../../../../common/components/chartarea/chart/model/state/selectedmeasure/SelectedMeasure';
import type { Measure } from '../model/state/types/Measure';
import type { Dimension } from '../../dimensionselector/model/state/types/Dimension';
import type { AggregationFunction } from '../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { MeasureVisualizationType } from '../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/MeasureVisualizationType';
import ListItemsView from '../../../../../common/view/listitems/ListItemsView';
import { ActionDispatchers, controller, State } from '../controller/measureSelectorController';

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
  removeSelectedMeasureFromSelectedChart,
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
          isOpen: isDimensionSelectorOpen,
          selectorStateNamespace: 'dimensionSelector'
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
      addIconTooltipText="Add new measure"
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
};

export default connect(controller.getState, () => controller.actionDispatchers)(MeasureSelectorView);
