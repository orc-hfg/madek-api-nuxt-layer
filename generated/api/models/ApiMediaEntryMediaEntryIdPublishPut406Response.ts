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
 * @interface ApiMediaEntryMediaEntryIdPublishPut406Response
 */
export interface ApiMediaEntryMediaEntryIdPublishPut406Response {
    /**
     * 
     * @type {object}
     * @memberof ApiMediaEntryMediaEntryIdPublishPut406Response
     */
    message: object;
}

/**
 * Check if a given object implements the ApiMediaEntryMediaEntryIdPublishPut406Response interface.
 */
export function instanceOfApiMediaEntryMediaEntryIdPublishPut406Response(value: object): value is ApiMediaEntryMediaEntryIdPublishPut406Response {
    if (!('message' in value) || value['message'] === undefined) return false;
    return true;
}

export function ApiMediaEntryMediaEntryIdPublishPut406ResponseFromJSON(json: any): ApiMediaEntryMediaEntryIdPublishPut406Response {
    return ApiMediaEntryMediaEntryIdPublishPut406ResponseFromJSONTyped(json, false);
}

export function ApiMediaEntryMediaEntryIdPublishPut406ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiMediaEntryMediaEntryIdPublishPut406Response {
    if (json == null) {
        return json;
    }
    return {
        
        'message': json['message'],
    };
}

export function ApiMediaEntryMediaEntryIdPublishPut406ResponseToJSON(json: any): ApiMediaEntryMediaEntryIdPublishPut406Response {
    return ApiMediaEntryMediaEntryIdPublishPut406ResponseToJSONTyped(json, false);
}

export function ApiMediaEntryMediaEntryIdPublishPut406ResponseToJSONTyped(value?: ApiMediaEntryMediaEntryIdPublishPut406Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'message': value['message'],
    };
}

