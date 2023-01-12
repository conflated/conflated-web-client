import React from 'react';
import { Popup } from 'semantic-ui-react';
import styles from '../../HeaderView.module.scss';
import styles2 from './FullScreenIconView.module.scss';

type Props = {
  requestFullScreenMode: () => void;
};

export default function FullScreenIconView({ requestFullScreenMode }: Props) {
  return (
    <section className={styles2.fullScreen}>
      <Popup
        trigger={<span className={`${styles.headerIcon} ${styles2.fullScreenIcon}`} onClick={requestFullScreenMode} />}
        content="Switch to full screen mode"
        inverted
      />
    </section>
  );
}
