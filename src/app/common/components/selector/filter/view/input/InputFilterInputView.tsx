import React from 'react';
import { Input } from 'semantic-ui-react';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  className: string;
  filterExpression: string;
  isSelectionFilter: boolean | null | undefined;
};

const InputFilterInputView = ({ changeFilterExpression, className, filterExpression, isSelectionFilter }: Props) => (
  <Input
    className={className}
    disabled={isSelectionFilter === true}
    placeholder="Enter filter, e.g. 1, 5, 10-15"
    onChange={({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => changeFilterExpression(value)}
    size="small"
    value={filterExpression}
  />
);

export default InputFilterInputView;
