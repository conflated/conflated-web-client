import React from 'react';
import type { ListItemViewProps } from '../../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../../common/view/listitems/listitem/ListItemView';
import { ReportTemplateGroup } from '../../../../model/state/types/ReportTemplateGroup';

const ReportTemplateGroupSelectorListItem = (props: ListItemViewProps<ReportTemplateGroup>) => (
  <ListItemView {...props} />
);

export default ReportTemplateGroupSelectorListItem;
