import React, { useState, useRef, useEffect } from 'react';
//import PropTypes from 'prop-types';
import {
  useCMEditViewDataManager,
  useNotification
} from '@strapi/helper-plugin';
import { useNotifyAT } from '@strapi/design-system/LiveRegions';
import { Stack } from '@strapi/design-system/Stack';
import { Flex } from '@strapi/design-system/Flex';
import { Link } from '@strapi/design-system/Link';
import { Typography } from '@strapi/design-system/Typography';
import { Field, FieldHint, FieldError, FieldLabel, FieldInput } from '@strapi/design-system/Field';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
//import GoogleMapReact from 'google-map-react';
//import Marker from '../Marker';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';
import getAddress from '../../utils/getAddress';
import usePluginConfig from "../../hooks/use-plugin-config";
import { GoogleGeocoderInputProps } from "../../../types";
import { Box } from "@strapi/design-system/Box";
import { Status } from "@strapi/design-system";

// https://bobbyhadz.com/blog/javascript-split-last-occurrence
function splitLastOccurrence(str, substring) {
  const lastIndex = str.lastIndexOf(substring);

  const before = str.slice(0, lastIndex);

  const after = str.slice(lastIndex + 1);

  return [before, after];
}

const fields = [
  'country',
  'region',
  'city',
  'street',
  'home',
  'postal_code',
];

const GeocoderInput: React.FC<GoogleGeocoderInputProps> = ({
    value,
    onChange,
    name,
    intlLabel,
    labelAction,
    required,
    attribute,
    description,
    placeholder,
    disabled,
    error,
    config: { apiKey, types, componentRestrictions },
}) => {
  
    // todo: make works also in (dynamic zone component)
    // name is: address (single field) or neighborhoods.0.address (dynamic zone component)
    
    console.log('Google apiKey', apiKey);
    console.log('Field name', name);
    console.log('Field attribute', attribute);
  
    const { initialData, modifiedData, onChange: onCMChange  } = useCMEditViewDataManager();
    const toggleNotification = useNotification();
    const { formatMessage } = useIntl();
    const { notifyStatus } = useNotifyAT();
    
    const [componentName, fieldName] = name.includes('.') ? splitLastOccurrence(name, '.') : ['', name];    

    const maybeUpdateOtherFields = (place) => {
      
      const isGoogleAutocompleteResponse = Object.hasOwn(place, 'address_components') ? true : false;
      
      if( !isGoogleAutocompleteResponse ) {
          console.log('No Google Address selected. Skip.');
          return;
      }

      const parsed = getAddress(place.address_components);

      console.log('Check if there are fields to automatically update for place')
      //console.log('place', place)
      //console.log('place parsed', parsed)
      //console.log('latitude', place.geometry.location.lat())
      //console.log('longitude', place.geometry.location.lng())

      if( attribute['options']['latitude_field_name'] ) {
        const realFieldName = (componentName === '') ? attribute['options']['latitude_field_name'] : `${componentName}.` + attribute['options']['latitude_field_name'];
        console.log('updating', realFieldName, place.geometry.location.lat())
        onCMChange({
          target: { name: realFieldName, value: place.geometry.location.lat() },
        })
      }

      if( attribute['options']['longitude_field_name'] ) {
        const realFieldName = (componentName === '') ? attribute['options']['longitude_field_name'] : `${componentName}.` + attribute['options']['longitude_field_name'];
        console.log('updating', realFieldName, place.geometry.location.lng())
        onCMChange({
          target: { name: realFieldName, value: place.geometry.location.lng() },
        })
      }

      fields.forEach((field) => {
        if( attribute['options'][`${field}_field_name`] ) {
          const realFieldName = (componentName === '') ? attribute['options'][`${field}_field_name`] : `${componentName}.` + attribute['options'][`${field}_field_name`];
          console.log('updating', realFieldName, parsed[field])
          onCMChange({
            target: { name: realFieldName, value: parsed[field] },
          })
        }
      })
    }

    const { ref } = usePlacesWidget({
        apiKey: apiKey,
        onPlaceSelected: (place) => {
            onChange?.({
              target: {
                  name,
                  value: place.formatted_address,
                  type: attribute.type, //'string',
              }
            })
            maybeUpdateOtherFields(place)
        },
        // these option should be from config
        options: {
          types: types, //["geocode"], // neighborhood etc -> https://developers.google.com/maps/documentation/javascript/place-autocomplete#constrain-place-types
          componentRestrictions: componentRestrictions /*{
            country: ["it"]
          }*/
        }
    });

    return (
        <Field
            name={name}
            id={name}
            error={error}
            hint={description && formatMessage(description)}
        >
            <Stack spacing={1}>
                <Flex>
                    <FieldLabel action={labelAction} required={required}>
                        {formatMessage(intlLabel)}
                    </FieldLabel>

                    <Flex width="100%" justifyContent="flex-end">
                      <Link href={`https://www.google.com/maps/search/?api=1&query=${value}`}>
                          link to map here
                      </Link>
                    </Flex>
                </Flex>
                <FieldInput
                  ref={ref}
                  placeholder={placeholder} 
                  aria-label={formatMessage(intlLabel)}
                  aria-disabled={disabled}
                  disabled={disabled}
                  value={value}
                  onChange={onChange}
                />
                <FieldHint />
                <FieldError />
            </Stack>
        </Field>

    );
}


const GoogleGeocoderInput = (props: GoogleGeocoderInputProps) => {
  
    // example -> name is: address (single field) or neighborhoods.0.address (dynamic zone component)
  
    const { config , isConfigLoading } = usePluginConfig();
    
    return config && config.apiKey ? (
        <GeocoderInput {...props} config={config} />
    ) : (!isConfigLoading && !config.apiKey) ? (
        <>
            <FieldLabel>{props.name}</FieldLabel>
            <Box paddingTop="1">
                <Status variant="warning" size="S" showBullet={false}>
                    <Typography>
                        <Typography>
                            Missing: {!config.apiKey && <Typography fontWeight="bold">apiKey</Typography>}
                        </Typography>
                    </Typography>
                    <br />
                    <Link href="https://github.com/spalz/strapi-plugin-google-map-picker" isExternal>
                        Installation Instructions (GitHub)
                    </Link>
                </Status>
            </Box>
        </>
    ) : null;
    
};

export default GoogleGeocoderInput;
