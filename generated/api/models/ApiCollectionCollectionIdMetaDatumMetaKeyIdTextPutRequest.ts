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
 * @interface ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequest
 */
export interface ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequest {
    /**
     * 
     * @type {string}
     * @memberof ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequest
     */
    string: string;
}

/**
 * Check if a given object implements the ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequest interface.
 */
export function instanceOfApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequest(value: object): value is ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequest {
    if (!('string' in value) || value['string'] === undefined) return false;
    return true;
}

export function ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequestFromJSON(json: any): ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequest {
    return ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequestFromJSONTyped(json, false);
}

export function ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'string': json['string'],
    };
}

export function ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequestToJSON(json: any): ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequest {
    return ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequestToJSONTyped(json, false);
}

export function ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequestToJSONTyped(value?: ApiCollectionCollectionIdMetaDatumMetaKeyIdTextPutRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'string': value['string'],
    };
}

