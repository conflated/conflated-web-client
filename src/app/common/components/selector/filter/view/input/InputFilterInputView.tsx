import React from 'react';
import { Input } from 'semantic-ui-react';

type Props = {
  changeFilterExpression: (filterExpression: string) => void;
  className: string;
  filterExpression: string;
  isSelectionFilter: boolean | null | undefined;
  placeholder: string;
};

const InputFilterInputView = ({
  changeFilterExpression,
  className,
  filterExpression,
  isSelectionFilter,
  placeholder
}: Props) => (
  <Input
    className={className}
    disabled={isSelectionFilter === true}
    placeholder={placeholder}
    onChange={({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => changeFilterExpression(value)}
    size="small"
    value={filterExpression}
  />
);

export default InputFilterInputView;
