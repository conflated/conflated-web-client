import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import type { PageStateNamespace } from '../../../common/components/page/model/state/types/PageStateNamespace';
import styles from './NavigationView.module.scss';

type Props = {
  selectPage: (pageStateNamespace: PageStateNamespace) => void;
};

const NavigationView = ({ selectPage }: Props) => {
  const { pathname } = useLocation();

  return (
    <nav className={styles.navigation}>
      <Link className={styles.link} to="/dashboards" onClick={() => selectPage('dashboardsPage')}>
        <Icon className={styles.linkIcon} name="dashboard" color="teal" />
        <span className={`${styles.linkText} ${pathname === '/dashboards' ? styles.selected : ''}`}>DASHBOARDS</span>
      </Link>
      <Link className={styles.link} to="/reports" onClick={() => selectPage('reportsPage')}>
        <Icon className={styles.linkIcon} name="file alternate outline" color="teal" />
        <span className={`${styles.linkText} ${pathname === '/reports' ? styles.selected : ''}`}>REPORTS</span>
      </Link>
      <Link className={styles.link} to="/alerts" onClick={() => selectPage('alertsPage')}>
        <Icon className={styles.linkIcon} name="alarm" color="teal" />
        <span className={`${styles.linkText} ${pathname === '/alerts' ? styles.selected : ''}`}>ALERTS</span>
      </Link>
      <Link className={styles.link} to="/goals" onClick={() => selectPage('goalsPage')}>
        <Icon className={styles.linkIcon} name="target" color="teal" />
        <span className={`${styles.linkText} ${pathname === '/goals' ? styles.selected : ''}`}>GOALS</span>
      </Link>
      <Link className={styles.link} to="/data-explorer" onClick={() => selectPage('dataExplorerPage')}>
        <Icon className={styles.linkIcon} name="database" color="teal" />
        <span className={`${styles.linkText} ${pathname === '/data-explorer' ? styles.selected : ''}`}>
          DATA EXPLORER
        </span>
      </Link>
    </nav>
  );
};

export default NavigationView;
