import {course_routes} from './course';
import {user_routes} from './user';
import { section_routes } from './section';

export const routes = [].concat(user_routes, course_routes, section_routes);