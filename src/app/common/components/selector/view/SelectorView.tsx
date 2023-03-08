import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Accordion, Icon } from 'semantic-ui-react';
import styles from './SelectorView.module.scss';
import type { SelectorStateNamespace } from '../model/state/types/SelectorStateNamespace';
import { ActionDispatchers, controller, State } from '../controller/selectorController';

export type OwnProps = {
  additionalContent?: JSX.Element | null;
  id: string;
  isSelectorMaximized?: boolean;
  position: 'leftPane' | 'rightPane';
  selectorContentClassName?: string;
  selectorContent: JSX.Element;
  // eslint-disable-next-line react/no-unused-prop-types
  selectorStateNamespace: SelectorStateNamespace;
  titleText: string;
  titleContent?: JSX.Element | null;
};

type Props = OwnProps & ActionDispatchers & State;

const SelectorView: React.FC<Props> = ({
  additionalContent,
  id,
  isSelectorOpen,
  isSelectorMaximized,
  position,
  selectorContent,
  selectorContentClassName,
  titleContent,
  titleText,
  toggleSelectorOpen
}: Props) => (
  <section id={id} className={position === 'leftPane' ? styles.leftPaneSelector : styles.rightPaneSelector}>
    <Accordion className={isSelectorMaximized && isSelectorOpen ? styles.maximizedSelector : ''}>
      <Accordion.Title className={styles.title} active={isSelectorOpen} index={0} onClick={toggleSelectorOpen}>
        <Icon name="dropdown" />
        <span className={styles.titleSpan}>{titleText}</span>
        {titleContent}
      </Accordion.Title>
      <Accordion.Content className={`${selectorContentClassName} ${styles.content}`} active={isSelectorOpen}>
        <div id={`${id}Content`}>{selectorContent}</div>
      </Accordion.Content>
    </Accordion>
    {additionalContent}
  </section>
);

SelectorView.defaultProps = {
  additionalContent: undefined,
  isSelectorMaximized: true,
  selectorContentClassName: '',
  titleContent: undefined
};

export default connect(
  controller.getState,
  _.memoize((__, { selectorStateNamespace }: OwnProps) => controller.getActionDispatchers(selectorStateNamespace))
)(SelectorView);
