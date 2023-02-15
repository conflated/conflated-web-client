import React from 'react';
import { Input, Popup } from 'semantic-ui-react';
import styles from './DashbaordsSlideShowSlideChangeIntervalInputView.module.scss';

type Props = {
  changeDashboardsSlideChangeInterval: (value: string) => void;
  slideChangeIntervalInSecsStr: string;
};

const DashboardsSlideShowSlideChangeIntervalInputView = ({
  changeDashboardsSlideChangeInterval,
  slideChangeIntervalInSecsStr
}: Props) => (
  <>
    <Popup
      inverted
      trigger={
        <Input
          className={styles.slideChangeIntervalInput}
          value={slideChangeIntervalInSecsStr}
          onChange={({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) =>
            changeDashboardsSlideChangeInterval(value)
          }
        />
      }
      content="Slide change interval for dashboards slide show"
    />
    <span style={{ color: '#000000' }}>secs</span>
  </>
);

export default DashboardsSlideShowSlideChangeIntervalInputView;
