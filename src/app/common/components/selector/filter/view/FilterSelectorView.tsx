import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import styles from './FilterSelectorView.module.scss';
import MeasureFilterView from './MeasureFilterView';
import DimensionFilterView from './DimensionFilterView';
import SelectorWithActionsView from '../../withtitleactions/view/SelectorWithTitleActionsView';
import MeasureListItemView from '../../../../views/list/item/MeasureListItemView';
import DimensionListItemView from '../../../../views/list/item/DimensionListItemView';
import type { Dimension } from '../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { FilterSelectorStateNamespace } from '../model/state/FilterSelectorStateNamespace';
import selectorWithActionsStateNamespaces from '../../withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';
import selectorStateNamespaces from '../../model/state/types/SelectorStateNamespace';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { FilterInputType } from '../../../chartarea/chart/model/state/filters/filter/inputtype/FilterInputType';
import type { DataScope } from '../../../chartarea/chart/model/state/types/DataScope';
import MeasuresAndDimensionsTabView from '../../../../views/tab/selector/measuresanddimensions/MeasuresAndDimensionsTabView';
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

  const filterListItems = selectedChart
    .getFilters()
    .filter(({ filterInputType }) => filterInputType !== 'Quick filter')
    .map((filter) => {
      if (filter.type === 'measure') {
        return (
          <MeasureFilterView
            key={filter.measureOrDimension.name}
            filter={filter}
            chart={selectedChart}
            removeFilter={() => removeFilterFromSelectedChart(filter)}
            changeFilterAggregationFunction={(aggregationFunction: AggregationFunction) =>
              changeFilterAggregationFunctionForSelectedChart(filter, aggregationFunction)
            }
            changeFilterExpression={(expression: string) => changeFilterExpressionForSelectedChart(filter, expression)}
            changeFilterInputType={(filterInputType: FilterInputType) =>
              changeFilterInputTypeForSelectedChart(filter, filterInputType)
            }
            changeFilterDataScopeType={(dataScopeType: DataScope) =>
              changeFilterDataScopeTypeForSelectedChart(filter, dataScopeType)
            }
          />
        );
      }

      return (
        <DimensionFilterView
          key={filter.measureOrDimension.name}
          filter={filter}
          chartData={selectedChart.data}
          removeFilter={() => removeFilterFromSelectedChart(filter)}
          changeFilterExpression={(expression: string) => changeFilterExpressionForSelectedChart(filter, expression)}
          changeFilterInputType={(filterInputType: FilterInputType) =>
            changeFilterInputTypeForSelectedChart(filter, filterInputType)
          }
          changeFilterDataScopeType={(dataScopeType: DataScope) =>
            changeFilterDataScopeTypeForSelectedChart(filter, dataScopeType)
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
    .filter((chart) => chart !== selectedChart && chart.hasData())
    .map((chart) => (
      <ChartListItemView
        key={chart.id}
        item={{ name: `Chart ${chart.getName(stateNamespace)}` }}
        onItemClick={() => {}}
      />
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
          <List>{filterListItems}</List>
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
