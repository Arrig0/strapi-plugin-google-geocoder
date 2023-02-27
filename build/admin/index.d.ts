import { StrapiAdminInstance } from "strapi-typed";
import { Iso6391 } from "./translations";
declare const _default: {
    register(app: StrapiAdminInstance): void;
    registerTrads({ locales }: {
        locales: Array<Iso6391>;
    }): Promise<{
        data: any;
        locale: string;
    }[]>;
};
export default _default;
