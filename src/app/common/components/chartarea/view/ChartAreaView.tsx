/* eslint-disable jsx-a11y/no-noninteractive-tabindex,@typescript-eslint/no-explicit-any */

import React from 'react';
import { connect } from 'react-redux';
import GridLayout from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import styles from './ChartAreaView.module.scss';
import type { AppState } from '../../../../../store/AppState';
import type { ChartAreaPageStateNamespace } from '../model/state/types/ChartAreaPageStateNamespace';
import Constants from '../../../Constants';
import type { Chart } from '../chart/model/state/Chart';
import ChartView from '../chart/view/ChartView';
import { ActionDispatchers, controller, State } from '../chartAreaController';

type SizeAwareComponent = {
  size: {
    width: number;
    height: number;
  };
};

type OwnProps = SizeAwareComponent & {
  pageStateNamespace: ChartAreaPageStateNamespace;
  className?: string;
};

type Props = OwnProps & State & ActionDispatchers;

// eslint-disable-next-line react/prefer-stateless-function
class ChartAreaView extends React.Component<Props> {
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

    const chartElements = charts.map((chart: Chart) => (
      <div key={chart.id}>
        <ChartView
          chart={chart}
          isSelectedChart={chart === selectedChart}
          height={chart.getHeight(layout, chartAreaHeight)}
          width={chart.getWidth(layout, chartAreaWidth)}
          pageStateNamespace={pageStateNamespace}
        />
      </div>
    ));

    return (
      <section className={`${styles.chartArea} ${className || ''}`} tabIndex={0}>
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
      </section>
    );
  }
}

export default sizeMe({ monitorHeight: true, monitorWidth: true })(
  connect(
    (appState: AppState, { pageStateNamespace }: OwnProps) => controller.getState(appState, pageStateNamespace),
    (_, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace)
  )(ChartAreaView)
);
