import React from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './UserMenuView.module.scss';
import styles2 from '../HeaderView.module.scss';

const UserMenuView = () => (
  <section className={styles.userMenu}>
    <span className={`${styles2.headerIcon} ${styles.userIcon}`} />
    <span>PKSILEN</span>
    <Icon name="dropdown" />
  </section>
);

export default UserMenuView;
