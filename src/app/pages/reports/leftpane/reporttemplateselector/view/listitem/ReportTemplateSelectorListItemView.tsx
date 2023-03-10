import React from 'react';
import type { ListItemViewProps } from '../../../../../../common/view/listitems/listitem/ListItemView';
import ListItemView from '../../../../../../common/view/listitems/listitem/ListItemView';
import { ReportTemplate } from '../../../../model/state/types/ReportTemplate';

const ReportTemplateSelectorListItemView = (props: ListItemViewProps<ReportTemplate>) => <ListItemView {...props} />;

export default ReportTemplateSelectorListItemView;
