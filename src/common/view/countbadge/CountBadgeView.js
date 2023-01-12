// @flow

import type { Element } from 'react';
import React from 'react';
import { Label } from 'semantic-ui-react';

type Props = $Exact<{
  className: string,
  color: string,
  count: number
}>;

const CountBadgeView = ({ className, color, count }: Props): Element<any> | null => {
  if (count > 0) {
    return (
      <Label className={className} color={color} horizontal>
        {count}
      </Label>
    );
  }

  return null;
};

export default CountBadgeView;
