/* eslint-disable css-modules/no-undef-class */
import React, { useState } from 'react';
import { Icon, Menu, Popup, Tab } from 'semantic-ui-react';
import styles from './DataExplorerChartAreaTabsView.module.scss';
import ChartAreaView from '../../../../common/components/chartarea/view/ChartAreaView';

const DataExplorerChartAreaTabsView = () => {
  const [tabs, setTabs] = useState([] as string[]);

  const addNewTab = () => {
    setTabs([...tabs, `Sample tab ${tabs.length + 1}`]);
  };

  const removeTab = (tabToRemove: string) => {
    setTabs(tabs.filter((tab) => tab !== tabToRemove));
  };

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
    }
  ];

  const additionalPanes = tabs.map((tab) => ({
    menuItem: (
      <Menu.Item key={tab}>
        {tab}{' '}
        <Popup
          inverted
          mouseEnterDelay={1000}
          trigger={<Icon className={styles.closeIcon} name="close" onClick={() => removeTab(tab)} />}
          content="Close tab"
        />
      </Menu.Item>
    ),
    render: () => <Tab.Pane />
  }));

  const addButtonTab = {
    menuItem: (
      <Menu.Item key="Add new">
        <Popup
          inverted
          mouseEnterDelay={1000}
          trigger={<Icon name="plus" onClick={addNewTab} />}
          content="Add new tab"
        />
      </Menu.Item>
    ),
    render: () => <Tab.Pane />
  };

  return <Tab defaultActiveIndex={0} className={styles.tab} panes={[...panes, ...additionalPanes, addButtonTab]} />;
};

export default DataExplorerChartAreaTabsView;
