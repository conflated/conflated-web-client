type DataSourceType = 'raw' | 'aggregated';

export type DataSource = {
  type: DataSourceType;
  name: string;
  jdbcDriverClass: string;
  jdbcUrl: string;
  authentication: {
    user: string;
    password: string;
  };
  sqlStatement: string;
};
