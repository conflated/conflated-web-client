import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import styles from './MobileNavigationView.module.scss';

const MobileNavigationView = () => (
  <Dropdown
    className={styles.dropdown}
    size="large"
    floating
    direction="right"
    icon={<Icon className={styles.icon} name="bars" size="big" />}
  >
    <Dropdown.Menu className={styles.menu}>
      <Dropdown.Item className={styles.item} value="Dashboards" onClick={() => {}}>
        <Icon name="dashboard" color="teal" />
        <span>Dashboards</span>
      </Dropdown.Item>
      <Dropdown.Item className={styles.item} value="Dashboards" onClick={() => {}}>
        <Icon name="file alternate outline" color="teal" />
        <span>Reports</span>
      </Dropdown.Item>
      <Dropdown.Item className={styles.item} value="Dashboards" onClick={() => {}}>
        <Icon name="alarm" color="teal" />
        <span>Alerts</span>
      </Dropdown.Item>
      <Dropdown.Item className={styles.item} value="Dashboards" onClick={() => {}}>
        <Icon name="target" color="teal" />
        <span>Goals</span>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default MobileNavigationView;
