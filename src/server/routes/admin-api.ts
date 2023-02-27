'use strict';

export default {
  type: "admin",
  routes: [
    {
        method: "GET",
        path: "/config",
        handler: "google-geocoder.config",
        config: {
            policies: ["admin::isAuthenticatedAdmin"],
        },
    },
  ],
};

/*
module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/settings',
      handler: 'google-geocoder.getSettings',
      config: {
        policies: [
          'admin::isAuthenticatedAdmin',
          //{ name: 'admin::hasPermissions', config: { actions: ['plugin::google-geocoder.settings.read'] } },
        ],
        auth: false,
      },
    },
    {
        method: "GET",
        path: "/config",
        handler: "google-geocoder.config",
        config: {
            policies: ["admin::isAuthenticatedAdmin"],
        },
    },
  ],
};*/
