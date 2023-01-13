import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import DashboardsPageView from './pages/dashboards/view/DashboardsPageView';
import DataExplorerPageView from './pages/dataexplorer/view/DataExplorerPageView';
import HeaderView from './header/view/HeaderView';
import AlertsPageView from './pages/alerts/view/AlertsPageView';
import GoalsPageView from './pages/goals/view/GoalsPageView';

const AppView = () => (
  <Provider store={store}>
    <Router>
      <div>
        <HeaderView />
        <Routes>
          <Route path="/" element={<DashboardsPageView />} />
          <Route path="/dashboards" element={<DashboardsPageView />} />
          <Route path="/data-explorer" element={<DataExplorerPageView />} />
          <Route path="/alerts" element={<AlertsPageView />} />
          <Route path="/goals" element={<GoalsPageView />} />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default AppView;
