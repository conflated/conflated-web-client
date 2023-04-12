import React from 'react';
import styles from './ChartConfigHintsView.module.scss';
import type { Chart } from '../../model/state/Chart';

type Props = {
  chart: Chart;
  heightInRows?: number;
  widthInCols?: number;
};

const ChartConfigHintsView: React.FC<Props> = ({ chart, heightInRows, widthInCols }: Props) => {
  const chartConfigHintTitle = chart.getChartConfigHintTitle();
  const chartConfigHintSubtitle = chart.getChartConfigHintSubtitle();

  if (chartConfigHintTitle) {
    return (
      <>
        <div className={styles.uiHintsContainer}>
          {heightInRows && widthInCols && (
            <div className={styles.chartSize}>
              {widthInCols}
              <span className={styles.timesChar}>x</span>
              {heightInRows}
            </div>
          )}
          {(heightInRows === undefined || heightInRows >= 2) && (
            <>
              <div className={styles.uiHints}>{chartConfigHintTitle}</div>
              {chartConfigHintSubtitle ? <div className={styles.smallText}>{chartConfigHintSubtitle}</div> : undefined}
            </>
          )}
        </div>
        <div className={styles.chartId}>{`${chart.id}.`}</div>
      </>
    );
  }

  return null;
};

ChartConfigHintsView.defaultProps = {
  heightInRows: undefined,
  widthInCols: undefined
};

export default ChartConfigHintsView;
