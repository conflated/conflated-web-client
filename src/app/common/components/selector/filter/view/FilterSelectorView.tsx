import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import styles from './FilterSelectorView.module.scss';
import MeasureSelectedFilterView from './selectedfilter/measureselectedfilter/MeasureSelectedFilterView';
import DimensionSelectedFilterView from './selectedfilter/dimensionselectedfilter/DimensionSelectedFilterView';
import SelectorWithActionsView from '../../withactions/view/SelectorWithActionsView';
import MeasureListItemView from '../../../../view/listitems/listitem/measure/MeasureListItemView';
import DimensionListItemView from '../../../../view/listitems/listitem/dimension/DimensionListItemView';
import type { Dimension } from '../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { Measure } from '../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import type { FilterSelectorStateNamespace } from '../model/state/FilterSelectorStateNamespace';
import selectorWithActionsStateNamespaces from '../../withactions/model/state/types/SelectorWithActionsStateNamespace';
import selectorStateNamespaces from '../../model/state/types/SelectorStateNamespace';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { FilterInputType } from '../../../chartarea/chart/model/state/selectedfilters/selectedfilter/types/FilterInputType';
import type { DataScopeType } from '../../../chartarea/chart/model/state/types/DataScopeType';
import MeasuresAndDimensionsTabView from '../../../../view/tab/measuresanddimensions/MeasuresAndDimensionsTabView';
import type { SelectedFilter } from '../../../chartarea/chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import { ActionDispatchers, controller, State } from '../controller/filterSelectorController';

export type OwnProps = { stateNamespace: FilterSelectorStateNamespace };

type Props = OwnProps & ActionDispatchers & State;

const FilterSelectorView = ({
  addDimensionFilterToSelectedChart,
  addMeasureFilterToSelectedChart,
  changeSelectedFilterAggregationFunctionForSelectedChart,
  changeSelectedFilterExpressionForSelectedChart,
  changeSelectedFilterInputTypeForSelectedChart,
  changeSelectedFilterDataScopeTypeForSelectedChart,
  isDataPointsCountSelectorOpen,
  isSortBySelectorOpen,
  stateNamespace,
  removeSelectedFilterFromSelectedChart,
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

  const selectedFilterListItems = selectedChart.getSelectedFilters().map((selectedFilter: SelectedFilter) => {
    if (selectedFilter.type === 'measure') {
      return (
        <MeasureSelectedFilterView
          key={selectedFilter.measureOrDimension.name}
          selectedFilter={selectedFilter}
          chart={selectedChart}
          removeSelectedFilter={() => removeSelectedFilterFromSelectedChart(selectedFilter)}
          changeSelectedFilterAggregationFunction={(aggregationFunction: AggregationFunction) =>
            changeSelectedFilterAggregationFunctionForSelectedChart(selectedFilter, aggregationFunction)
          }
          changeSelectedFilterExpression={(expression: string) =>
            changeSelectedFilterExpressionForSelectedChart(selectedFilter, expression)
          }
          changeSelectedFilterInputType={(filterInputType: FilterInputType) =>
            changeSelectedFilterInputTypeForSelectedChart(selectedFilter, filterInputType)
          }
          changeSelectedFilterDataScopeType={(dataScopeType: DataScopeType) =>
            changeSelectedFilterDataScopeTypeForSelectedChart(selectedFilter, dataScopeType)
          }
        />
      );
    }

    return (
      <DimensionSelectedFilterView
        key={selectedFilter.measureOrDimension.name}
        selectedFilter={selectedFilter}
        chartData={selectedChart.chartData}
        removeSelectedFilter={() => removeSelectedFilterFromSelectedChart(selectedFilter)}
        changeSelectedFilterExpression={(expression: string) =>
          changeSelectedFilterExpressionForSelectedChart(selectedFilter, expression)
        }
        changeSelectedFilterInputType={(filterInputType: FilterInputType) =>
          changeSelectedFilterInputTypeForSelectedChart(selectedFilter, filterInputType)
        }
        changeSelectedFilterDataScopeType={(dataScopeType: DataScopeType) =>
          changeSelectedFilterDataScopeTypeForSelectedChart(selectedFilter, dataScopeType)
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

  const dimensionListItems = shownDimensions.map((dimension: Dimension) => (
    <DimensionListItemView
      key={dimension.name}
      item={dimension}
      onItemClick={() => addDimensionFilterToSelectedChart(dimension)}
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
          <List>{selectedFilterListItems}</List>
        </section>
      }
      listItemsContent={
        <MeasuresAndDimensionsTabView measureListItems={measureListItems} dimensionListItems={dimensionListItems} />
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
