import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import styles2 from './SelectorWithActionsView.module.scss';
import styles from '../../view/SelectorView.module.scss';
import SearchInputView from '../../../../views/input/searchinput/SearchInputView';
import SelectorActionsView from './actions/SelectorActionsView';
import SelectorView from '../../view/SelectorView';
import type { SelectorWithActionsStateNamespace } from '../model/state/types/SelectorWithActionsStateNamespace';
import { ActionDispatchers, controller, State } from '../controller/selectorWithActionsController';
import stopEventPropagation from '../../../../utils/stopEventPropagation';

export type OwnProps = {
  addIconTooltipText?: string;
  additionalContent?: JSX.Element;
  handleMaximizeIconClick: (event: React.MouseEvent<HTMLElement>) => void;
  handlePinIconClick?: (event: React.MouseEvent<HTMLElement>) => void;
  handleSelectAllIconClick?: () => void;
  id: string;
  isPinned?: boolean;
  listItemsContent: JSX.Element | Array<JSX.Element> | null;
  position: 'leftPane' | 'rightPane';
  reorderIconTooltipText?: string;
  selectedListItemsContent?: JSX.Element;
  selectorStateNamespace: SelectorWithActionsStateNamespace;
  titleText: string;
};

type Props = OwnProps & ActionDispatchers & State;

const SelectorWithActionsView: React.FC<Props> = ({
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
    <SelectorActionsView
      iconClassName={styles.actionIcon}
      position={position}
      toggleShowSearchInput={_.flow(stopEventPropagation, toggleShowSearchInput)}
      toggleMaximizeAccordion={handleMaximizeIconClick}
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
    />
  );
};

SelectorWithActionsView.defaultProps = {
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
)(SelectorWithActionsView);
