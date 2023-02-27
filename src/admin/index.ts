import { prefixPluginTranslations } from '@strapi/helper-plugin';
import { StrapiAdminInstance } from "strapi-typed";
import pluginId from './pluginId';
import pluginPermissions from './permissions';
import reducers from "./reducers";
import getTrad from './utils/getTrad';
import GoogleGeocoderIcon from './components/GoogleGeocoderIcon';
import { Iso6391 } from "./translations";

//import * as it from "./translations/it.json";
import * as en from "./translations/en.json";

const googleFields = [
  "country",
  "region",
  "city",
  "street",
  "home",
  "postalcode",
  "latitude",
  "longitude",
];

let advancedItems: any[] = [];

googleFields.forEach(function (field) {
  //console.log(`google-geocoder.options.advanced.${field}-field`, getTrad(`google-geocoder.options.advanced.${field}-field`))
  advancedItems.push(
    {
      name: `options.${field}_field_name`,
      type: 'text',
      intlLabel: {
        id: getTrad(`google-geocoder.options.advanced.${field}-field`),
        defaultMessage: `${field} field name`,
      },
      description: {
        id: getTrad(`google-geocoder.options.advanced.${field}-field.description`),
        defaultMessage: `Insert the name of the "${field}" field to be auto populated`,
      },
    }
  )
}); 

export default {
  register(app: StrapiAdminInstance) {
    app.customFields.register({
      name: 'coordinates',
      pluginId: 'google-geocoder',
      type: 'string',
      icon: GoogleGeocoderIcon,
      intlLabel: {
        id: getTrad('google-geocoder.label'),
        defaultMessage: 'Google Addresss',
      },
      intlDescription: {
        id: getTrad('google-geocoder.description'),
        defaultMessage: 'enter an address and automatically geocode it',
      },
      components: {
        Input: async () =>
          import('./components/GoogleGeocoderInput'),
      },
      options: {
        base: [],
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: advancedItems,
          },
        ],
        validator: () => ({}),
      },
    });
    app.addReducers(reducers);
  },
  async registerTrads({ locales }: { locales: Array<Iso6391> }) {
    console.log('called registerTrads', locales);
    const importedTrads = await Promise.all(
      locales.map((locale: string) => {

        return {
          data: prefixPluginTranslations(en, pluginId),
          locale,
        };
        
        /*
        //
        // NON FUNZIONA, COMPILANDO TS non riesco ad importare i JSON
        //
        return import(
          `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            console.log('data is', data);
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch((e) => {
            console.log('fired catch', e);
            return {
              data: {},
              locale,
            };
          });
          */
      })
    );

    return Promise.resolve(importedTrads);
  },
};
