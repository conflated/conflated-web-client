import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import type { PageStateNamespace } from '../../../common/components/page/model/state/namespace/PageStateNamespace';
import styles from './NavigationView.module.scss';

type Props = {
  selectPage: (pageStateNamespace: PageStateNamespace) => void;
};

export default function NavigationView({ selectPage }: Props) {
  const { pathname } = useLocation();

  return (
    <nav className={styles.navigation}>
      <Link className={styles.link} to="/dashboards" onClick={() => selectPage('dashboardsPage')}>
        <Icon name="dashboard" color="teal" />
        <span className={`${styles.linkText} ${pathname === '/' || pathname === '/dashboards' ? styles.selected : ''}`}>
          DASHBOARDS
        </span>
      </Link>
      <Link className={styles.link} to="/reports" onClick={() => selectPage('reportsPage')}>
        <Icon name="file" color="teal" />
        <span className={`${styles.linkText} ${pathname === '/reports' ? styles.selected : ''}`}>REPORTS</span>
      </Link>
      <Link className={styles.link} to="/alerts" onClick={() => selectPage('alertsPage')}>
        <Icon name="alarm" color="teal" />
        <span className={`${styles.linkText} ${pathname === '/alerts' ? styles.selected : ''}`}>ALERTS</span>
      </Link>
      <Link className={styles.link} to="/goals" onClick={() => selectPage('goalsPage')}>
        <Icon name="target" color="teal" />
        <span className={`${styles.linkText} ${pathname === '/goals' ? styles.selected : ''}`}>GOALS</span>
      </Link>
      <Link className={styles.link} to="/data-explorer" onClick={() => selectPage('dataExplorerPage')}>
        <Icon name="database" color="teal" />
        <span className={`${styles.linkText} ${pathname === '/data-explorer' ? styles.selected : ''}`}>
          DATA EXPLORER
        </span>
      </Link>
    </nav>
  );
}
