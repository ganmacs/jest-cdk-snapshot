import { Stack, SynthesisOptions } from "@aws-cdk/core";
declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchCdkSnapshot(options?: Options): R;
        }
    }
}
declare type Options = SynthesisOptions & {
    /**
     * Output snapshots in YAML (instead of JSON)
     */
    yaml?: boolean;
    /**
     * Ignore Assets
     */
    ignoreAssets?: boolean;
    /**
     * Ignore Lambda Current Version
     */
    ignoreCurrentVersion?: boolean;
    /**
     * Match only resources of given types
     */
    subsetResourceTypes?: string[];
    /**
     * Match only resources of given keys
     */
    subsetResourceKeys?: string[];
    propertyMatchers?: {
        [property: string]: unknown;
    };
};
export declare const toMatchCdkSnapshot: (this: any, received: Stack, options?: Options) => {
    message: () => string;
    name: string;
    pass: boolean;
    actual?: undefined;
    expected?: undefined;
} | {
    message: () => string;
    pass: boolean;
    name?: undefined;
    actual?: undefined;
    expected?: undefined;
} | {
    actual: string;
    expected: string | undefined;
    message: () => string;
    name: string;
    pass: boolean;
};
export {};
