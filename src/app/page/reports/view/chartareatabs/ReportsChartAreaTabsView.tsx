/* eslint-disable @typescript-eslint/no-explicit-any,css-modules/no-undef-class */
import React, { useState } from 'react';
import { Icon, Menu, Tab } from 'semantic-ui-react';
import ChartAreaView from '../../../../common/components/chartarea/view/ChartAreaView';
import styles from './ReportsChartAreaTabsView.module.scss';

const ReportsChartAreaTabsView = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const changeActiveTab = (_: React.SyntheticEvent, { activeIndex }: any) => setActiveTabIndex(activeIndex);

  const panes = [
    {
      menuItem: (
        <Menu.Item key="Subs 0504877334 Failures">
          <Icon name="file alternate outline" />
          Subs 0504877334 Failures
          <Icon className={styles.closeIcon} name="close" />
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <ChartAreaView className={styles.chartArea} stateNamespace="reportsPage" />
        </Tab.Pane>
      )
    },
    {
      menuItem: (
        <Menu.Item key="Subs 0504877334 Throughput">
          <Icon name="file alternate outline" />
          Subs 0504877334 Throughput
          <Icon className={styles.closeIcon} name="close" />
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <ChartAreaView className={styles.chartArea} stateNamespace="reportsPage" />
        </Tab.Pane>
      )
    }
  ];

  return <Tab activeIndex={activeTabIndex} className={styles.tab} onTabChange={changeActiveTab} panes={panes} />;
};

export default ReportsChartAreaTabsView;
