import _ from 'lodash';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Popup } from 'semantic-ui-react';
import classNames from 'classnames';
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
  stateNamespace: ChartAreaStateNamespace;
  width: number;
  widthInCols?: number;
};

const controller = new ChartController(store.dispatch);
type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;

type Props = OwnProps & ActionDispatchers;

const ChartView: React.FC<Props> = ({
  chart,
  changeXAxisScrollPosition,
  height,
  heightInRows,
  isMaximized,
  isSelectedChart,
  maximizeChartSize,
  restoreChartOriginalSize,
  selectChart,
  stateNamespace,
  width,
  widthInCols
}: Props) => {
  const [touchStartX, setTouchStartX] = useState(-1);
  const [quickFilterIsShown, setQuickFilterIsShown] = useState(false);

  const className = classNames(styles.chart, {
    [styles.selectedChart]: isSelectedChart,
    [styles.scrollable]: chart.isXAxisScrollable()
  });

  const chartView = chart.createChartView(width, height, stateNamespace, { selectChart });

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

  return (
    <div
      className={className}
      draggable
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={() => selectChart(chart)}
      onDoubleClick={() => maximizeChartSize(chart)}
    >
      {chartView}
      {quickFilterIsShown && (
        <div className={styles.search}>
          <div className={styles.searchInputLabel}>Filter: </div>
          <Input className={styles.searchInput} placeholder="Measure and/or dimension values..." />
        </div>
      )}
      {chart.chartType !== 'map' && (
        <Popup
          inverted
          mouseEnterDelay={1000}
          trigger={
            <Icon
              className={styles.searchIcon}
              inverted
              name="filter"
              onClick={_.flow(stopEventPropagation, () => setQuickFilterIsShown(!quickFilterIsShown))}
            />
          }
          content={quickFilterIsShown ? 'Hide quick filter' : 'Show quick filter'}
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
              isMaximized ? () => restoreChartOriginalSize() : () => maximizeChartSize(chart)
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
        orientation={chart.chartType === 'bar' ? 'vertical' : 'horizontal'}
        stateNamespace={stateNamespace}
      />
      <DrillUpIconView chart={chart} stateNamespace={stateNamespace} />
      <ChartConfigHintsView chart={chart} heightInRows={heightInRows} widthInCols={widthInCols} />
    </div>
  );
};

ChartView.defaultProps = {
  heightInRows: undefined,
  isMaximized: false,
  widthInCols: undefined
};

export default connect(
  null,
  _.memoize(
    (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
    (...args) => args[1].stateNamespace
  )
)(ChartView);
