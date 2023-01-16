import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import GridLayout from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import styles from './TriggersPageChartAreaView.module.scss';
import type { AppState } from '../../../../../../store/AppState';
import type { TriggersPageStateNamespace } from '../../model/state/namespace/TriggersPageStateNamespace';
import Constants from '../../../../Constants';
import ChartView from '../../../chartarea/chart/view/ChartView';
import { ActionDispatchers, controller, State } from '../triggersPageChartAreaController';

type SizeAwareComponent = {
  size: {
    width: number;
    height: number;
  };
};

type OwnProps = {
  pageStateNamespace: TriggersPageStateNamespace;
};

type Props = OwnProps & SizeAwareComponent & ActionDispatchers & State;
const { chartArea, gridLayout } = styles;

const TriggersPageChartAreaView = ({
  layout,
  pageStateNamespace,
  size: { width: triggersAreaWidth, height: triggersAreaHeight },
  startFetchDataForCharts,
  charts
}: Props) => {
  useEffect(() => {
    startFetchDataForCharts();
  }, [startFetchDataForCharts]);

  return (
    <section className={chartArea}>
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
            pageStateNamespace
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
    </section>
  );
};

export default sizeMe({
  monitorHeight: true,
  monitorWidth: true
})(
  connect(
    (appState: AppState, { pageStateNamespace }: OwnProps) => controller.getState(appState, pageStateNamespace),
    () => controller.getActionDispatchers()
  )(TriggersPageChartAreaView)
);
