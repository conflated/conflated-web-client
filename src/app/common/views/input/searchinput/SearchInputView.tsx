/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { Input, Popup } from 'semantic-ui-react';

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
      <Popup
        content="Type keyword(s) to search, for a negated search, prefix the keyword(s) with a minus sign, e.g. -failure to find all measures not containing the word 'failure'"
        inverted
        mouseEnterDelay={2000}
        trigger={
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
        }
      />
    );
  }

  return null;
};

export default SearchInputView;
