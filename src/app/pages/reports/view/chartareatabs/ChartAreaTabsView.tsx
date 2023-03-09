import React from 'react';
import { Tab } from 'semantic-ui-react';
import ChartAreaView from '../../../../common/components/chartarea/view/ChartAreaView';

const ChartAreaTabsView = () => {
  const panes = [
    { menuItem: 'Subs 0504877334 Failures', render: () => <ChartAreaView pageStateNamespace="reportsPage" /> },
    { menuItem: 'Subs 0504877334 Throughput', render: () => <ChartAreaView pageStateNamespace="reportsPage" /> }
  ];

  return <Tab activeIndex={0} panes={panes} />;
};

export default ChartAreaTabsView;
