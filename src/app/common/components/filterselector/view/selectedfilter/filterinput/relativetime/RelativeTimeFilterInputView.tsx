/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import styles from './RelativeTimeFilterInputView.module.scss';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  filterExpression: string;
};

export default function RelativeTimeFilterInputView({ changeFilterExpression, filterExpression }: Props) {
  const changeRelativeTimeValue = ({
    currentTarget: { value: relativeTimeValueStr }
  }: React.SyntheticEvent<HTMLInputElement>) => {
    const relativeTimeUnit = filterExpression.split(' ')[1];
    const relativeTimeValue = parseInt(relativeTimeValueStr, 10);

    if (relativeTimeValueStr === '' || _.isFinite(relativeTimeValue)) {
      changeFilterExpression(`${relativeTimeValueStr ? relativeTimeValue : relativeTimeValueStr} ${relativeTimeUnit}`);
    }
  };

  const changeRelativeTimeUnit = (event: React.SyntheticEvent<HTMLElement>, { value: relativeTimeUnit }: any) => {
    const relativeTimeValueStr = filterExpression.split(' ')[0];
    changeFilterExpression(`${relativeTimeValueStr} ${relativeTimeUnit}`);
  };

  const relativeTimeUnitOptions = [
    {
      key: 'Seconds',
      text: 'Seconds',
      value: 'Seconds'
    },
    {
      key: 'Minute',
      text: 'Minutes',
      value: 'Minutes'
    },
    {
      key: 'Hours',
      text: 'Hours',
      value: 'Hours'
    },
    {
      key: 'Days',
      text: 'Days',
      value: 'Days'
    },
    {
      key: 'Months',
      text: 'Months',
      value: 'Months'
    },
    {
      key: 'Years',
      text: 'Years',
      value: 'Years'
    }
  ];

  return (
    <div className={styles.relativeTimeSelector}>
      <span>Last</span>
      <Input
        className={styles.relativeTimeValueInput}
        value={filterExpression.split(' ')[0]}
        maxLength={2}
        onChange={changeRelativeTimeValue}
      />
      <Dropdown
        className={styles.relativeTimeUnitDropdown}
        text={filterExpression.split(' ')[1]}
        inline
        options={relativeTimeUnitOptions}
        onChange={changeRelativeTimeUnit}
      />
    </div>
  );
}
