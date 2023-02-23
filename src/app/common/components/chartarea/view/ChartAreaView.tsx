/* eslint-disable jsx-a11y/no-noninteractive-tabindex,@typescript-eslint/no-explicit-any */

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import GridLayout from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import styles from './ChartAreaView.module.scss';
import type { ChartAreaPageStateNamespace } from '../model/state/types/ChartAreaPageStateNamespace';
import Constants from '../../../Constants';
import type { Chart } from '../chart/model/state/Chart';
import ChartView from '../chart/view/ChartView';
import { ActionDispatchers, controller, State } from '../controller/chartAreaController';

type SizeAwareComponent = {
  size: {
    width: number;
    height: number;
  };
};

export type OwnProps = SizeAwareComponent & {
  pageStateNamespace: ChartAreaPageStateNamespace;
  className?: string;
};

type Props = OwnProps & State & ActionDispatchers;

// eslint-disable-next-line react/prefer-stateless-function
class ChartAreaView extends React.Component<Props> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    className: undefined
  };

  render() {
    const {
      charts,
      className,
      isLayoutLocked,
      layout,
      pageStateNamespace,
      selectedChart,
      size: { width: chartAreaWidth, height: chartAreaHeight }
    }: Props = this.props;

    const isMaxWidth1024px = window.matchMedia && window.matchMedia('screen and (max-width: 1024px)').matches;
    const isPortrait = window.matchMedia && window.matchMedia('screen and (orientation: portrait)').matches;

    const chartElements = charts.map((chart: Chart) => {
      let chartHeight;

      if (isMaxWidth1024px) {
        const headerHeight = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        if (isPortrait) {
          chartHeight = (document.body.clientHeight - headerHeight) / 2;
        } else {
          chartHeight = document.body.clientHeight - headerHeight;
        }
      } else {
        chartHeight = chart.getHeight(layout, chartAreaHeight);
      }

      const chartWidth = isMaxWidth1024px ? document.body.clientWidth : chart.getWidth(layout, chartAreaWidth);

      return (
        <div key={chart.id} style={{ height: `${chartHeight}px`, width: `${chartWidth}px` }}>
          <ChartView
            chart={chart}
            isSelectedChart={chart === selectedChart}
            height={chartHeight}
            width={chartWidth}
            pageStateNamespace={pageStateNamespace}
          />
        </div>
      );
    });

    return (
      <section className={`${styles.chartArea} ${className || ''}`} tabIndex={0}>
        {isMaxWidth1024px ? (
          chartElements
        ) : (
          <GridLayout
            className={styles.gridLayout}
            layout={layout as any}
            verticalCompact
            cols={Constants.GRID_COLUMN_COUNT}
            margin={[0, 0]}
            containerPadding={[0, 0]}
            rowHeight={chartAreaHeight / Constants.GRID_ROW_COUNT}
            width={chartAreaWidth}
            isDraggable={pageStateNamespace === 'dataExplorerPage' && !isLayoutLocked}
            isResizable={pageStateNamespace === 'dataExplorerPage' && !isLayoutLocked}
          >
            {chartElements}
          </GridLayout>
        )}
      </section>
    );
  }
}

export default sizeMe({ monitorHeight: true, monitorWidth: true })(
  connect(
    controller.getState,
    _.memoize((__, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace))
  )(ChartAreaView)
);
