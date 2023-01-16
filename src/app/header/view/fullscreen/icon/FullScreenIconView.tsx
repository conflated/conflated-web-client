import React from 'react';
import { Popup } from 'semantic-ui-react';
import styles from '../../HeaderView.module.scss';
import styles2 from './FullScreenIconView.module.scss';

type Props = {
  requestFullScreenMode: () => void;
};

const FullScreenIconView = ({ requestFullScreenMode }: Props) => (
  <section className={styles2.fullScreen}>
    <Popup
      trigger={<span className={`${styles.headerIcon} ${styles2.fullScreenIcon}`} onClick={requestFullScreenMode} />}
      content="Switch to full screen mode"
      inverted
    />
  </section>
);

export default FullScreenIconView;
