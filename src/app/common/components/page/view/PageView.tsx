import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './PageView.module.scss';
import type { Pane } from '../model/state/types/Pane';
import type { PageStateNamespace } from '../model/state/types/PageStateNamespace';
import { ActionDispatchers, controller, State } from '../controller/pageController';

export type OwnProps = {
  className?: string;
  header?: JSX.Element;
  leftPane: JSX.Element;
  middlePane: JSX.Element;
  // eslint-disable-next-line react/no-unused-prop-types
  pageStateNamespace: PageStateNamespace;
  rightPane?: JSX.Element;
  showPaneActivatorHintsOnComponentMount?: boolean;
};

type Props = OwnProps & ActionDispatchers & State;

const PageView = ({
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
}: Props) => {
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

    if (event.pageX !== 0) {
      dragPagePaneGutter(pane, event.pageX);
    }
  }, 25);

  const createDraggableGutter = (pane: Pane) => {
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

  const createPaneActivator = (pane: Pane) => {
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

  const leftPaneActivatorHintClassName = classNames(styles.leftPaneActivatorHint, {
    [styles.visible]: shouldShowPagePaneActivatorHint.leftPane
  });

  const rightPaneActivatorHintClassName = classNames(styles.rightPaneActivatorHint, {
    [styles.visible]: shouldShowPagePaneActivatorHint.rightPane
  });

  return (
    <div className={`${styles.page} ${className ?? ''}`}>
      {header}
      {leftPane}
      {createDraggableGutter('leftPane')}
      {middlePane}
      {createDraggableGutter('rightPane')}
      {rightPane}
      {createPaneActivator('leftPane')}
      {createPaneActivator('rightPane')}
      <div className={leftPaneActivatorHintClassName}>Hover here to activate left pane</div>
      <div className={rightPaneActivatorHintClassName}>Hover here to activate right pane</div>
    </div>
  );
};

PageView.defaultProps = {
  className: '',
  header: undefined,
  rightPane: undefined,
  showPaneActivatorHintsOnComponentMount: true
};

export default connect(controller.getState, _.memoize(controller.getActionDispatchers))(PageView);
