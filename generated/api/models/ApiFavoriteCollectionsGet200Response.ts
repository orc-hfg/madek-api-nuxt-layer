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
 * @interface ApiFavoriteCollectionsGet200Response
 */
export interface ApiFavoriteCollectionsGet200Response {
    /**
     * 
     * @type {Array<string>}
     * @memberof ApiFavoriteCollectionsGet200Response
     */
    collectionIds: Array<string>;
}

/**
 * Check if a given object implements the ApiFavoriteCollectionsGet200Response interface.
 */
export function instanceOfApiFavoriteCollectionsGet200Response(value: object): value is ApiFavoriteCollectionsGet200Response {
    if (!('collectionIds' in value) || value['collectionIds'] === undefined) return false;
    return true;
}

export function ApiFavoriteCollectionsGet200ResponseFromJSON(json: any): ApiFavoriteCollectionsGet200Response {
    return ApiFavoriteCollectionsGet200ResponseFromJSONTyped(json, false);
}

export function ApiFavoriteCollectionsGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiFavoriteCollectionsGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'collectionIds': json['collection_ids'],
    };
}

export function ApiFavoriteCollectionsGet200ResponseToJSON(json: any): ApiFavoriteCollectionsGet200Response {
    return ApiFavoriteCollectionsGet200ResponseToJSONTyped(json, false);
}

export function ApiFavoriteCollectionsGet200ResponseToJSONTyped(value?: ApiFavoriteCollectionsGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'collection_ids': value['collectionIds'],
    };
}

