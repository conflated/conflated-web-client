import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import classNames from 'classnames';
import styles from './PageView.module.scss';
import type { AppState } from '../../../../../store/AppState';
import PageControllerFactory from '../controller/PageControllerFactory';
import type { Pane } from '../model/state/types/Pane';
import type { PageStateNamespace } from '../model/state/namespace/PageStateNamespace';

type OwnProps = {
  className?: string;
  header?: JSX.Element;
  leftPane: JSX.Element;
  middlePane: JSX.Element;
  // eslint-disable-next-line react/no-unused-prop-types
  pageStateNamespace: PageStateNamespace;
  rightPane?: JSX.Element;
  showPaneActivatorHintsOnComponentMount?: boolean;
};

const mapAppStateToComponentProps = (appState: AppState, { pageStateNamespace }: OwnProps) =>
  appState.common.pageStates[pageStateNamespace];

const createController = (dispatch: Dispatch, { pageStateNamespace }: OwnProps) =>
  new PageControllerFactory(dispatch, pageStateNamespace).createController();

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = OwnProps & MappedState & Controller;

function PageView({
  className,
  dragPagePaneGutter,
  flashBrieflyPaneActivatorHints,
  header,
  leftPane,
  middlePane,
  rightPane,
  shouldShowPagePane,
  shouldShowPagePaneActivatorHint,
  shouldShowPagePanePermanently,
  showPane,
  showPaneActivatorHintsOnComponentMount,
  startPaneGutterDrag
}: Props) {
  useEffect(() => {
    if (showPaneActivatorHintsOnComponentMount) {
      flashBrieflyPaneActivatorHints();
    }
  }, [flashBrieflyPaneActivatorHints, showPaneActivatorHintsOnComponentMount]);

  const handlePaneGutterDragStart = (event: React.DragEvent<HTMLDivElement>, pane: Pane) => {
    event.persist();
    startPaneGutterDrag(pane, event.pageX);
  };

  const handlePaneGutterDrag = _.throttle((event: React.DragEvent<HTMLDivElement>, pane: Pane) => {
    event.persist();
    if (event.pageX !== null) {
      dragPagePaneGutter(pane, event.pageX);
    }
  }, 25);

  const getDraggableGutter = (pane: Pane) => {
    if (shouldShowPagePanePermanently[pane]) {
      return (
        <div
          className={styles.draggableGutter}
          draggable
          onDragStart={(event: React.DragEvent<HTMLDivElement>) => handlePaneGutterDragStart(event, pane)}
          onDrag={(event: React.DragEvent<HTMLDivElement>) => handlePaneGutterDrag(event, pane)}
        />
      );
    }

    return undefined;
  };

  const getPaneActivator = (pane: Pane) => {
    if (shouldShowPagePane[pane] || shouldShowPagePanePermanently[pane]) {
      return undefined;
    } else {
      return (
        <div
          className={pane === 'leftPane' ? styles.leftPaneActivator : styles.rightPaneActivator}
          onMouseOver={() => showPane(pane)}
          onFocus={() => showPane(pane)}
        />
      );
    }
  };

  const leftPaneActivatorClassName = classNames(styles.leftPaneActivatorHint, {
    [styles.visible]: shouldShowPagePaneActivatorHint.leftPane
  });

  const rightPaneActivatorHintClassName = classNames(styles.rightPaneActivatorHint, {
    [styles.visible]: shouldShowPagePaneActivatorHint.rightPane
  });

  return (
    <div className={`${styles.page} ${className ?? ''}`}>
      {header}
      {leftPane}
      {getDraggableGutter('leftPane')}
      {middlePane}
      {getDraggableGutter('rightPane')}
      {rightPane}
      {getPaneActivator('leftPane')}
      {getPaneActivator('rightPane')}
      <div className={leftPaneActivatorClassName} />
      <div className={rightPaneActivatorHintClassName} />
    </div>
  );
}

PageView.defaultProps = {
  className: '',
  header: undefined,
  rightPane: undefined,
  showPaneActivatorHintsOnComponentMount: true
};

export default connect(mapAppStateToComponentProps, createController)(PageView);
