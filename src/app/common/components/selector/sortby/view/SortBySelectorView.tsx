import _ from 'lodash';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import styles from './SortBySelectorView.module.scss';
import SelectedSortByListItemView from './selectedsortbylistitem/SelectedSortByListItemView';
import type { Measure } from '../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Sort } from '../../../chartarea/chart/model/state/sorts/sort/Sort';
import SelectorWithActionsView from '../../withactions/view/SelectorWithActionsView';
import MeasureListItemView from '../../../../views/list/item/MeasureListItemView';
import DimensionListItemView from '../../../../views/list/item/DimensionListItemView';
import type { TimeSortOption } from '../../../chartarea/chart/model/state/sorts/sort/types/TimeSortOption';
import type { SortBySelectorStateNamespace } from '../model/state/types/SortBySelectorStateNamespace';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { SortDirection } from '../../../chartarea/chart/model/state/sorts/sort/types/SortDirection';
import type { DataScopeType } from '../../../chartarea/chart/model/state/types/DataScopeType';
import MeasuresDimensionsAndTimeSortOptionsTabView from './measuresdimensionsandtimesortoptionstabview/MeasuresDimensionsAndTimeSortOptionsTabView';
import { ActionDispatchers, controller, State } from '../controller/sortBySelectorController';
import selectorWithActionsStateNamespaces from '../../withactions/model/state/types/SelectorWithActionsStateNamespace';

export type OwnProps = { stateNamespace: SortBySelectorStateNamespace };
type Props = OwnProps & ActionDispatchers & State;
const { hidden, selectedSortBysSection, visible } = styles;

const SortBySelectorView = ({
  addSortByToSelectedChart,
  addSortByTimeToSelectedChart,
  areSelectedSortBysShown,
  changeSelectedSortByAggregationFunctionForSelectedChart,
  changeSelectedSortBySortDirectionForSelectedChart,
  changeSelectedSortByDataScopeTypeForSelectedChart,
  // flashSelectedSortBysBriefly,
  isDataPointsCountSelectorOpen,
  isFilterSelectorOpen,
  lastUsedSortDirection,
  stateNamespace,
  removeSelectedSortByFromSelectedChart,
  selectedChart,
  shownDimensions,
  shownMeasures,
  shownTimeSortOptions,
  toggleMaximizeSelector
}: Props) => {
  const handleMaximizeIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isFilterSelectorOpen,
          selectorStateNamespace: selectorWithActionsStateNamespaces[`${stateNamespace}FilterSelector`]
        },
        {
          isOpen: isDataPointsCountSelectorOpen,
          selectorStateNamespace: selectorWithActionsStateNamespaces[`${stateNamespace}DataPointsCountSelector`]
        }
      ]);
    },
    [isDataPointsCountSelectorOpen, isFilterSelectorOpen, stateNamespace, toggleMaximizeSelector]
  );

  // store previous selectedsortbys in state and compare to see if default selected sort by is changed
  // if it is changed then flash sortbys briefly

  // flashSelectedSortBysBriefly();

  const selectedSortByListItems = selectedChart
    .getSelectedSortBys()
    .map((selectedSortBy: Sort) => (
      <SelectedSortByListItemView
        key={selectedSortBy.measureOrDimension.name}
        selectedSortBy={selectedSortBy}
        chart={selectedChart}
        removeSelectedSortBy={() => removeSelectedSortByFromSelectedChart(selectedSortBy)}
        changeSelectedSortByAggregationFunction={(aggregationFunction: AggregationFunction) =>
          changeSelectedSortByAggregationFunctionForSelectedChart(selectedSortBy, aggregationFunction)
        }
        changeSelectedSortByDirection={(sortDirection: SortDirection) =>
          changeSelectedSortBySortDirectionForSelectedChart(selectedSortBy, sortDirection)
        }
        changeSelectedSortByDataScopeType={(dataScopeType: DataScopeType) =>
          changeSelectedSortByDataScopeTypeForSelectedChart(selectedSortBy, dataScopeType)
        }
      />
    ));

  const measureListItems = shownMeasures.map((measure: Measure) => (
    <MeasureListItemView
      key={measure.name}
      item={measure}
      onItemClick={() => addSortByToSelectedChart(measure, 'measure', lastUsedSortDirection)}
    />
  ));

  const dimensionListItems = shownDimensions.map((dimension: Dimension) => (
    <DimensionListItemView
      key={dimension.name}
      item={dimension}
      onItemClick={() => addSortByToSelectedChart(dimension, 'dimension', lastUsedSortDirection)}
    />
  ));

  const timeSortOptionListItems = shownTimeSortOptions.map((timeSortOption: TimeSortOption) => (
    <List.Item
      key={timeSortOption}
      onClick={() => addSortByTimeToSelectedChart(selectedChart, timeSortOption, lastUsedSortDirection)}
    >
      {timeSortOption}
    </List.Item>
  ));

  const selectorStateNamespace = `${stateNamespace}SortBySelector`;

  return (
    <SelectorWithActionsView
      id={selectorStateNamespace}
      titleText="SORT BY"
      addIconTooltipText="Add new sort definition"
      position="rightPane"
      selectedListItemsContent={
        <section className={`${selectedSortBysSection} ${areSelectedSortBysShown ? visible : hidden}`}>
          <List>{selectedSortByListItems}</List>
        </section>
      }
      listItemsContent={
        <MeasuresDimensionsAndTimeSortOptionsTabView
          measureListItems={measureListItems}
          dimensionListItems={dimensionListItems}
          timeSortOptionListItems={selectedChart.hasTimestampLegend() ? timeSortOptionListItems : undefined}
        />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace={selectorWithActionsStateNamespaces[selectorStateNamespace]}
    />
  );
};

export default connect(
  () => controller.getState,
  _.memoize(
    (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
    (...args) => args[1].stateNamespace
  )
)(SortBySelectorView);
