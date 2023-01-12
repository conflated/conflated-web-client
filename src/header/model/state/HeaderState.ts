import type { DragType } from './types/DragType';
import type { PageStateNamespace } from '../../../common/components/page/model/state/namespace/PageStateNamespace';

export type HeaderState = {
  readonly currentPage: PageStateNamespace;
  readonly isFullScreenModeActive: boolean;
  readonly isFullScreenModeNotificationDismissed: boolean;
  readonly shouldShowFullScreenModeNotification: boolean;
  readonly lastDragType?: DragType;
};
