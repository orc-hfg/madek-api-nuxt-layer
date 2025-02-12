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
 * @interface ApiGroupsGet200Response
 */
export interface ApiGroupsGet200Response {
    /**
     * 
     * @type {Array<object>}
     * @memberof ApiGroupsGet200Response
     */
    groups: Array<object>;
}

/**
 * Check if a given object implements the ApiGroupsGet200Response interface.
 */
export function instanceOfApiGroupsGet200Response(value: object): value is ApiGroupsGet200Response {
    if (!('groups' in value) || value['groups'] === undefined) return false;
    return true;
}

export function ApiGroupsGet200ResponseFromJSON(json: any): ApiGroupsGet200Response {
    return ApiGroupsGet200ResponseFromJSONTyped(json, false);
}

export function ApiGroupsGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiGroupsGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'groups': json['groups'],
    };
}

export function ApiGroupsGet200ResponseToJSON(json: any): ApiGroupsGet200Response {
    return ApiGroupsGet200ResponseToJSONTyped(json, false);
}

export function ApiGroupsGet200ResponseToJSONTyped(value?: ApiGroupsGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'groups': value['groups'],
    };
}

