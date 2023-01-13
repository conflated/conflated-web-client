import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import DashboardsPageView from './pages/dashboardspage/view/DashboardsPageView';
import DataExplorerPageView from './pages/dataexplorerpage/view/DataExplorerPageView';
import HeaderView from './header/view/HeaderView';
import AlertsPageView from './pages/alertspage/view/AlertsPageView';
import GoalsPageView from './pages/goalspage/view/GoalsPageView';

export default function AppView() {
  return (
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
}
