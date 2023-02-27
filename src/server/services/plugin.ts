"use strict";

import { Strapi } from "@strapi/strapi";
import config from "../config";
import pluginId from '../utils/pluginId';

export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀. Using plugin google-geocoder.';
  },
  getConfig() {
    //console.log(strapi.plugin('google-geocoder').config('apiKey'));
    //console.log(strapi.config.get("plugin.google-geocoder"));
    //console.log(strapi.config.get("plugin.google-geocoder", config.default));
    
    const data = strapi.config.get(`plugin.${pluginId}`, config.default)
    return data;
  },
});


/*
//import config from "../config";
const config = require('../config');
//import pluginId from "../utils/plugin-id";
//import pluginPkg from "../../package.json";
//const pluginId = pluginPkg.strapi.name

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀. Using plugin google-geocoder.';
  },
  getConfig() {
    //console.log(strapi.plugin('google-geocoder').config('apiKey'));
    //console.log(strapi.config.get("plugin.google-geocoder"));
    //console.log(strapi.config.get("plugin.google-geocoder", config.default));
    
    const data = strapi.config.get("plugin.google-geocoder", config.default) //await strapi.config.get(//`plugin.${pluginId}`//"google-geocoder", config.default);
    return data;
  },
});*/
