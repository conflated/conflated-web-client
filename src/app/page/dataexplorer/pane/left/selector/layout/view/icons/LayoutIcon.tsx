import React from 'react';
import classNames from 'classnames';
import styles from './LayoutIcons.module.scss';
import type { GridItems } from '../../../../../../../../common/components/chartarea/model/state/types/GridItems';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iconClassName: any;
  layout: GridItems;
  selectedLayout: GridItems;
  selectLayout: (layout: GridItems) => void;
};

const LayoutIcon = ({ iconClassName, layout, selectedLayout, selectLayout }: Props) => {
  const className = classNames(iconClassName, { [styles.selected]: layout === selectedLayout });
  return <span className={className} onClick={() => selectLayout(layout)} />;
};

export default LayoutIcon;
