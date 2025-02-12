/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI
 * OpenAPI
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ApiMetaKeysIdGet404Response
 */
export interface ApiMetaKeysIdGet404Response {
    /**
     * 
     * @type {string}
     * @memberof ApiMetaKeysIdGet404Response
     */
    message: string;
}

/**
 * Check if a given object implements the ApiMetaKeysIdGet404Response interface.
 */
export function instanceOfApiMetaKeysIdGet404Response(value: object): value is ApiMetaKeysIdGet404Response {
    if (!('message' in value) || value['message'] === undefined) return false;
    return true;
}

export function ApiMetaKeysIdGet404ResponseFromJSON(json: any): ApiMetaKeysIdGet404Response {
    return ApiMetaKeysIdGet404ResponseFromJSONTyped(json, false);
}

export function ApiMetaKeysIdGet404ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiMetaKeysIdGet404Response {
    if (json == null) {
        return json;
    }
    return {
        
        'message': json['message'],
    };
}

export function ApiMetaKeysIdGet404ResponseToJSON(json: any): ApiMetaKeysIdGet404Response {
    return ApiMetaKeysIdGet404ResponseToJSONTyped(json, false);
}

export function ApiMetaKeysIdGet404ResponseToJSONTyped(value?: ApiMetaKeysIdGet404Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'message': value['message'],
    };
}

