import { logInView } from './login.js';
import { profileView } from './profile.js';
import { timelineView } from './timeline.js';
import { registerView } from './register.js';
import { notFoundView } from './404.js';

const components = {
  logIn: logInView,
  profile: profileView,
  register: registerView,
  timeline: timelineView,
  notFound: notFoundView,
};

export { components };
