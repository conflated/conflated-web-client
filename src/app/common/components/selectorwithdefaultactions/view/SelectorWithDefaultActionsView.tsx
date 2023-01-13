import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import styles2 from './SelectorWithDefaultActionsView.module.scss';
import styles from '../../selector/view/SelectorView.module.scss';
import SearchInputView from '../../../view/searchinput/SearchInputView';
import TitleDefaultActionsView from './titledefaultactions/TitleDefaultActionsView';
import type { AppState } from '../../../../../store/AppState';
import SelectorWithDefaultActionsControllerFactory from '../controller/SelectorWithDefaultActionsControllerFactory';
import SelectorView from '../../selector/view/SelectorView';
import type { SelectorWithDefaultActionsStateNamespace } from '../model/state/namespace/SelectorWithDefaultActionsStateNamespace';

type OwnProps = {
  additionalContent?: JSX.Element | null;
  handleMaximizeIconClick: (event: React.MouseEvent<HTMLElement>) => void;
  handlePinIconClick?: (event: React.MouseEvent<HTMLElement>) => void;
  id: string;
  isPinned?: boolean;
  listItemsContent: JSX.Element | Array<JSX.Element> | null;
  selectedListItemsContent?: JSX.Element | void;
  selectorStateNamespace: SelectorWithDefaultActionsStateNamespace;
  titleText: string;
};

const mapAppStateToComponentProps = (appState: AppState, { selectorStateNamespace }: OwnProps) => ({
  ...appState.common.selectorWithDefaultActionsStates[selectorStateNamespace]
});

const createController = (dispatch: Dispatch, { selectorStateNamespace }: OwnProps) =>
  new SelectorWithDefaultActionsControllerFactory(dispatch, selectorStateNamespace).createController();

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = OwnProps & MappedState & Controller;

function SelectorWithDefaultActionsView({
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
}: Props) {
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
    <TitleDefaultActionsView
      iconClassName={styles.actionIcon}
      toggleShowSearchInput={handleSearchIconClick}
      toggleMaximizeAccordion={handleMaximizeIconClick}
      shouldShowPinIcon={isPinned !== undefined}
      isPinned={isPinned}
      handlePinIconClick={handlePinIconClick}
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
}

export default connect(mapAppStateToComponentProps, createController)(SelectorWithDefaultActionsView);
