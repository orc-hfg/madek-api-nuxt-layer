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
 * @interface ApiV2FavoriteMediaEntriesGet200Response
 */
export interface ApiV2FavoriteMediaEntriesGet200Response {
    /**
     * 
     * @type {Array<string>}
     * @memberof ApiV2FavoriteMediaEntriesGet200Response
     */
    mediaEntryIds: Array<string>;
}

/**
 * Check if a given object implements the ApiV2FavoriteMediaEntriesGet200Response interface.
 */
export function instanceOfApiV2FavoriteMediaEntriesGet200Response(value: object): value is ApiV2FavoriteMediaEntriesGet200Response {
    if (!('mediaEntryIds' in value) || value['mediaEntryIds'] === undefined) return false;
    return true;
}

export function ApiV2FavoriteMediaEntriesGet200ResponseFromJSON(json: any): ApiV2FavoriteMediaEntriesGet200Response {
    return ApiV2FavoriteMediaEntriesGet200ResponseFromJSONTyped(json, false);
}

export function ApiV2FavoriteMediaEntriesGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiV2FavoriteMediaEntriesGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'mediaEntryIds': json['media_entry_ids'],
    };
}

export function ApiV2FavoriteMediaEntriesGet200ResponseToJSON(json: any): ApiV2FavoriteMediaEntriesGet200Response {
    return ApiV2FavoriteMediaEntriesGet200ResponseToJSONTyped(json, false);
}

export function ApiV2FavoriteMediaEntriesGet200ResponseToJSONTyped(value?: ApiV2FavoriteMediaEntriesGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'media_entry_ids': value['mediaEntryIds'],
    };
}

