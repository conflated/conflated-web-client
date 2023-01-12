import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import { Accordion, Icon } from 'semantic-ui-react';
import styles from './SelectorView.module.scss';
import type { AppState } from '../../../../store/AppState';
import SelectorControllerFactory from '../controller/SelectorControllerFactory';
import type { SelectorStateNamespace } from '../model/state/namespace/SelectorStateNamespace';

type OwnProps = {
  additionalContent?: JSX.Element | null;
  id: string;
  isSelectorMaximized?: boolean;
  selectorContentClassName?: string;
  selectorContent: JSX.Element;
  // eslint-disable-next-line react/no-unused-prop-types
  selectorStateNamespace: SelectorStateNamespace;
  titleText: string;
  titleContent?: JSX.Element | null;
};

const mapAppStateToComponentProps = (appState: AppState, { selectorStateNamespace }: OwnProps) =>
  appState.common.selectorStates[selectorStateNamespace];

const createController = (dispatch: Dispatch, { selectorStateNamespace }: OwnProps) =>
  new SelectorControllerFactory(dispatch, selectorStateNamespace).createController();

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = OwnProps & MappedState & Controller;

const SelectorView: React.FC<Props> = ({
  additionalContent,
  id,
  isSelectorOpen,
  isSelectorMaximized,
  selectorContent,
  selectorContentClassName,
  titleContent,
  titleText,
  toggleSelectorOpen
}: Props) => (
  <section id={id}>
    <Accordion className={isSelectorMaximized && isSelectorOpen ? styles.maximizedSelector : ''}>
      <Accordion.Title className={styles.title} active={isSelectorOpen} index={0} onClick={toggleSelectorOpen}>
        <Icon name="dropdown" />
        <span className={styles.titleSpan}>{titleText}</span>
        {titleContent}
      </Accordion.Title>
      <Accordion.Content className={selectorContentClassName} active={isSelectorOpen}>
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

export default connect(mapAppStateToComponentProps, createController)(SelectorView);
