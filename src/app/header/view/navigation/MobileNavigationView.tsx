import React from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown, Icon } from 'semantic-ui-react';
import styles from './MobileNavigationView.module.scss';

const MobileNavigationView = () => {
  const { pathname } = useLocation();

  return (
    <Dropdown
      className={styles.dropdown}
      size="large"
      floating
      direction="right"
      icon={<Icon className={styles.icon} name="bars" size="big" />}
    >
      <Dropdown.Menu className={styles.menu}>
        <Dropdown.Item
          className={`${styles.item} ${pathname === '/dashboards' ? styles.selected : ''}`}
          value="Dashboards"
          onClick={() => {}}
        >
          <Icon className={styles.icon} name="dashboard" color="teal" />
          <span>Dashboards</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={`${styles.item} ${pathname === '/reports' ? styles.selected : ''}`}
          value="Reports"
          onClick={() => {}}
        >
          <Icon className={styles.icon} name="file alternate outline" color="teal" />
          <span>Reports</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={`${styles.item} ${pathname === '/alerts' ? styles.selected : ''}`}
          value="Alerts"
          onClick={() => {}}
        >
          <Icon className={styles.icon} name="alarm" color="teal" />
          <span>Alerts</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={`${styles.item} ${pathname === '/goals' ? styles.selected : ''}`}
          value="Goals"
          onClick={() => {}}
        >
          <Icon className={styles.icon} name="target" color="teal" />
          <span>Goals</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MobileNavigationView;
