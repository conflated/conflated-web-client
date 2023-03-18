/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import GridLayout from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import styles from './TriggersPageChartAreaView.module.scss';
import type { TriggersPageStateNamespace } from '../../model/state/TriggersPageStateNamespace';
import Constants from '../../../../Constants';
import ChartView from '../../../chartarea/chart/view/ChartView';
import { ActionDispatchers, controller, State } from '../controller/triggersPageChartAreaController';

type SizeAwareComponent = {
  size: {
    width: number;
    height: number;
  };
};

export type OwnProps = {
  pageStateNamespace: TriggersPageStateNamespace;
};

type Props = SizeAwareComponent & OwnProps & State & ActionDispatchers;
const { chartArea, gridLayout } = styles;

const TriggersPageChartAreaView = ({
  layout,
  pageStateNamespace,
  size: { width: triggersAreaWidth, height: triggersAreaHeight },
  openTriggerDetailsDialog,
  startFetchDataForCharts,
  charts
}: Props) => {
  useEffect(() => {
    startFetchDataForCharts();
  }, [startFetchDataForCharts]);

  const isMaxWidth1024px = window.matchMedia && window.matchMedia('screen and (max-width: 1024px)').matches;
  const headerHeight = 2.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const chartHeight = document.body.clientHeight - headerHeight;
  const chartWidth = document.body.clientWidth;

  const firstChart = (
    <div key="1">
      {charts[0].createChartView(chartWidth, chartHeight, pageStateNamespace, {
        handleRowDoubleClick: openTriggerDetailsDialog
      })}
    </div>
  );

  let secondChartHeight = chartHeight / 2;
  const isPortrait = window.matchMedia && window.matchMedia('screen and (orientation: portrait)').matches;

  if (isPortrait) {
    secondChartHeight = chartHeight / 3;
  }

  const secondChart = (
    <div key="2" style={{ height: `${secondChartHeight}px`, width: `${chartWidth}px` }}>
      <ChartView
        chart={charts[1]}
        isSelectedChart={false}
        width={chartWidth}
        pageStateNamespace={pageStateNamespace}
        height={secondChartHeight}
      />
    </div>
  );

  return (
    <section className={chartArea}>
      {isMaxWidth1024px ? (
        <>
          {firstChart}
          {secondChart}
        </>
      ) : (
        <GridLayout
          className={gridLayout}
          isDraggable={false}
          layout={layout as any}
          verticalCompact
          cols={Constants.GRID_COLUMN_COUNT}
          margin={[0, 0]}
          containerPadding={[0, 0]}
          rowHeight={triggersAreaHeight / Constants.GRID_ROW_COUNT}
          width={triggersAreaWidth}
        >
          <div key="1">
            {charts[0].createChartView(
              triggersAreaWidth,
              (layout[0].h / Constants.GRID_ROW_COUNT) * triggersAreaHeight,
              pageStateNamespace,
              {}
            )}
          </div>
          <div key="2">
            <ChartView
              chart={charts[1]}
              isSelectedChart={false}
              width={triggersAreaWidth}
              pageStateNamespace={pageStateNamespace}
              height={(layout[1].h / Constants.GRID_ROW_COUNT) * triggersAreaHeight}
            />
          </div>
        </GridLayout>
      )}
    </section>
  );
};

export default sizeMe({
  monitorHeight: true,
  monitorWidth: true
})(
  connect(
    controller.getState,
    _.memoize((__, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace))
  )(TriggersPageChartAreaView)
);
