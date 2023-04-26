import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import styles2 from './SelectorWithTitleActionsView.module.scss';
import styles from '../../view/SelectorView.module.scss';
import SearchInputView from '../../../../views/input/searchinput/SearchInputView';
import SelectorTitleActionsView from './SelectorTitleActionsView';
import SelectorView from '../../view/SelectorView';
import type { SelectorWithTitleActionsStateNamespace } from '../model/state/types/SelectorWithTitleActionsStateNamespace';
import { ActionDispatchers, controller, State } from '../controller/selectorWithTitleActionsController';
import stopEventPropagation from '../../../../utils/stopEventPropagation';

export type OwnProps = {
  addIconTooltipText?: string;
  additionalContent?: JSX.Element;
  handleMaximizeIconClick: (...args: never[]) => void;
  handlePinIconClick?: (...args: never[]) => void;
  handleSelectAllIconClick?: () => void;
  id: string;
  isPinned?: boolean;
  listItemsContent: JSX.Element | Array<JSX.Element> | null;
  position: 'leftPane' | 'rightPane';
  reorderIconTooltipText?: string;
  selectedListItemsContent?: JSX.Element;
  selectorStateNamespace: SelectorWithTitleActionsStateNamespace;
  titleText: string;
};

type Props = OwnProps & ActionDispatchers & State;

const SelectorWithTitleActionsView: React.FC<Props> = ({
  addIconTooltipText,
  additionalContent,
  changeSelectorSearchedValue,
  handleMaximizeIconClick,
  handlePinIconClick,
  handleSelectAllIconClick,
  id,
  isPinned,
  isSearchInputShown,
  isSelectorMaximized,
  listItemsContent,
  position,
  reorderIconTooltipText,
  selectedListItemsContent,
  selectorStateNamespace,
  titleText,
  toggleListItemReorderMode,
  toggleShowSearchInput
}: Props) => {
  function scrollSelectedListItemsIntoView() {
    const selectedItemsDiv = document.getElementById(`${id}SelectedItems`);
    if (selectedItemsDiv != null) {
      selectedItemsDiv.scrollTop = 0;
    }
  }

  const titleContent = (
    <SelectorTitleActionsView
      iconClassName={styles.actionIcon}
      toggleShowSearchInput={_.flow(stopEventPropagation, toggleShowSearchInput)}
      toggleMaximizeSelector={handleMaximizeIconClick}
      shouldShowPinIcon={isPinned !== undefined}
      isPinned={isPinned}
      handlePinIconClick={handlePinIconClick}
      addIconTooltipText={addIconTooltipText}
      reorderIconTooltipText={reorderIconTooltipText}
      handleReorderIconClick={toggleListItemReorderMode}
      handleSelectAllIconClick={handleSelectAllIconClick}
    />
  );

  const selectorContent = (
    <>
      <div id={`${id}SelectedItems`}>{selectedListItemsContent ?? ''}</div>
      <SearchInputView
        className={styles2.searchInput}
        isShown={isSearchInputShown}
        onChange={(searchedValue: string) => changeSelectorSearchedValue(searchedValue)}
      />
      <div onClick={scrollSelectedListItemsIntoView}>{listItemsContent}</div>
    </>
  );

  return (
    <SelectorView
      id={id}
      isSelectorMaximized={isSelectorMaximized}
      titleText={titleText}
      titleContent={titleContent}
      position={position}
      selectorContent={selectorContent}
      selectorContentClassName={styles2.content}
      additionalContent={additionalContent}
      selectorStateNamespace={selectorStateNamespace}
      toggleMaximizeSelector={handleMaximizeIconClick}
    />
  );
};

SelectorWithTitleActionsView.defaultProps = {
  addIconTooltipText: undefined,
  additionalContent: undefined,
  handlePinIconClick: undefined,
  handleSelectAllIconClick: undefined,
  isPinned: undefined,
  reorderIconTooltipText: undefined,
  selectedListItemsContent: undefined
};

export default connect(
  controller.getState,
  _.memoize(
    (__, { selectorStateNamespace }: OwnProps) => controller.getActionDispatchers(selectorStateNamespace),
    (...args) => args[1].selectorStateNamespace
  )
)(SelectorWithTitleActionsView);
