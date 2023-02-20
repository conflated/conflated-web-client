import _ from 'lodash';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import styles2 from './SelectorWithActionsView.module.scss';
import styles from '../../selector/view/SelectorView.module.scss';
import SearchInputView from '../../../view/searchinput/SearchInputView';
import ActionsView from './actions/ActionsView';
import SelectorView from '../../selector/view/SelectorView';
import type { SelectorWithActionsStateNamespace } from '../model/state/types/SelectorWithActionsStateNamespace';
import { ActionDispatchers, controller, State } from '../controller/selectorWithActionsController';

export type OwnProps = {
  addIconTooltipText: string;
  additionalContent?: JSX.Element;
  handleMaximizeIconClick: (event: React.MouseEvent<HTMLElement>) => void;
  handlePinIconClick?: (event: React.MouseEvent<HTMLElement>) => void;
  id: string;
  isPinned?: boolean;
  listItemsContent: JSX.Element | Array<JSX.Element> | null;
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
  id,
  isPinned,
  isSearchInputShown,
  isSelectorMaximized,
  listItemsContent,
  selectedListItemsContent,
  selectorStateNamespace,
  titleText,
  toggleShowSearchInput
}: Props) => {
  const handleSearchIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();
      toggleShowSearchInput();
    },
    [toggleShowSearchInput]
  );

  function scrollSelectedListItemsIntoView() {
    const selectedItemsDiv = document.getElementById(`${id}SelectedItems`);
    if (selectedItemsDiv != null) {
      selectedItemsDiv.scrollTop = 0;
    }
  }

  const titleContent = (
    <ActionsView
      iconClassName={styles.actionIcon}
      toggleShowSearchInput={handleSearchIconClick}
      toggleMaximizeAccordion={handleMaximizeIconClick}
      shouldShowPinIcon={isPinned !== undefined}
      isPinned={isPinned}
      handlePinIconClick={handlePinIconClick}
      addIconTooltipText={addIconTooltipText}
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
      selectorContent={selectorContent}
      selectorContentClassName={styles2.content}
      additionalContent={additionalContent}
      selectorStateNamespace={selectorStateNamespace}
    />
  );
};

SelectorWithActionsView.defaultProps = {
  additionalContent: undefined,
  handlePinIconClick: undefined,
  isPinned: undefined,
  selectedListItemsContent: undefined
};

export default connect(controller.getState, _.memoize(controller.getActionDispatchers))(SelectorWithActionsView);
