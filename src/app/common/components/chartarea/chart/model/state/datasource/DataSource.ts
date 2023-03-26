type DataSourceType = 'raw' | 'aggregated';

export type DataSource = {
  type: DataSourceType;
  name: string;
  labels: string[];
  jdbcDriverClass: string;
  jdbcUrl: string;
  authentication: {
    user: string;
    password: string;
  };
  sqlStatement: string;
};
