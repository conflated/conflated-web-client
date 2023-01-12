export type DataSource = {
  name: string;
  jdbcDriverClass: string;
  jdbcUrl: string;
  authentication: {
    user: string;
    password: string;
  };
  sqlStatement: string;
};
