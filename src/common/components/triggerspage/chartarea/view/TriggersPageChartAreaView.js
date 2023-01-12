// @flow

import type { Element } from 'react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import GridLayout from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import styles from './TriggersPageChartAreaView.module.scss';
import type { AppState } from '../../../../../store/AppState';
import type { TriggersPageStateNamespace } from '../../model/state/namespace/TriggersPageStateNamespace';
import TriggersPageChartAreaControllerFactory from '../controller/TriggersPageChartAreaControllerFactory';
import Constants from '../../../../Constants';
import ChartView from '../../../chartarea/chart/view/ChartView';

type SizeAwareComponent = $Exact<{
  size: {
    width: number,
    height: number,
  },
}>;

type OwnProps = $Exact<{
  pageStateNamespace: TriggersPageStateNamespace,
}>;

const { chartArea, gridLayout } = styles;

const mapAppStateToComponentProps = (appState: AppState, { pageStateNamespace }: OwnProps) =>
  appState[pageStateNamespace].chartAreaState;

const createController = (dispatch: Dispatch, { pageStateNamespace }: OwnProps) =>
  new TriggersPageChartAreaControllerFactory(dispatch, pageStateNamespace).createController();

type MappedState = $Call<typeof mapAppStateToComponentProps, AppState, OwnProps>;
type Controller = $Call<typeof createController, Dispatch, OwnProps>;
type Props = { ...OwnProps, ...SizeAwareComponent, ...MappedState, ...Controller };

const TriggersPageChartAreaView = ({
  // eslint-disable-next-line react/prop-types
  layout,
  // eslint-disable-next-line react/prop-types
  pageStateNamespace,
  // eslint-disable-next-line react/prop-types
  size: { width: triggersAreaWidth, height: triggersAreaHeight },
  // eslint-disable-next-line react/prop-types
  startFetchDataForCharts,
  // eslint-disable-next-line react/prop-types
  charts,
}: Props): Element<any> => {
  useEffect(() => {
    startFetchDataForCharts();
  }, [startFetchDataForCharts]);

  return (
    <section className={chartArea}>
      <GridLayout
        className={gridLayout}
        isDraggable={false}
        layout={layout}
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
  monitorWidth: true,
})(connect(mapAppStateToComponentProps, createController)(TriggersPageChartAreaView));
