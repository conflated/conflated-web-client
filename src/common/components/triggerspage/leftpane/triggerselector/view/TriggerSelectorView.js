// @flow

import _ from 'lodash';
import type { Element } from 'react';
import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import OOReduxUtils from 'oo-redux-utils';
import TriggerListItemView from './triggerlistitem/TriggerListItemView';
import type { AppState } from '../../../../../../store/AppState';
import type { TriggersPageStateNamespace } from '../../../model/state/namespace/TriggersPageStateNamespace';
import TriggerSelectorControllerFactory from '../controller/TriggerSelectorControllerFactory';
import SelectorWithDefaultActionsView from '../../../../selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import selectorWithDefaultActionsStateNamespaces from '../../../../selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import selectorStateNamespaces from '../../../../selector/model/state/namespace/SelectorStateNamespace';
import AllAndFavoritesTabView from '../../../../../view/allandfavoritestabview/AllAndFavoritesTabView';
import createTriggersSelector from '../model/state/selector/createTriggersSelector';
import type { Trigger } from '../model/state/trigger/Trigger';
import SelectorWithDefaultActionsControllerFactory from '../../../../selectorwithdefaultactions/controller/SelectorWithDefaultActionsControllerFactory';

type OwnProps = $Exact<{ pageStateNamespace: TriggersPageStateNamespace }>;

const mapAppStateToComponentProps = (appState: AppState, { pageStateNamespace }: OwnProps) =>
  OOReduxUtils.mergeOwnAndForeignState(appState[pageStateNamespace].triggerSelectorState, {
    triggers: createTriggersSelector(pageStateNamespace)(appState),

    isTriggerDataSourceSelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]]
        .isSelectorOpen,

    isTriggerGroupSelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]]
        .isSelectorOpen,
  });

const createController = (dispatch: Dispatch, { pageStateNamespace }: OwnProps) => ({
  toggleMaximizeSelector: new SelectorWithDefaultActionsControllerFactory(
    dispatch,
    selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}TriggerSelector`]
  ).createController().toggleMaximizeSelector,

  ...new TriggerSelectorControllerFactory(dispatch, pageStateNamespace).createController(),
});

type MappedState = $Call<typeof mapAppStateToComponentProps, AppState, OwnProps>;
type Controller = $Call<typeof createController, Dispatch, OwnProps>;
type Props = $Exact<{ ...OwnProps, ...MappedState, ...Controller }>;

const TriggerSelectorView = ({
  isTriggerDataSourceSelectorOpen,
  isTriggerGroupSelectorOpen,
  pageStateNamespace,
  selectedTriggers,
  selectTrigger,
  triggers,
  toggleMaximizeSelector,
}: Props): Element<any> => {
  const handleMaximizeIconClick = (event: SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();

    toggleMaximizeSelector([
      {
        isOpen: isTriggerDataSourceSelectorOpen,
        stateNamespace: selectorStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`],
      },
      {
        isOpen: isTriggerGroupSelectorOpen,
        stateNamespace: selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`],
      },
    ]);
  };

  const triggerListItems = useMemo(
    (): Array<Element<any>> =>
      triggers.map((trigger: Trigger) => (
        <TriggerListItemView
          key={trigger.name}
          trigger={trigger.name}
          triggerCount={trigger.count}
          severity={trigger.severity}
          selectedTriggers={selectedTriggers}
          selectTrigger={() => selectTrigger(trigger.name)}
        />
      )),
    [triggers, selectedTriggers, selectTrigger]
  );

  const selectorStateNamespace = `${pageStateNamespace}TriggerSelector`;

  return (
    <SelectorWithDefaultActionsView
      id={selectorStateNamespace}
      titleText="ALERT"
      listItemsContent={<AllAndFavoritesTabView firstTabPaneListItems={triggerListItems} secondTabPaneListItems={[]} />}
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace={selectorWithDefaultActionsStateNamespaces[selectorStateNamespace]}
    />
  );
};

export default connect<Props, OwnProps, _, _, _, _>(mapAppStateToComponentProps, createController)(TriggerSelectorView);
