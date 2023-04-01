import React from 'react';
import type { ListItemViewProps } from '../../../../../../../common/views/list/item/ListItemView';
import ListItemView from '../../../../../../../common/views/list/item/ListItemView';
import { ReportTemplate } from '../../../../../model/state/types/ReportTemplate';

const ReportTemplateSelectorListItemView = (props: ListItemViewProps<ReportTemplate>) => <ListItemView {...props} />;

export default ReportTemplateSelectorListItemView;
