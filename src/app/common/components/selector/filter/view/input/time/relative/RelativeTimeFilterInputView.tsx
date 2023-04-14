/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NumberInput from 'semantic-ui-react-numberinput';
import styles from './RelativeTimeFilterInputView.module.scss';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  filterExpression: string;
};

const RelativeTimeFilterInputView = ({ changeFilterExpression, filterExpression }: Props) => {
  const changeRelativeTimeValue = (relativeTimeValueStr: any) => {
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
      key: 'Weeks',
      text: 'Weeks',
      value: 'Weeks'
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
      key: 'Quarters',
      text: 'Quarters',
      value: 'Quarters'
    },
    {
      key: 'Years',
      text: 'Years',
      value: 'Years'
    }
  ];

  return (
    <div className={styles.relativeTimeSelector}>
      <span style={{ fontWeight: 'bold' }}>Last</span>
      <NumberInput
        buttonPlacement="right"
        className={styles.relativeTimeValueInput}
        value={filterExpression.split(' ')[0] || '30'}
        maxLength={5}
        maxValue={99999}
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
};

export default RelativeTimeFilterInputView;
