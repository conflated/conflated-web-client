/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import styles from './TimestampRangeFilterInputView.module.scss';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  className: string;
  filterExpression: string;
};

export default function TimestampRangeFilterInputView({ changeFilterExpression, className, filterExpression }: Props) {
  const changeStartTimestamp = useCallback(
    (event: React.SyntheticEvent<HTMLElement>, { value: startTimestamp }: any) => {
      const timestamps = filterExpression.split(';');

      if (timestamps.length === 2) {
        changeFilterExpression(`${startTimestamp};${timestamps[1]}`);
      } else {
        changeFilterExpression(`${startTimestamp};`);
      }
    },
    [changeFilterExpression, filterExpression]
  );

  const changeEndTimestamp = useCallback(
    (event: React.SyntheticEvent<HTMLElement>, { value: endTimestamp }: any) => {
      const timestamps = filterExpression.split(';');

      if (timestamps.length === 2) {
        changeFilterExpression(`${timestamps[0]};${endTimestamp}`);
      } else {
        changeFilterExpression(`;${endTimestamp}`);
      }
    },
    [changeFilterExpression, filterExpression]
  );

  const timestamps = filterExpression.split(';');
  const fromTimestamp = timestamps.length > 0 ? timestamps[0] : '';
  const toTimestamp = timestamps.length === 2 ? timestamps[1] : '';

  return (
    <div className={`${className} ${styles.timestampRangeSelector}`}>
      <div className={styles.labelledDateTimeInput}>
        <span className={styles.label}>From</span>
        <div className={styles.dateTimeInput}>
          <DateTimeInput
            localization="fi"
            closable
            name="from"
            value={fromTimestamp}
            iconPosition="left"
            popupPosition="bottom left"
            onChange={changeStartTimestamp}
          />
        </div>
      </div>
      <div className={styles.labelledDateTimeInput}>
        <span className={styles.label}>To</span>
        <div className={styles.dateTimeInput}>
          <DateTimeInput
            localization="fi"
            closable
            name="to"
            value={toTimestamp}
            iconPosition="left"
            popupPosition="bottom left"
            onChange={changeEndTimestamp}
          />
        </div>
      </div>
    </div>
  );
}
