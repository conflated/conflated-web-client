import React from 'react';
import { Icon, Message } from 'semantic-ui-react';
import styles from './KeyboardShortcutsMessageView.module.scss';

type Props = {
  onDismissMessage: () => void;
};

const KeyboardShortcutsMessageView = ({ onDismissMessage }: Props) => (
  <Message className={styles.message} compact floating onDismiss={onDismissMessage}>
    <Message.Header>KEYBOARD SHORTCUTS</Message.Header>
    <div className={styles.keyboardShortcuts}>
      <table className={styles.keyboardShortcutsTable}>
        <tbody>
          <tr>
            <td>
              <span>PgUp</span>
            </td>
            <td>Prev dashboard</td>
          </tr>
          <tr>
            <td>
              <span>PgDown</span>
            </td>
            <td>Next dashboard</td>
          </tr>
        </tbody>
      </table>
      <table className={styles.keyboardShortcutsTable}>
        <tbody>
          <tr>
            <td>
              <span className={styles.first}>Shift</span>
              <b>+</b>
              <span className={styles.second}>PgUp</span>
            </td>
            <td>Prev dashboard group</td>
          </tr>
          <tr>
            <td>
              <span className={styles.first}>Shift</span>
              <b>+</b>
              <span className={styles.second}>PgDown</span>
            </td>
            <td>Next dashboard group</td>
          </tr>
        </tbody>
      </table>
      <table className={styles.keyboardShortcutsTable}>
        <tbody>
          <tr>
            <td>
              <span className={styles.first}>Shift</span>
              <b>+</b>
              <span className={styles.second}>Home</span>
            </td>
            <td>First dashboard</td>
          </tr>
          <tr>
            <td>
              <span className={styles.first}>Shift</span>
              <b>+</b>
              <span className={styles.second}>End</span>
            </td>
            <td>Last dashboard </td>
          </tr>
        </tbody>
      </table>
      <table className={styles.keyboardShortcutsTable}>
        <tbody>
          <tr>
            <td>
              <span>
                <Icon className={styles.keyboardShortcutIcon} name="arrow left" />
              </span>
            </td>
            <td>Scroll chart 1 data point left</td>
          </tr>
          <tr>
            <td>
              <span>
                <Icon className={styles.keyboardShortcutIcon} name="arrow right" />
              </span>
            </td>
            <td>Scroll chart 1 data point right</td>
          </tr>
        </tbody>
      </table>
      <table className={styles.keyboardShortcutsTable}>
        <tbody>
          <tr>
            <td>
              <span className={styles.first}>Ctrl</span>
              <b>+</b>
              <span className={styles.second}>
                <Icon className={styles.keyboardShortcutIcon} name="arrow left" />
              </span>
            </td>
            <td>Scroll chart 1 page left</td>
          </tr>
          <tr>
            <td>
              <span className={styles.first}>Ctrl</span>
              <b>+</b>
              <span className={styles.second}>
                <Icon className={styles.keyboardShortcutIcon} name="arrow right" />
              </span>
            </td>
            <td>Scroll chart 1 page right</td>
          </tr>
        </tbody>
      </table>
      <table className={styles.keyboardShortcutsTable}>
        <tbody>
          <tr>
            <td>
              <span>Home</span>
            </td>
            <td>First chart data point</td>
          </tr>
          <tr>
            <td>
              <span>End</span>
            </td>
            <td>Last chart data point</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Message>
);

export default KeyboardShortcutsMessageView;
