import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import styles from './SortBySelectorView.module.scss';
import SelectedSortByListItemView from './selectedsortbylistitem/SelectedSortByListItemView';
import type { AppState } from '../../../../../store/AppState';
import type { Measure } from '../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import type { Dimension } from '../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/entities/Dimension';
import type { SelectedSortBy } from '../../chartarea/chart/model/state/selectedsortbys/selectedsortby/SelectedSortBy';
import SelectorWithDefaultActionsView from '../../selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import MeasureListItemView from '../../../view/measurelistitem/MeasureListItemView';
import DimensionListItemView from '../../../view/dimensionlistitem/DimensionListItemView';
import type { TimeSortOption } from '../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/TimeSortOption';
import type { SortBySelectorPageStateNamespace } from '../model/state/types/SortBySelectorPageStateNamespace';
import type { AggregationFunction } from '../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { SortDirection } from '../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/SortDirection';
import type { DataScopeType } from '../../../model/state/types/DataScopeType';
import MeasuresDimensionsAndTimeSortOptionsTabView from './measuresdimensionsandtimesortoptionstabview/MeasuresDimensionsAndTimeSortOptionsTabView';
import { ActionDispatchers, controller, State } from '../sortBySelectorController';
import selectorWithDefaultActionsStateNamespaces from '../../selectorwithdefaultactions/model/state/types/SelectorWithDefaultActionsStateNamespace';

type OwnProps = { pageStateNamespace: SortBySelectorPageStateNamespace };
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
  pageStateNamespace,
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
          stateNamespace: selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}FilterSelector`]
        },
        {
          isOpen: isDataPointsCountSelectorOpen,
          stateNamespace: selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}DataPointsCountSelector`]
        }
      ]);
    },
    [isDataPointsCountSelectorOpen, isFilterSelectorOpen, pageStateNamespace, toggleMaximizeSelector]
  );

  // store previous selectedsortbys in state and compare to see if default selected sort by is changed
  // if it is changed then flash sortbys briefly

  // flashSelectedSortBysBriefly();

  const selectedSortByListItems = selectedChart
    .getSelectedSortBys()
    .map((selectedSortBy: SelectedSortBy) => (
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

  const selectorStateNamespace = `${pageStateNamespace}SortBySelector`;

  return (
    <SelectorWithDefaultActionsView
      id={selectorStateNamespace}
      titleText="SORT BY"
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
      selectorStateNamespace={selectorWithDefaultActionsStateNamespaces[selectorStateNamespace]}
    />
  );
};

export default connect(
  (appState: AppState, { pageStateNamespace }: OwnProps) => controller.getState(appState, pageStateNamespace),
  (_, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace)
)(SortBySelectorView);
