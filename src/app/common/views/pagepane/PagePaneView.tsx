import React from 'react';
import classNames from 'classnames';
import styles from './PagePaneView.module.scss';
import type { Pane } from '../../components/page/model/state/types/Pane';

type Props = {
  children: Array<JSX.Element>;
  hidePagePane: () => void;
  id: string;
  isFullScreenModeActive: boolean;
  pane: Pane;
  paneDefaultWidthCssVarName: string;
  paneGutterOffset: number;
  shouldShowPagePane: boolean;
  shouldShowPagePanePermanently: boolean;
};

const PagePaneView = ({
  children,
  hidePagePane,
  id,
  isFullScreenModeActive,
  pane,
  paneDefaultWidthCssVarName,
  paneGutterOffset,
  shouldShowPagePane,
  shouldShowPagePanePermanently
}: Props) => {
  const className = classNames(styles.pagePane, {
    [styles.left]: pane === 'leftPane',
    [styles.right]: pane === 'rightPane',
    [styles.visible]: shouldShowPagePane,
    [styles.permanentlyVisible]: shouldShowPagePanePermanently,
    [styles.fullScreen]: isFullScreenModeActive
  });

  const adjustedWidth = `calc(var(--${paneDefaultWidthCssVarName}) ${
    pane === 'leftPane' ? '+' : '-'
  } ${paneGutterOffset}px)`;

  const style = {
    width: shouldShowPagePanePermanently ? adjustedWidth : `var(--${paneDefaultWidthCssVarName})`,
    minWidth: '23rem'
  };

  return (
    <aside id={id} className={className} style={style} onMouseLeave={hidePagePane} onBlur={hidePagePane}>
      {children}
    </aside>
  );
};

export default PagePaneView;
