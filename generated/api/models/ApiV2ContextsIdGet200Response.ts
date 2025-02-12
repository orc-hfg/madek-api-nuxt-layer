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
 * @interface ApiV2ContextsIdGet200Response
 */
export interface ApiV2ContextsIdGet200Response {
    /**
     * 
     * @type {string}
     * @memberof ApiV2ContextsIdGet200Response
     */
    id: string;
    /**
     * 
     * @type {object}
     * @memberof ApiV2ContextsIdGet200Response
     */
    labels: object | null;
    /**
     * 
     * @type {object}
     * @memberof ApiV2ContextsIdGet200Response
     */
    descriptions: object | null;
}

/**
 * Check if a given object implements the ApiV2ContextsIdGet200Response interface.
 */
export function instanceOfApiV2ContextsIdGet200Response(value: object): value is ApiV2ContextsIdGet200Response {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('labels' in value) || value['labels'] === undefined) return false;
    if (!('descriptions' in value) || value['descriptions'] === undefined) return false;
    return true;
}

export function ApiV2ContextsIdGet200ResponseFromJSON(json: any): ApiV2ContextsIdGet200Response {
    return ApiV2ContextsIdGet200ResponseFromJSONTyped(json, false);
}

export function ApiV2ContextsIdGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiV2ContextsIdGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'labels': json['labels'],
        'descriptions': json['descriptions'],
    };
}

export function ApiV2ContextsIdGet200ResponseToJSON(json: any): ApiV2ContextsIdGet200Response {
    return ApiV2ContextsIdGet200ResponseToJSONTyped(json, false);
}

export function ApiV2ContextsIdGet200ResponseToJSONTyped(value?: ApiV2ContextsIdGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'labels': value['labels'],
        'descriptions': value['descriptions'],
    };
}

