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
 * @interface ApiCollectionCollectionIdMediaEntryArcsGet200Response
 */
export interface ApiCollectionCollectionIdMediaEntryArcsGet200Response {
    /**
     * 
     * @type {Array<object>}
     * @memberof ApiCollectionCollectionIdMediaEntryArcsGet200Response
     */
    collectionMediaEntryArcs: Array<object>;
}

/**
 * Check if a given object implements the ApiCollectionCollectionIdMediaEntryArcsGet200Response interface.
 */
export function instanceOfApiCollectionCollectionIdMediaEntryArcsGet200Response(value: object): value is ApiCollectionCollectionIdMediaEntryArcsGet200Response {
    if (!('collectionMediaEntryArcs' in value) || value['collectionMediaEntryArcs'] === undefined) return false;
    return true;
}

export function ApiCollectionCollectionIdMediaEntryArcsGet200ResponseFromJSON(json: any): ApiCollectionCollectionIdMediaEntryArcsGet200Response {
    return ApiCollectionCollectionIdMediaEntryArcsGet200ResponseFromJSONTyped(json, false);
}

export function ApiCollectionCollectionIdMediaEntryArcsGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiCollectionCollectionIdMediaEntryArcsGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'collectionMediaEntryArcs': json['collection-media-entry-arcs'],
    };
}

export function ApiCollectionCollectionIdMediaEntryArcsGet200ResponseToJSON(json: any): ApiCollectionCollectionIdMediaEntryArcsGet200Response {
    return ApiCollectionCollectionIdMediaEntryArcsGet200ResponseToJSONTyped(json, false);
}

export function ApiCollectionCollectionIdMediaEntryArcsGet200ResponseToJSONTyped(value?: ApiCollectionCollectionIdMediaEntryArcsGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'collection-media-entry-arcs': value['collectionMediaEntryArcs'],
    };
}

