/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';

type Props = {
  className: string;
  filterExpression: string;
  changeFilterExpression: (filterExpression: string) => void;
};

const DateRangeFilterInputView = ({ className, filterExpression, changeFilterExpression }: Props) => {
  return (
    <div className={`${className} dates-range-input`}>
      <DatesRangeInput
        localization="fi"
        closable
        name="datesRange"
        placeholder="From date - to date"
        value={filterExpression}
        iconPosition="left"
        popupPosition="bottom left"
        onChange={(event: React.SyntheticEvent<HTMLElement>, { value: datesRange }: any) =>
          changeFilterExpression(datesRange)
        }
      />
    </div>
  );
};

export default DateRangeFilterInputView;
