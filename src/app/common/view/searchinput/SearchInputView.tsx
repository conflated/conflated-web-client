import React from 'react';
import { Input } from 'semantic-ui-react';

type Props = {
  className: string;
  isShown: boolean;
  onChange: (inputValue: string) => void;
};

const SearchInputView = ({ className, isShown, onChange }: Props) => {
  if (isShown) {
    return (
      <Input
        className={className}
        placeholder="Search..."
        fluid
        icon="search"
        iconPosition="left"
        size="small"
        onChange={({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => onChange(value)}
      />
    );
  }

  return null;
};

export default SearchInputView;
