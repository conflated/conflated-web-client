import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import styles from './SortSelectorView.module.scss';
import SortListItemView from './listitem/SortListItemView';
import type { Measure } from '../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Sort } from '../../../chartarea/chart/model/state/sorts/sort/Sort';
import SelectorWithActionsView from '../../withtitleactions/view/SelectorWithTitleActionsView';
import MeasureListItemView from '../../../../views/list/item/MeasureListItemView';
import DimensionListItemView from '../../../../views/list/item/DimensionListItemView';
import type { SortSelectorStateNamespace } from '../model/state/types/SortSelectorStateNamespace';
import type { AggregationFunction } from '../../../chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { SortDirection } from '../../../chartarea/chart/model/state/sorts/sort/types/SortDirection';
import type { DataScope } from '../../../chartarea/chart/model/state/types/DataScope';
import { ActionDispatchers, controller, State } from '../controller/sortSelectorController';
import selectorWithActionsStateNamespaces from '../../withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';
import MeasuresAndDimensionsTabView from '../../../../views/tab/selector/measuresanddimensions/MeasuresAndDimensionsTabView';

export type OwnProps = { stateNamespace: SortSelectorStateNamespace };
type Props = OwnProps & ActionDispatchers & State;
const { hidden, selectedSortBysSection, visible } = styles;

const SortSelectorView = ({
  addSortToSelectedChart,
  sortsAreShown,
  changeSelectedSortByAggregationFunctionForSelectedChart,
  changeSortDirectionForSelectedChart,
  changeSortDataScopeTypeForSelectedChart,
  flashSortsBriefly,
  isDataPointsCountSelectorOpen,
  isFilterSelectorOpen,
  lastUsedSortDirection,
  stateNamespace,
  removeSortFromSelectedChart,
  selectedChart,
  shownDimensions,
  shownMeasures,
  toggleMaximizeSelector
}: Props) => {
  const [previousSorts, setPreviousSorts] = useState([] as Sort[]);

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

  if (previousSorts !== selectedChart.getSorts()) {
    flashSortsBriefly();
    setPreviousSorts(selectedChart.getSorts());
  }

  const SortListItems = selectedChart
    .getSorts()
    .map((selectedSortBy: Sort) => (
      <SortListItemView
        key={selectedSortBy.measureOrDimension.name}
        selectedSortBy={selectedSortBy}
        chart={selectedChart}
        removeSelectedSortBy={() => removeSortFromSelectedChart(selectedSortBy)}
        changeSelectedSortByAggregationFunction={(aggregationFunction: AggregationFunction) =>
          changeSelectedSortByAggregationFunctionForSelectedChart(selectedSortBy, aggregationFunction)
        }
        changeSelectedSortByDirection={(sortDirection: SortDirection) =>
          changeSortDirectionForSelectedChart(selectedSortBy, sortDirection)
        }
        changeSelectedSortByDataScopeType={(dataScopeType: DataScope) =>
          changeSortDataScopeTypeForSelectedChart(selectedSortBy, dataScopeType)
        }
      />
    ));

  const actions = [
    {
      iconName: 'server',
      perform: () => {},
      tooltipText: 'Add server-side filter'
    },
    {
      iconName: 'desktop',
      perform: () => {},
      tooltipText: 'Add client-side filter'
    }
  ];

  const measureListItems = shownMeasures.map((measure: Measure) => (
    <MeasureListItemView
      key={measure.name}
      item={measure}
      onItemClick={() => addSortToSelectedChart(measure, 'measure', lastUsedSortDirection)}
      actions={actions}
    />
  ));

  const dimensionListItems = shownDimensions.map((dimension: Dimension) => (
    <DimensionListItemView
      key={dimension.name}
      item={dimension}
      onItemClick={() => addSortToSelectedChart(dimension, 'dimension', lastUsedSortDirection)}
      actions={actions}
    />
  ));

  const selectorStateNamespace = `${stateNamespace}SortBySelector`;

  return (
    <SelectorWithActionsView
      id={selectorStateNamespace}
      titleText="SORT BY"
      addIconTooltipText="Add new sort definition"
      position="rightPane"
      selectedListItemsContent={
        <section className={`${selectedSortBysSection} ${sortsAreShown ? visible : hidden}`}>
          <List>{SortListItems}</List>
        </section>
      }
      listItemsContent={
        <MeasuresAndDimensionsTabView measureListItems={measureListItems} dimensionListItems={dimensionListItems} />
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
)(SortSelectorView);
