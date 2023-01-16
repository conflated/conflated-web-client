import React from 'react';
import { Input } from 'semantic-ui-react';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  className: string;
  filterExpression: string;
  isSelectionFilter: boolean | null | undefined;
};

const InputFilterInputView = ({ changeFilterExpression, className, filterExpression, isSelectionFilter }: Props) => {
  return (
    <Input
      className={className}
      disabled={isSelectionFilter === true}
      placeholder="Enter filter, e.g. 1, 5, 10-15"
      onChange={({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => changeFilterExpression(value)}
      value={filterExpression}
    />
  );
};

export default InputFilterInputView;
