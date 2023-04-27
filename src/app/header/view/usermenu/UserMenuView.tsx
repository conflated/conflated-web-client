import React, { useState } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import styles from './UserMenuView.module.scss';

const UserMenuView = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <section className={styles.userMenu}>
      <Icon name="user" />
      <span>Petri</span>
      <Dropdown open={menuIsOpen} direction="left" icon="dropdown" onClick={() => setMenuIsOpen(!menuIsOpen)}>
        <Dropdown.Menu style={{ zIndex: 'calc(var(--topmost-z-index) + 2)' }}>
          <Dropdown.Item value="Admin settings">
            <div>
              <Icon name="setting" />
              <span>Admin settings</span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item value="User settings">
            <div>
              <Icon name="setting" />
              <span>User settings</span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item value="Logout">
            <div>
              <Icon name="log out" />
              <span>Log out</span>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </section>
  );
};

export default UserMenuView;
