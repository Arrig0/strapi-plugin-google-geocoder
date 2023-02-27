'use strict';

import register from "./register";
import bootstrap from "./bootstrap";
import destroy from "./destroy";
import config from "./config";
//import contentTypes from "./content-types";
import controllers from "./controllers";
import routes from "./routes";
//import middlewares from "./middlewares";
//import policies from "./policies";
import services from "./services";

export default {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  //contentTypes,
  //policies,
  //middlewares,    
};

/*
const register = require('./register');
const bootstrap = require('./bootstrap');
const destroy = require('./destroy');
const config = require('./config');
//import config from "./config";
//const contentTypes = require('./content-types');
const controllers = require('./controllers');
const routes = require('./routes');
//const middlewares = require('./middlewares');
//const policies = require('./policies');
const services = require('./services');

module.exports = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  //contentTypes,
  //policies,
  //middlewares,
};*/
