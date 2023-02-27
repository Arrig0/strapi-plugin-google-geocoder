'use strict';

import { Strapi } from "@strapi/strapi";
import utils from '@strapi/utils';
import pluginId from '../utils/pluginId';

const { ApplicationError } = utils.errors;

//const getService = (name) => strapi.plugin('google-geocoder').service(name);

export default ({ strapi }: { strapi: Strapi }) => ({
  async config(ctx: any) {
    try {
      //const config = await getService("plugin").getConfig();
      const config = await strapi.plugin(`${pluginId}`).service('plugin').getConfig();
      ctx.send(config);
    } catch (e: any) {
      if (e.statusCode === 400) {
        throw new ApplicationError(e.message);
      } else {
        throw new Error(`Errore ${e.message}.`);
      }
    }
  },  
});


/*
//const { isNil, pick } = require('lodash/fp');
const { ApplicationError } = require('@strapi/utils').errors;

//import pluginId from "../utils/plugin-id";
//import pluginPkg from "../../package.json";
//const pluginId = pluginPkg.strapi.name

//const getService = (name: string) => strapi.plugin(pluginId).service(name);
const getService = (name) => strapi.plugin('google-geocoder').service(name);

 module.exports = ({ strapi }) => ({
  async send(ctx) {
    const options = ctx.request.body;

    try {
      //await strapi.plugin('google-geocoder').service('geocode').send(options);
    } catch (e) {
      if (e.statusCode === 400) {
        throw new ApplicationError(e.message);
      } else {
        throw new Error(`Errore ${e.message}.`);
      }
    }

    // Send 200 `ok`
    ctx.send({});
  },

  async getSettings(ctx) {
    const apiKey = strapi.plugin('google-geocoder').config('apiKey')

    ctx.send({
      config: {
        apiKey: apiKey
      }
    });

    //const config = strapi.plugin('google-geocoder').service('geocode').getProviderSettings();

    //ctx.send({
    //  config: pick(
    //    ['apiKey'],
    //    config
    //  ),
    //});
  },
  async config(ctx) {
    console.log('in controller');
    const config = await getService("plugin").getConfig();
    ctx.send(config);
  },
}); */

