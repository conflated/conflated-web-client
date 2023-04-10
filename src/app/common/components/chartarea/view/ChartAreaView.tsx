/* eslint-disable jsx-a11y/no-noninteractive-tabindex,@typescript-eslint/no-explicit-any */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import GridLayout, { Layout } from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import styles from './ChartAreaView.module.scss';
import type { ChartAreaStateNamespace } from '../model/state/types/ChartAreaStateNamespace';
import Constants from '../../../Constants';
import ChartView from '../chart/view/ChartView';
import { ActionDispatchers, controller, State } from '../controller/chartAreaController';
import scrollingLayout from '../../../../page/dataexplorer/pane/left/selector/layout/model/state/layouts/scrollingLayout';
import Utils from '../../../utils/Utils';

type SizeAwareComponent = {
  size: {
    width: number;
    height: number;
  };
};

export type OwnProps = SizeAwareComponent & {
  stateNamespace: ChartAreaStateNamespace;
  className?: string;
};

type Props = OwnProps & State & ActionDispatchers;

// eslint-disable-next-line react/prefer-stateless-function
class ChartAreaView extends React.Component<Props, Record<string, any>> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    className: undefined
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  override componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  override componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.shiftKey && event.key === 'Tab') {
      const { charts, selectChart, selectedChart } = this.props;
      const selectedChartIndex = charts.indexOf(selectedChart);

      if (selectedChartIndex > 0) {
        selectChart(charts[selectedChartIndex - 1]);
      } else {
        selectChart(charts[charts.length - 1]);
      }

      event.preventDefault();
      event.stopPropagation();
    } else if (event.key === 'Tab') {
      const { charts, selectChart, selectedChart } = this.props;
      const selectedChartIndex = charts.indexOf(selectedChart);

      if (selectedChartIndex === -1 || selectedChartIndex < charts.length - 1) {
        selectChart(charts[selectedChartIndex + 1]);
      } else {
        selectChart(charts[0]);
      }

      event.preventDefault();
      event.stopPropagation();
    } else if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
      const { copyChart, selectedChart } = this.props;
      copyChart(selectedChart);
    } else if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      const { pasteChart, selectedChart } = this.props;
      pasteChart(selectedChart);
    } else if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
      const { clearChart, copyChart, selectedChart } = this.props;
      copyChart(selectedChart);
      clearChart(selectedChart);
    }
  };

  showChartSizes = () => {
    const { charts, layout } = this.props;
    const newState = charts.reduce((gridItems, chart) => {
      const gridItem = Utils.findElem(layout, 'i', chart.id);

      return {
        ...gridItems,
        [chart.id]: {
          heightInRows: gridItem?.h,
          widthInCols: gridItem?.w
        }
      };
    }, {});

    this.setState(newState);
  };

  updateChartSize = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
    this.setState({
      [newItem.i]: {
        heightInRows: newItem.h,
        widthInCols: newItem.w
      }
    });
  };

  hideChartSizes = () => {
    this.setState((currentState) =>
      Object.keys(currentState).reduce((newState, key) => ({ ...newState, [key]: undefined }), {})
    );
  };

  override render() {
    const {
      charts,
      className,
      dropChart,
      isLayoutLocked,
      layout,
      maximizedChart,
      stateNamespace,
      selectedChart,
      size: { width: chartAreaWidth, height: chartAreaHeight }
    }: Props = this.props;

    const isMaxWidth1024px = window.matchMedia && window.matchMedia('screen and (max-width: 1024px)').matches;
    const isPortrait = window.matchMedia && window.matchMedia('screen and (orientation: portrait)').matches;

    const chartElements = charts
      .filter((chart) => Utils.findElem(layout, 'i', chart.id))
      .map((chart) => {
        let chartHeight;

        if (isMaxWidth1024px) {
          const headerHeight = 6 * parseFloat(getComputedStyle(document.documentElement).fontSize);
          if (isPortrait) {
            chartHeight = (document.body.clientHeight - headerHeight) / 2;
          } else {
            chartHeight = document.body.clientHeight - headerHeight;
          }
        } else {
          chartHeight = chart.getHeight(layout, chartAreaHeight);
        }

        const chartWidth = isMaxWidth1024px ? document.body.clientWidth : chart.getWidth(layout, chartAreaWidth);
        // eslint-disable-next-line react/destructuring-assignment
        const gridItem = this.state[chart.id];

        return (
          <div key={chart.id} style={{ height: `${chartHeight}px`, width: `${chartWidth}px` }}>
            <ChartView
              chart={chart}
              isMaximized={maximizedChart === chart}
              isSelectedChart={chart === selectedChart}
              height={chartHeight}
              heightInRows={gridItem?.heightInRows}
              width={chartWidth}
              widthInCols={gridItem?.widthInCols}
              stateNamespace={stateNamespace}
            />
          </div>
        );
      });

    return (
      <section
        className={`${styles.chartArea} ${className || ''} ${layout === scrollingLayout ? styles.scrollable : ''}`}
        tabIndex={0}
      >
        {isMaxWidth1024px ? (
          chartElements
        ) : (
          <GridLayout
            className={styles.gridLayout}
            cols={Constants.GRID_COLUMN_COUNT}
            containerPadding={[0, 0]}
            isDraggable={stateNamespace === 'dataExplorerPage' && !isLayoutLocked}
            isDroppable={stateNamespace === 'dataExplorerPage' && !isLayoutLocked}
            isResizable={stateNamespace === 'dataExplorerPage' && !isLayoutLocked}
            layout={layout as any}
            margin={[0, 0]}
            onDrop={(newLayout, _2, event) => dropChart(newLayout, (event as any).dataTransfer.getData('chartType'))}
            onDropDragOver={() => ({ h: 3, w: 3 })}
            onResizeStart={this.showChartSizes}
            onResize={this.updateChartSize}
            onResizeStop={this.hideChartSizes}
            rowHeight={chartAreaHeight / Constants.GRID_ROW_COUNT}
            compactType={layout === scrollingLayout ? 'vertical' : undefined}
            width={chartAreaWidth}
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
    _.memoize(
      (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
      (...args) => args[1].stateNamespace
    )
  )(ChartAreaView)
);
