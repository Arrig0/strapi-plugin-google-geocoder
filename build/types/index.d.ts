import { CustomFieldInputProps } from "strapi-typed";
export interface GoogleGeocoderInputProps extends CustomFieldInputProps {
    value: string | undefined;
    description?: any;
    config: {
        apiKey: string;
        types?: string[];
        componentRestrictions?: {
            country: string[];
        };
    };
}
