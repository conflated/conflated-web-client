import _ from 'lodash';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import qs from 'qs';
import type { ChartAreaStateNamespace } from '../../model/state/types/ChartAreaStateNamespace';
import styles from './ChartView.module.scss';
import type { Chart } from '../model/state/Chart';
import ChartMenuView from '../menu/view/ChartMenuView';
import ChartConfigHintsView from './confighints/ChartConfigHintsView';
import ChartScrollbarView from '../scrollbar/view/ChartScrollbarView';
import DrillUpIconView from '../drillupicon/view/DrillUpIconView';
import ChartController from '../controller/chartController';
import store from '../../../../../../store/store';
import stopEventPropagation from '../../../../utils/stopEventPropagation';

type OwnProps = {
  chart: Chart;
  height: number;
  heightInRows?: number;
  isMaximized?: boolean;
  isSelectedChart: boolean;
  isSizingChart?: boolean;
  stateNamespace: ChartAreaStateNamespace;
  width: number;
  widthInCols?: number;
};

const controller = new ChartController(store.dispatch);
type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
type Props = OwnProps & ActionDispatchers;

const ChartView: React.FC<Props> = ({
  chart,
  changeFilterExpressionForChartFilters,
  changeQuickFilter,
  changeXAxisScrollPosition,
  drillDown,
  height,
  heightInRows,
  isMaximized,
  isSelectedChart,
  isSizingChart,
  maximizeSize,
  restoreChartOriginalSize,
  select,
  stateNamespace,
  width,
  widthInCols
}: Props) => {
  const [touchStartX, setTouchStartX] = useState(-1);
  const [quickFilterIsShown, setQuickFilterIsShown] = useState(false);
  const [lastClickTimestampInMillis, setLastClickTimestampInMillis] = useState(0);

  const className = classNames(styles.chart, {
    [styles.selectedChart]: isSelectedChart,
    [styles.scrollable]: chart.isXAxisScrollable(),
    [styles.verizon]: qs.parse(document.location.href.split('?')[1]).verizon
  });

  const chartView = chart.createView(width, height, stateNamespace, {
    changeFilterExpressionForChartFilters,
    drillDownChart: drillDown
  });

  function onTouchStart(event: React.TouchEvent) {
    setTouchStartX(event.changedTouches[0].screenX);
  }

  function onTouchEnd(event: React.TouchEvent) {
    const touchEndX = event.changedTouches[0].screenX;

    if (touchEndX < touchStartX) {
      const newScrollPosition = (chart.xAxisScrollPosition ?? 0) + chart.xAxisCategoriesShownCount;
      const maxScrollPosition = chart.getMaxScrollPosition();
      changeXAxisScrollPosition(chart, newScrollPosition <= maxScrollPosition ? newScrollPosition : maxScrollPosition);
    } else if (touchEndX > touchStartX) {
      const newScrollPosition = (chart.xAxisScrollPosition ?? 0) - chart.xAxisCategoriesShownCount;
      changeXAxisScrollPosition(chart, newScrollPosition >= 0 ? newScrollPosition : 0);
    }
  }

  function handleClickEvent() {
    const now = Date.now();

    if (now - lastClickTimestampInMillis > 250) {
      select(chart);
    } else if (isMaximized) {
      restoreChartOriginalSize();
    } else {
      maximizeSize(chart);
    }

    setLastClickTimestampInMillis(now);
  }

  return (
    <div
      className={`${className} ${chart.type === 'statistic' ? styles.statistic : ''}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={handleClickEvent}
    >
      {chartView}
      {quickFilterIsShown && (
        <div className={styles.search}>
          <div className={styles.searchInputLabel}>Filter: </div>
          <Popup
            content="To filter measure(s), enter e.g. >50, <=90, =50, =50-90. To filter dimension, enter e.g. 1000, 1000-5000. You can use * or % wild characters"
            inverted
            mouseEnterDelay={1250}
            trigger={
              <Input
                className={styles.searchInput}
                placeholder="Measure and/or dimension values..."
                onChange={({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) =>
                  changeQuickFilter(chart, value)
                }
              />
            }
          />
        </div>
      )}
      {chart.type !== 'map' && chart.type !== 'stepline' && (
        <Popup
          inverted
          mouseEnterDelay={1000}
          trigger={
            <Icon
              className={styles.searchIcon}
              inverted
              name="filter"
              onClick={_.flow(
                stopEventPropagation,
                () => changeQuickFilter(chart, ''),
                () => setQuickFilterIsShown(!quickFilterIsShown)
              )}
            />
          }
          content={quickFilterIsShown ? 'Clear and hide quick filter' : 'Show quick filter'}
        />
      )}
      <Popup
        inverted
        mouseEnterDelay={1000}
        trigger={
          <Icon
            className={`${styles.windowIcon} ${isMaximized ? styles.maximized : ''}`}
            inverted
            name="window maximize outline"
            onClick={_.flow(
              stopEventPropagation,
              isMaximized ? () => restoreChartOriginalSize() : () => maximizeSize(chart)
            )}
          />
        }
        content={isMaximized ? "Restore chart's original size" : 'Maximize chart size'}
      />
      <ChartMenuView chart={chart} className={styles.menu} stateNamespace={stateNamespace} />
      <ChartScrollbarView
        allowKeyControls={isSelectedChart}
        chart={chart}
        className={`${styles.scrollbar} ${isSelectedChart ? styles.selected : ''}`}
        orientation={chart.type === 'bar' ? 'vertical' : 'horizontal'}
        stateNamespace={stateNamespace}
      />
      <DrillUpIconView chart={chart} stateNamespace={stateNamespace} />
      {stateNamespace === 'dataExplorerPage' && (
        <ChartConfigHintsView
          chart={chart}
          heightInRows={heightInRows}
          isSizingChart={isSizingChart}
          widthInCols={widthInCols}
        />
      )}
    </div>
  );
};

ChartView.defaultProps = {
  heightInRows: undefined,
  isMaximized: false,
  isSizingChart: false,
  widthInCols: undefined
};

export default connect(
  null,
  _.memoize(
    (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
    (...args) => args[1].stateNamespace
  )
)(ChartView);
