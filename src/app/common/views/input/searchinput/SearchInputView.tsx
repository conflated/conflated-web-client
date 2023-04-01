/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { Input } from 'semantic-ui-react';

type Props = {
  className: string;
  isShown: boolean;
  onChange: (inputValue: string) => void;
};

const SearchInputView = ({ className, isShown, onChange }: Props) => {
  const inputRef: { current: any } = useRef(null);

  useEffect(() => {
    if (isShown) {
      inputRef.current?.focus();
    }
  }, [isShown]);

  if (isShown) {
    return (
      <Input
        className={className}
        placeholder="Search..."
        fluid
        icon="search"
        iconPosition="left"
        size="small"
        ref={inputRef}
        onChange={({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => onChange(value)}
      />
    );
  }

  return null;
};

export default SearchInputView;
