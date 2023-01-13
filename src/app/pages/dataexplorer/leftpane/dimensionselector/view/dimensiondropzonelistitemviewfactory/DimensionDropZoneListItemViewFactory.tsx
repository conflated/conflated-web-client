import React from 'react';
import { List } from 'semantic-ui-react';
import type { DimensionVisualizationType } from '../../../../../../common/components/chartarea/chart/model/state/selecteddimension/types/DimensionVisualizationType';

export default class DimensionDropZoneListItemViewFactory {
  constructor(
    private className: string,
    private enterDropZone: (event: React.DragEvent<HTMLDivElement>) => void,
    private leaveDropZone: (event: React.DragEvent<HTMLDivElement>) => void,
    private dropDimension: (
      event: React.DragEvent<HTMLDivElement>,
      visualizationType: DimensionVisualizationType
    ) => void
  ) {}

  createDimensionDropZoneListItem(
    key: string,
    visualizationType: DimensionVisualizationType,
    visualizationTypeUiText?: string
  ): JSX.Element {
    const dropZoneTitle = `Drag ${visualizationTypeUiText || visualizationType} here`;

    return (
      <div
        key={key}
        className={this.className}
        onDragOver={this.enterDropZone}
        onDragLeave={this.leaveDropZone}
        onDrop={(event: React.DragEvent<HTMLDivElement>) => this.dropDimension(event, visualizationType)}
      >
        <List.Item>{dropZoneTitle}</List.Item>
      </div>
    );
  }
}
