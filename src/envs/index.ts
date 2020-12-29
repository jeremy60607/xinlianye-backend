import {envs} from './environment';

const init = () => {
  Object.keys(envs).forEach(key => {
    process.env[key] = String(envs[key]);
  });
};

init();
