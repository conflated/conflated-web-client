/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import ChartAreaView from '../../../../common/components/chartarea/view/ChartAreaView';
import styles from './ChartAreaTabsView.module.scss';

const ChartAreaTabsView = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const changeActiveTab = (_: React.SyntheticEvent, { activeIndex }: any) => setActiveTabIndex(activeIndex);

  const panes = [
    {
      menuItem: {
        key: 'Subs 0504877334 Failures',
        content: 'Subs 0504877334 Failures',
        icon: 'file alternate outline'
      },
      render: () => (
        <Tab.Pane>
          <ChartAreaView className={styles.chartArea} pageStateNamespace="reportsPage" />
        </Tab.Pane>
      )
    },
    {
      menuItem: {
        key: 'Subs 0504877334 Throughput',
        content: 'Subs 0504877334 Throughput',
        icon: 'file alternate outline'
      },
      render: () => (
        <Tab.Pane>
          <ChartAreaView className={styles.chartArea} pageStateNamespace="reportsPage" />
        </Tab.Pane>
      )
    }
  ];

  return <Tab activeIndex={activeTabIndex} className={styles.tab} onTabChange={changeActiveTab} panes={panes} />;
};

export default ChartAreaTabsView;
