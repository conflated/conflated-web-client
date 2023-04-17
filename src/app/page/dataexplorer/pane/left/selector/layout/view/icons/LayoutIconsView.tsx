import React from 'react';
import styles from './LayoutIcons.module.scss';
import LayoutIcon from './LayoutIcon';
import layout1 from '../../model/state/layouts/layout1';
import layout2 from '../../model/state/layouts/layout2';
import layout3 from '../../model/state/layouts/layout3';
import layout4 from '../../model/state/layouts/layout4';
import layout5 from '../../model/state/layouts/layout5';
import layout6 from '../../model/state/layouts/layout6';
import layout7 from '../../model/state/layouts/layout7';
import layout8 from '../../model/state/layouts/layout8';
import layout9 from '../../model/state/layouts/layout9';
import layout10 from '../../model/state/layouts/layout10';
import layout11 from '../../model/state/layouts/layout11';
import layout12 from '../../model/state/layouts/layout12';
import layout13 from '../../model/state/layouts/layout13';
import layout14 from '../../model/state/layouts/layout14';
import layout15 from '../../model/state/layouts/layout15';
import scrollingLayout from '../../model/state/layouts/scrollingLayout';
import { GridItem } from '../../../../../../../../common/components/chartarea/model/state/types/GridItem';

type Props = {
  selectedLayout: GridItem[];
  selectLayout: (layout: GridItem[]) => void;
};

const LayoutIconsView = (props: Props) => (
  <div className={styles.layoutIcons}>
    <LayoutIcon {...props} iconClassName={styles.layoutIcon1} layout={layout1} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon2} layout={layout2} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon3} layout={layout3} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon4} layout={layout4} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon5} layout={layout5} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon6} layout={layout6} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon7} layout={layout7} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon8} layout={layout8} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon9} layout={layout9} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon10} layout={layout10} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon11} layout={layout11} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon12} layout={layout12} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon13} layout={layout13} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon14} layout={layout14} />
    <LayoutIcon {...props} iconClassName={styles.layoutIcon15} layout={layout15} />
    <LayoutIcon {...props} iconClassName={styles.scrollingLayoutIcon} layout={scrollingLayout} />
  </div>
);

export default LayoutIconsView;
