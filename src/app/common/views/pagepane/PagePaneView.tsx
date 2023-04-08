import React from 'react';
import classNames from 'classnames';
import styles from './PagePaneView.module.scss';
import type { Pane } from '../../components/page/model/state/types/Pane';

type Props = {
  children: Array<JSX.Element>;
  dragStartPosition: number;
  hidePagePane: () => void;
  id: string;
  isFullScreenModeActive: boolean;
  minWidth: string;
  pane: Pane;
  paneDefaultWidthCssVarName: string;
  paneGutterOffset: number;
  shouldShowPagePane: boolean;
  shouldShowPagePanePermanently: boolean;
};

const PagePaneView = ({
  children,
  dragStartPosition,
  hidePagePane,
  id,
  isFullScreenModeActive,
  minWidth,
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

  const currentWidth =
    dragStartPosition >= 0 ? `${dragStartPosition}px` : `var(--${paneDefaultWidthCssVarName}) - 4rem`;

  const adjustedWidth = `calc(${currentWidth} ${pane === 'leftPane' ? '+' : '-'} ${paneGutterOffset}px)`;

  const style = {
    width: shouldShowPagePanePermanently ? adjustedWidth : `var(--${paneDefaultWidthCssVarName})`,
    minWidth
  };

  return (
    <aside id={id} className={className} style={style} onMouseLeave={hidePagePane} onBlur={hidePagePane}>
      {children}
    </aside>
  );
};

export default PagePaneView;
