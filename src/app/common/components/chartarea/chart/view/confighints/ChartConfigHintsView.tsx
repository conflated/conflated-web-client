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
      <div className={styles.uiHintsContainer}>
        <div className={styles.chartSize}>
          <span className={styles.widthOrHeight}>w:</span>
          {widthInCols} <span className={styles.timesChar}>x</span> <span className={styles.widthOrHeight}>h:</span>
          {heightInRows}
        </div>

        {heightInRows && heightInRows >= 2 && (
          <>
            <div className={styles.uiHints}>{chartConfigHintTitle}</div>
            {chartConfigHintSubtitle ? <div className={styles.smallText}>{chartConfigHintSubtitle}</div> : undefined}
          </>
        )}
      </div>
    );
  }

  return null;
};

ChartConfigHintsView.defaultProps = {
  heightInRows: undefined,
  widthInCols: undefined
};

export default ChartConfigHintsView;
