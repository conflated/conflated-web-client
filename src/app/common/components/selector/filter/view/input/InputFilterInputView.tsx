import React from 'react';
import { Input } from 'semantic-ui-react';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  className: string;
  filterExpression: string;
  placeholder: string;
};

const InputFilterInputView = ({ changeFilterExpression, className, filterExpression, placeholder }: Props) => (
  <Input
    className={className}
    placeholder={placeholder}
    onChange={({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => changeFilterExpression(value)}
    value={filterExpression}
  />
);

export default InputFilterInputView;
