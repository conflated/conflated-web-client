/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Icon, Tab } from 'semantic-ui-react';
import ChartAreaView from '../../../../common/components/chartarea/view/ChartAreaView';
import styles from './ChartAreaTabsView.module.scss';

const ChartAreaTabsView = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const panes = [
    {
      menuItem: (
        <span
          className={`item ${activeTabIndex === 0 ? 'active' : ''}`}
          key="Subs 0504877334 Failures"
          onClick={() => setActiveTabIndex(0)}
        >
          Subs 0504877334 Failures
          <Icon className={styles.closeIcon} name="close" />
        </span>
      ),
      render: () => (
        <Tab.Pane>
          <ChartAreaView className={styles.chartArea} pageStateNamespace="reportsPage" />
        </Tab.Pane>
      )
    },
    {
      menuItem: (
        <span
          className={`item ${activeTabIndex === 1 ? 'active' : ''}`}
          key="Subs 0504877334 Throughput"
          onClick={() => setActiveTabIndex(1)}
        >
          Subs 0504877334 Throughput
          <Icon className={styles.closeIcon} name="close" />
        </span>
      ),
      render: () => (
        <Tab.Pane>
          <ChartAreaView className={styles.chartArea} pageStateNamespace="reportsPage" />
        </Tab.Pane>
      )
    }
  ];

  return <Tab activeIndex={activeTabIndex} className={styles.tab} panes={panes} />;
};

export default ChartAreaTabsView;
