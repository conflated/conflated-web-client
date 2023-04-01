import React from 'react';
import type { ListItemViewProps } from '../../../../../../../common/views/list/item/ListItemView';
import ListItemView from '../../../../../../../common/views/list/item/ListItemView';
import { ReportTemplateGroup } from '../../../../../model/state/types/ReportTemplateGroup';

const ReportTemplateGroupSelectorListItem = (props: ListItemViewProps<ReportTemplateGroup>) => (
  <ListItemView {...props} />
);

export default ReportTemplateGroupSelectorListItem;
