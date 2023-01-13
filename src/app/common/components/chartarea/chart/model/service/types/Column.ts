export type ColumnType = 'measure' | 'dimension';

export type Column = {
  name: string;
  expression: string;
  type: ColumnType;
};
