import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import _ from 'lodash';
import styles from './MeasureSelectorView.module.scss';
import SelectedMeasureListItemView from './selectedmeasure/listitem/SelectedMeasureListItemView';
import DimensionListItemView from '../../../../../../../common/views/list/item/DimensionListItemView';
import MeasureListItemView from '../../../../../../../common/views/list/item/MeasureListItemView';
import SelectorWithDefaultActionsView from '../../../../../../../common/components/selector/withactions/view/SelectorWithActionsView';
import type { SelectedMeasure } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/SelectedMeasure';
import type { Dimension } from '../../dimension/model/state/types/Dimension';
import type { AggregationFunction } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { MeasureVisualizationType } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/MeasureVisualizationType';
import ListView from '../../../../../../../common/views/list/ListView';
import { ActionDispatchers, controller, State } from '../controller/measureSelectorController';
import emptyDataSource from '../../../../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import { Measure } from '../model/state/types/Measure';
import stopEventPropagation from '../../../../../../../common/utils/stopEventPropagation';

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

  const measureListItems = useMemo(() => {
    const isSelectedMeasure = (measure: Measure) =>
      selectedChart.selectedMeasures.some((selectedMeasure) => selectedMeasure.measure === measure);

    return shownMeasures
      .filter((measure: Measure) => !isSelectedMeasure(measure))
      .map((measure) => (
        <MeasureListItemView
          key={measure.name}
          iconClassName=""
          item={measure}
          onItemClick={() => addSelectedMeasureToSelectedChart(measure, 'SUM')}
          onItemDblClick={handleMaximizeIconClick}
        />
      ));
  }, [addSelectedMeasureToSelectedChart, handleMaximizeIconClick, selectedChart.selectedMeasures, shownMeasures]);

  const dimensionListItems = useMemo(
    () =>
      shownDimensions.map((dimension: Dimension) => (
        <DimensionListItemView
          key={dimension.name}
          iconClassName=""
          item={dimension}
          onItemClick={() => addSelectedMeasureToSelectedChart(dimension, 'SUM')}
        />
      )),
    [addSelectedMeasureToSelectedChart, shownDimensions]
  );

  return (
    <SelectorWithDefaultActionsView
      id="measureSelector"
      titleText="MEASURES"
      addIconTooltipText="Add new measure"
      position="leftPane"
      selectedListItemsContent={
        <section className={styles.selectedListItems}>
          <List>{selectedMeasureListItems}</List>
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
