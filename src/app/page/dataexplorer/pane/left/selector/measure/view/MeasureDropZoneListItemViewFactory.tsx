import React from 'react';
import { List } from 'semantic-ui-react';
import { MeasureVisualizationType } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/MeasureVisualizationType';

export default class MeasureDropZoneListItemViewFactory {
  constructor(
    private className: string,
    private enterDropZone: (event: React.DragEvent<HTMLDivElement>) => void,
    private leaveDropZone: (event: React.DragEvent<HTMLDivElement>) => void,
    private dropMeasure: (event: React.DragEvent<HTMLDivElement>, visualizationType: MeasureVisualizationType) => void
  ) {}

  createMeasureDropZoneListItem(
    key: string,
    visualizationType: MeasureVisualizationType,
    visualizationTypeUiText?: string
  ): JSX.Element {
    const dropZoneTitle = `Drag ${visualizationTypeUiText || visualizationType} here`;

    return (
      <div
        key={key}
        className={this.className}
        onDragOver={this.enterDropZone}
        onDragLeave={this.leaveDropZone}
        onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropMeasure(event, visualizationType)}
      >
        <List.Item>{dropZoneTitle}</List.Item>
      </div>
    );
  }
}
