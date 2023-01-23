import React from 'react';
import { Popup } from 'semantic-ui-react';
import classNames from 'classnames';
import styles from '../ChartIcons.module.scss';
import type { ChartType } from '../../../../../../../common/components/chartarea/chart/model/state/types/ChartType';

type Props = {
  chartType: ChartType;
  content: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  iconClassName: any;
  notifyDragEnd: () => void;
  notifyDragStart: () => void;
  selectedChartType: ChartType;
  selectChartType: (chartType: ChartType) => void;
  tooltipText: string;
};

const ChartIcon: React.FC<Props> = ({
  chartType,
  content,
  iconClassName,
  notifyDragEnd,
  notifyDragStart,
  selectChartType,
  selectedChartType,
  tooltipText
}: Props) => {
  function onDragStart(event: React.DragEvent<HTMLSpanElement>) {
    event.dataTransfer.setData('chartType', chartType);
    notifyDragStart();
  }

  const className = classNames(iconClassName, { [styles.selected]: chartType === selectedChartType });

  return (
    <Popup
      trigger={
        <span
          className={className}
          draggable
          onDragStart={onDragStart}
          onDragEnd={notifyDragEnd}
          onClick={() => selectChartType(chartType)}
        >
          {content}
        </span>
      }
      content={tooltipText}
      inverted
    />
  );
};

ChartIcon.defaultProps = {
  content: null
};
