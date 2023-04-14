import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import styles from './FilterSelectorView.module.scss';
import MeasureFilterView from './MeasureFilterView';
import DimensionFilterView from './DimensionFilterView';
import SelectorWithActionsView from '../../withactions/view/SelectorWithActionsView';
import MeasureListItemView from '../../../../views/list/item/MeasureListItemView';
import DimensionListItemView from '../../../../views/list/item/DimensionListItemView';
import type { Dimension } from '../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { FilterSelectorStateNamespace } from '../model/state/FilterSelectorStateNamespace';
import selectorWithActionsStateNamespaces from '../../withactions/model/state/types/SelectorWithActionsStateNamespace';
import selectorStateNamespaces from '../../model/state/types/SelectorStateNamespace';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { FilterInputType } from '../../../chartarea/chart/model/state/filters/filter/inputtype/FilterInputType';
import type { DataScopeType } from '../../../chartarea/chart/model/state/types/DataScopeType';
import MeasuresAndDimensionsTabView from '../../../../views/tab/selector/measuresanddimensions/MeasuresAndDimensionsTabView';
import type { Filter } from '../../../chartarea/chart/model/state/filters/filter/Filter';
import { ActionDispatchers, controller, State } from '../controller/filterSelectorController';
import ChartListItemView from '../../../../views/list/item/ChartListItemView';

export type OwnProps = { stateNamespace: FilterSelectorStateNamespace };

type Props = OwnProps & ActionDispatchers & State;

const FilterSelectorView = ({
  addDimensionFilterToSelectedChart,
  addMeasureFilterToSelectedChart,
  changeFilterAggregationFunctionForSelectedChart,
  changeFilterExpressionForSelectedChart,
  changeFilterInputTypeForSelectedChart,
  changeFilterDataScopeTypeForSelectedChart,
  charts,
  isDataPointsCountSelectorOpen,
  isSortBySelectorOpen,
  stateNamespace,
  removeFilterFromSelectedChart,
  selectedChart,
  shouldShowPageRightPanePermanently,
  shownDimensions,
  shownMeasures,
  toggleShouldShowPageRightPanePermanently,
  toggleMaximizeSelector
}: Props) => {
  const handleMaximizeIconClick = (event: React.SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();

    toggleMaximizeSelector([
      {
        isOpen: isSortBySelectorOpen,
        selectorStateNamespace: selectorStateNamespaces[`${stateNamespace}SortBySelector`]
      },
      {
        isOpen: isDataPointsCountSelectorOpen,
        selectorStateNamespace: selectorStateNamespaces[`${stateNamespace}DataPointsCountSelector`]
      }
    ]);
  };

  const selectedFilterListItems = selectedChart.getSelectedFilters().map((selectedFilter: Filter) => {
    if (selectedFilter.type === 'measure') {
      return (
        <MeasureFilterView
          key={selectedFilter.measureOrDimension.name}
          filter={selectedFilter}
          chart={selectedChart}
          removeFilter={() => removeFilterFromSelectedChart(selectedFilter)}
          changeFilterAggregationFunction={(aggregationFunction: AggregationFunction) =>
            changeFilterAggregationFunctionForSelectedChart(selectedFilter, aggregationFunction)
          }
          changeFilterExpression={(expression: string) =>
            changeFilterExpressionForSelectedChart(selectedFilter, expression)
          }
          changeFilterInputType={(filterInputType: FilterInputType) =>
            changeFilterInputTypeForSelectedChart(selectedFilter, filterInputType)
          }
          changeFilterDataScopeType={(dataScopeType: DataScopeType) =>
            changeFilterDataScopeTypeForSelectedChart(selectedFilter, dataScopeType)
          }
        />
      );
    }

    return (
      <DimensionFilterView
        key={selectedFilter.measureOrDimension.name}
        filter={selectedFilter}
        chartData={selectedChart.chartData}
        removeFilter={() => removeFilterFromSelectedChart(selectedFilter)}
        changeFilterExpression={(expression: string) =>
          changeFilterExpressionForSelectedChart(selectedFilter, expression)
        }
        changeFilterInputType={(filterInputType: FilterInputType) =>
          changeFilterInputTypeForSelectedChart(selectedFilter, filterInputType)
        }
        changeFilterDataScopeType={(dataScopeType: DataScopeType) =>
          changeFilterDataScopeTypeForSelectedChart(selectedFilter, dataScopeType)
        }
      />
    );
  });

  const measureListItems = shownMeasures.map((measure: Measure) => (
    <MeasureListItemView
      key={measure.name}
      item={measure}
      onItemClick={() => addMeasureFilterToSelectedChart(measure)}
    />
  ));

  const dimensions = [
    ...selectedChart.selectedDimensions.map((selectedDimension) => selectedDimension.dimension),
    ...shownDimensions
  ].sort();

  const dimensionListItems = dimensions.map((dimension: Dimension) => (
    <DimensionListItemView
      key={dimension.name}
      item={dimension}
      onItemClick={() => addDimensionFilterToSelectedChart(dimension)}
    />
  ));

  const chartListItems = charts
    .filter((chart) => chart !== selectedChart)
    .map((chart) => (
      <ChartListItemView key={chart.id} item={{ name: chart.getName(stateNamespace) }} onItemClick={() => {}} />
    ));

  const selectorStateNamespace = `${stateNamespace}FilterSelector`;

  return (
    <SelectorWithActionsView
      id={selectorStateNamespace}
      titleText="FILTERS"
      addIconTooltipText="Add new filter"
      position="rightPane"
      selectedListItemsContent={
        <section className={styles.selectedFiltersSection}>
          <List>{selectedFilterListItems}</List>
        </section>
      }
      listItemsContent={
        <MeasuresAndDimensionsTabView
          dimensionListItems={dimensionListItems}
          measureListItems={measureListItems}
          thirdTabPaneListItems={chartListItems}
          thirdTabPaneName="CHARTS"
        />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      isPinned={shouldShowPageRightPanePermanently}
      handlePinIconClick={toggleShouldShowPageRightPanePermanently}
      selectorStateNamespace={selectorWithActionsStateNamespaces[selectorStateNamespace]}
    />
  );
};

export default connect(
  controller.getState,
  _.memoize(
    (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
    (...args) => args[1].stateNamespace
  )
)(FilterSelectorView);
