import React from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './UserMenuView.module.scss';

const UserMenuView = () => (
  <section className={styles.userMenu}>
    <Icon name="user" />
    <span>Petri</span>
    <Icon name="dropdown" />
  </section>
);

export default UserMenuView;
