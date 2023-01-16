import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import DashboardGroupListItem from './dashboardgrouplistitem/DashboardGroupListItem';
import type { AppState } from '../../../../../../store/AppState';
import DashboardGroupSelectorControllerFactory from '../controller/DashboardGroupSelectorControllerFactory';
import SelectorWithDefaultActionsView from '../../../../../common/components/selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import selectShownDashboardGroups from '../model/state/selectors/selectShownDashboardGroups';
import type { DashboardGroup } from '../../../model/state/entities/DashboardGroup';
import AllAndFavoritesTabView from '../../../../../common/view/allandfavoritestabview/AllAndFavoritesTabView';
import DashboardsPageControllerFactory from '../../../controller/DashboardsPageControllerFactory';
import SelectorWithDefaultActionsController from '../../../../../common/components/selectorwithdefaultactions/selectorWithDefaultActionsController';

const mapAppStateToComponentProps = (appState: AppState) => ({
  shownDashboardGroups: selectShownDashboardGroups(appState),
  selectedDashboardGroup: appState.dashboardsPage.dashboardsState.selectedDashboardGroup,
  isDashboardSelectorOpen: appState.common.selectorStates.dashboardSelector.isSelectorOpen
});

const createController = (dispatch: Dispatch) => ({
  toggleMaximizeSelector: new SelectorWithDefaultActionsController(
    dispatch,
    'dashboardGroupSelector'
  ).createController().toggleMaximizeSelector,

  showDashboardGroup: new DashboardsPageControllerFactory(dispatch).createController().showDashboardGroup,
  ...new DashboardGroupSelectorControllerFactory(dispatch).createController()
});

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function DashboardGroupSelectorView({
  isDashboardSelectorOpen,
  selectedDashboardGroup,
  showDashboardGroup,
  shownDashboardGroups,
  toggleMaximizeSelector,
  toggleShouldShowDashboardsPageLeftPanePermanently
}: Props) {
  const handleMaximizeIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isDashboardSelectorOpen,
          stateNamespace: 'dashboardSelector'
        }
      ]);
    },
    [isDashboardSelectorOpen, toggleMaximizeSelector]
  );

  const handlePinIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();
      toggleShouldShowDashboardsPageLeftPanePermanently();
    },
    [toggleShouldShowDashboardsPageLeftPanePermanently]
  );

  const dashboardGroupListItems = useMemo(
    () =>
      shownDashboardGroups.map((dashboardGroup: DashboardGroup) => (
        <DashboardGroupListItem
          key={dashboardGroup.name}
          item={dashboardGroup}
          selectedItem={selectedDashboardGroup}
          onItemClick={showDashboardGroup}
        />
      )),
    [shownDashboardGroups, selectedDashboardGroup, showDashboardGroup]
  );

  return (
    <SelectorWithDefaultActionsView
      id="dashboardGroupSelector"
      titleText="DASHBOARD GROUP"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={dashboardGroupListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      handlePinIconClick={handlePinIconClick}
      selectorStateNamespace="dashboardGroupSelector"
    />
  );
}

export default connect(mapAppStateToComponentProps, createController)(DashboardGroupSelectorView);
