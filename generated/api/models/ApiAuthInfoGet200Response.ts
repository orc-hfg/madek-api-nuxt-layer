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
import type { ApiAuthInfoGet200ResponseData } from './ApiAuthInfoGet200ResponseData';
import {
    ApiAuthInfoGet200ResponseDataFromJSON,
    ApiAuthInfoGet200ResponseDataFromJSONTyped,
    ApiAuthInfoGet200ResponseDataToJSON,
    ApiAuthInfoGet200ResponseDataToJSONTyped,
} from './ApiAuthInfoGet200ResponseData';

/**
 * 
 * @export
 * @interface ApiAuthInfoGet200Response
 */
export interface ApiAuthInfoGet200Response {
    /**
     * 
     * @type {string}
     * @memberof ApiAuthInfoGet200Response
     */
    status: string;
    /**
     * 
     * @type {ApiAuthInfoGet200ResponseData}
     * @memberof ApiAuthInfoGet200Response
     */
    data: ApiAuthInfoGet200ResponseData;
}

/**
 * Check if a given object implements the ApiAuthInfoGet200Response interface.
 */
export function instanceOfApiAuthInfoGet200Response(value: object): value is ApiAuthInfoGet200Response {
    if (!('status' in value) || value['status'] === undefined) return false;
    if (!('data' in value) || value['data'] === undefined) return false;
    return true;
}

export function ApiAuthInfoGet200ResponseFromJSON(json: any): ApiAuthInfoGet200Response {
    return ApiAuthInfoGet200ResponseFromJSONTyped(json, false);
}

export function ApiAuthInfoGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiAuthInfoGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'],
        'data': ApiAuthInfoGet200ResponseDataFromJSON(json['data']),
    };
}

export function ApiAuthInfoGet200ResponseToJSON(json: any): ApiAuthInfoGet200Response {
    return ApiAuthInfoGet200ResponseToJSONTyped(json, false);
}

export function ApiAuthInfoGet200ResponseToJSONTyped(value?: ApiAuthInfoGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'status': value['status'],
        'data': ApiAuthInfoGet200ResponseDataToJSON(value['data']),
    };
}

