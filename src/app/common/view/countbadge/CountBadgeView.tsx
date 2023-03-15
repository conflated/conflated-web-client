/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Label } from 'semantic-ui-react';

type Props = {
  className: string;
  color: string;
  count: number;
};

const CountBadgeView = ({ className, color, count }: Props) => {
  if (count > 0) {
    return (
      <Label className={className} circular color={color as any} horizontal>
        {count}
      </Label>
    );
  }

  return null;
};

export default CountBadgeView;
