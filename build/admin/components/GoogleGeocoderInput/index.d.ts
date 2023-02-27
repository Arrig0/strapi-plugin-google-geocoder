import { CustomFieldInputProps } from "strapi-typed";
interface GoogleGeocoderInputProps extends CustomFieldInputProps {
    value: string | undefined;
    description?: any;
    config: {
        apiKey: string;
    };
}
declare const GoogleGeocoderInput: (props: GoogleGeocoderInputProps) => JSX.Element | null;
export default GoogleGeocoderInput;
