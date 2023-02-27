declare const getAddress: (address_components: any) => {
    home: string;
    postal_code: string;
    street: string;
    region: string;
    city: string;
    country: string;
};
export default getAddress;
