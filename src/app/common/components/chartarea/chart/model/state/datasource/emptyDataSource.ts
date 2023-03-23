import { DataSource } from './DataSource';

const emptyDataSource = {
  type: 'aggregated',
  name: '',
  jdbcDriverClass: '',
  jdbcUrl: '',
  authentication: {
    user: '',
    password: ''
  },
  sqlStatement: ''
} as DataSource;

export default emptyDataSource;
