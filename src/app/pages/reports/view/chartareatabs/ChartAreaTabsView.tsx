import React from 'react';
import { Tab } from 'semantic-ui-react';
import ChartAreaView from '../../../../common/components/chartarea/view/ChartAreaView';
import styles from './ChartAreaTabsView.module.scss';

const ChartAreaTabsView = () => {
  const panes = [
    {
      menuItem: 'Subs 0504877334 Failures',
      render: () => (
        <Tab.Pane>
          <ChartAreaView className={styles.report} pageStateNamespace="reportsPage" />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Subs 0504877334 Throughput',
      render: () => (
        <Tab.Pane>
          <ChartAreaView className={styles.report} pageStateNamespace="reportsPage" />
        </Tab.Pane>
      )
    }
  ];

  return <Tab className={styles.tab} activeIndex={0} panes={panes} />;
};

export default ChartAreaTabsView;
