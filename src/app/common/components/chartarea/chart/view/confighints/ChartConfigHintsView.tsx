import React from 'react';
import styles from './ChartConfigHintsView.module.scss';
import type { Chart } from '../../model/state/Chart';

type Props = {
  chart: Chart;
};

const ChartConfigHintsView = ({ chart }: Props) => {
  const chartConfigHintTitle = chart.getChartConfigHintTitle();
  const chartConfigHintSubtitle = chart.getChartConfigHintSubtitle();

  if (chartConfigHintTitle) {
    return (
      <div className={styles.uiHintsContainer}>
        <div className={styles.uiHints}>{chartConfigHintTitle}</div>
        {chartConfigHintSubtitle ? <div className={styles.smallText}>{chartConfigHintSubtitle}</div> : undefined}
      </div>
    );
  }

  return null;
};

export default ChartConfigHintsView;
