"use strict";

import { Strapi } from "@strapi/strapi";

//import pluginId from "./utils/plugin-id";
const pluginId = 'google-geocoder';

export default ({ strapi }: { strapi: Strapi }) => {
  // registeration phase
  strapi.customFields.register({
      name: "coordinates",
      plugin: pluginId,
      type: "string",
      // apiKey: strapi.plugin(pluginId).config("apiKey"),
      // defaultCenter: strapi.plugin(pluginId).config("defaultCenter"),
  });
};

/*
module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: 'coordinates',
    plugin: 'google-geocoder',
    type: 'string',
  });
};*/
