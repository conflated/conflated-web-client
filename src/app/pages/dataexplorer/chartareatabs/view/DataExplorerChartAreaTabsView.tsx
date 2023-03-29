/* eslint-disable css-modules/no-undef-class */
import React from 'react';
import { Icon, Menu, Popup, Tab } from 'semantic-ui-react';
import styles from './DataExplorerChartAreaTabsView.module.scss';
import ChartAreaView from '../../../../common/components/chartarea/view/ChartAreaView';

const DataExplorerChartAreaTabsView = () => {
  const panes = [
    {
      menuItem: (
        <Menu.Item key="My Playground 1">
          My Playground 1
          <Popup
            inverted
            mouseEnterDelay={1000}
            trigger={<Icon className={styles.closeIcon} name="close" />}
            content="Close tab"
          />
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <ChartAreaView className={styles.chartArea} stateNamespace="dataExplorerPage" />
        </Tab.Pane>
      )
    },
    {
      menuItem: (
        <Menu.Item key="My Playground 2">
          My Playground 2
          <Popup
            inverted
            mouseEnterDelay={1000}
            trigger={<Icon className={styles.closeIcon} name="close" />}
            content="Close tab"
          />
        </Menu.Item>
      ),
      render: () => <Tab.Pane />
    },
    {
      menuItem: (
        <Menu.Item key="Add new">
          <Popup inverted mouseEnterDelay={1000} trigger={<Icon name="plus" />} content="Add new tab" />
        </Menu.Item>
      ),
      render: () => <Tab.Pane />
    }
  ];

  return <Tab activeIndex={0} className={styles.tab} panes={panes} />;
};

export default DataExplorerChartAreaTabsView;
