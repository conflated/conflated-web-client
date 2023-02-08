import type { Pane } from './types/Pane';

type PaneStates = { readonly [K in Pane]: boolean };
type PaneValues = { readonly [K in Pane]: number };

export type PageState = {
  readonly shouldShowPagePaneActivatorHint: PaneStates;
  readonly shouldShowPagePane: PaneStates;
  readonly shouldShowPagePanePermanently: PaneStates;
  readonly pagePaneGutterOffset: PaneValues;
  readonly pagePaneGutterPositionOnDragStart: PaneValues;
};
