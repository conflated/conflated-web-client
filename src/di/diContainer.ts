import { Container } from 'noicejs';
import ServiceModule from './modules/ServiceModule';

const diContainer = Container.from(new ServiceModule());

export default diContainer;
