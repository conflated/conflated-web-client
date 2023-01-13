import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import { List } from 'semantic-ui-react';
import styles from './FilterSelectorView.module.scss';
import MeasureSelectedFilterView from './selectedfilter/measureselectedfilter/MeasureSelectedFilterView';
import DimensionSelectedFilterView from './selectedfilter/dimensionselectedfilter/DimensionSelectedFilterView';
import type { AppState } from '../../../../../store/AppState';
import selectShownDimensions from '../../../model/state/selectors/createShownDimensionsSelector';
import selectShownMeasures from '../../../model/state/selectors/selectShownMeasures';
import FilterSelectorControllerFactory from '../controller/FilterSelectorControllerFactory';
import SelectorWithDefaultActionsView from '../../selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import MeasureListItemView from '../../../view/measurelistitem/MeasureListItemView';
import DimensionListItemView from '../../../view/dimensionlistitem/DimensionListItemView';
import type { Dimension } from '../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/entities/Dimension';
import type { Measure } from '../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import type { FilterSelectorPageStateNamespace } from '../model/state/namespace/FilterSelectorPageStateNamespace';
import selectorWithDefaultActionsStateNamespaces from '../../selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import selectorStateNamespaces from '../../selector/model/state/namespace/SelectorStateNamespace';
import type { AggregationFunction } from '../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { FilterInputType } from '../../chartarea/chart/model/state/selectedfilters/selectedfilter/types/FilterInputType';
import type { DataScopeType } from '../../../model/state/types/DataScopeType';
import MeasuresAndDimensionsTabView from '../../../view/measuresanddimensionstabview/MeasuresAndDimensionsTabView';
import type { SelectedFilter } from '../../chartarea/chart/model/state/selectedfilters/selectedfilter/SelectedFilter';
import SelectorWithDefaultActionsControllerFactory from '../../selectorwithdefaultactions/controller/SelectorWithDefaultActionsControllerFactory';

type OwnProps = { pageStateNamespace: FilterSelectorPageStateNamespace };

const mapAppStateToComponentProps = (appState: AppState, { pageStateNamespace }: OwnProps) => ({
  selectedChart: appState[pageStateNamespace].chartAreaState.selectedChart,
  shownDimensions: selectShownDimensions(false)(appState),
  shownMeasures: selectShownMeasures(appState),

  shouldShowPageRightPanePermanently:
    appState.common.pageStates[pageStateNamespace].shouldShowPagePanePermanently.rightPane,

  isSortBySelectorOpen:
    appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}SortBySelector`]].isSelectorOpen,

  isDataPointsCountSelectorOpen:
    appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}DataPointsCountSelector`]]
      .isSelectorOpen
});

const createController = (dispatch: Dispatch, { pageStateNamespace }: OwnProps) => ({
  toggleMaximizeSelector: new SelectorWithDefaultActionsControllerFactory(
    dispatch,
    selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}FilterSelector`]
  ).createController().toggleMaximizeSelector,

  ...new FilterSelectorControllerFactory(dispatch, pageStateNamespace).createController()
});

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = OwnProps & MappedState & Controller;

function FilterSelectorView({
  addDimensionFilterToSelectedChart,
  addMeasureFilterToSelectedChart,
  changeSelectedFilterAggregationFunctionForSelectedChart,
  changeSelectedFilterExpressionForSelectedChart,
  changeSelectedFilterInputTypeForSelectedChart,
  changeSelectedFilterDataScopeTypeForSelectedChart,
  isDataPointsCountSelectorOpen,
  isSortBySelectorOpen,
  pageStateNamespace,
  removeSelectedFilterFromSelectedChart,
  selectedChart,
  shouldShowPageRightPanePermanently,
  shownDimensions,
  shownMeasures,
  toggleShouldShowPageRightPanePermanently,
  toggleMaximizeSelector
}: Props) {
  const handleMaximizeIconClick = (event: React.SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();

    toggleMaximizeSelector([
      {
        isOpen: isSortBySelectorOpen,
        stateNamespace: selectorStateNamespaces[`${pageStateNamespace}SortBySelector`]
      },
      {
        isOpen: isDataPointsCountSelectorOpen,
        stateNamespace: selectorStateNamespaces[`${pageStateNamespace}DataPointsCountSelector`]
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

  const selectorStateNamespace = `${pageStateNamespace}FilterSelector`;

  return (
    <SelectorWithDefaultActionsView
      id={selectorStateNamespace}
      titleText="FILTER"
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
      selectorStateNamespace={selectorWithDefaultActionsStateNamespaces[selectorStateNamespace]}
    />
  );
}

export default connect(mapAppStateToComponentProps, createController)(FilterSelectorView);
