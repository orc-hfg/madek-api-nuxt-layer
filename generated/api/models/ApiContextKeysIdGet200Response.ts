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
 * @interface ApiContextKeysIdGet200Response
 */
export interface ApiContextKeysIdGet200Response {
    /**
     * 
     * @type {object}
     * @memberof ApiContextKeysIdGet200Response
     */
    descriptions: object | null;
    /**
     * 
     * @type {object}
     * @memberof ApiContextKeysIdGet200Response
     */
    documentationUrls: object | null;
    /**
     * 
     * @type {string}
     * @memberof ApiContextKeysIdGet200Response
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof ApiContextKeysIdGet200Response
     */
    isRequired: boolean;
    /**
     * 
     * @type {string}
     * @memberof ApiContextKeysIdGet200Response
     */
    contextId: string;
    /**
     * 
     * @type {number}
     * @memberof ApiContextKeysIdGet200Response
     */
    position: number;
    /**
     * 
     * @type {object}
     * @memberof ApiContextKeysIdGet200Response
     */
    labels: object | null;
    /**
     * 
     * @type {object}
     * @memberof ApiContextKeysIdGet200Response
     */
    hints: object | null;
    /**
     * 
     * @type {number}
     * @memberof ApiContextKeysIdGet200Response
     */
    lengthMax: number | null;
    /**
     * 
     * @type {number}
     * @memberof ApiContextKeysIdGet200Response
     */
    lengthMin: number | null;
    /**
     * 
     * @type {string}
     * @memberof ApiContextKeysIdGet200Response
     */
    metaKeyId: string;
}

/**
 * Check if a given object implements the ApiContextKeysIdGet200Response interface.
 */
export function instanceOfApiContextKeysIdGet200Response(value: object): value is ApiContextKeysIdGet200Response {
    if (!('descriptions' in value) || value['descriptions'] === undefined) return false;
    if (!('documentationUrls' in value) || value['documentationUrls'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('isRequired' in value) || value['isRequired'] === undefined) return false;
    if (!('contextId' in value) || value['contextId'] === undefined) return false;
    if (!('position' in value) || value['position'] === undefined) return false;
    if (!('labels' in value) || value['labels'] === undefined) return false;
    if (!('hints' in value) || value['hints'] === undefined) return false;
    if (!('lengthMax' in value) || value['lengthMax'] === undefined) return false;
    if (!('lengthMin' in value) || value['lengthMin'] === undefined) return false;
    if (!('metaKeyId' in value) || value['metaKeyId'] === undefined) return false;
    return true;
}

export function ApiContextKeysIdGet200ResponseFromJSON(json: any): ApiContextKeysIdGet200Response {
    return ApiContextKeysIdGet200ResponseFromJSONTyped(json, false);
}

export function ApiContextKeysIdGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiContextKeysIdGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'descriptions': json['descriptions'],
        'documentationUrls': json['documentation_urls'],
        'id': json['id'],
        'isRequired': json['is_required'],
        'contextId': json['context_id'],
        'position': json['position'],
        'labels': json['labels'],
        'hints': json['hints'],
        'lengthMax': json['length_max'],
        'lengthMin': json['length_min'],
        'metaKeyId': json['meta_key_id'],
    };
}

export function ApiContextKeysIdGet200ResponseToJSON(json: any): ApiContextKeysIdGet200Response {
    return ApiContextKeysIdGet200ResponseToJSONTyped(json, false);
}

export function ApiContextKeysIdGet200ResponseToJSONTyped(value?: ApiContextKeysIdGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'descriptions': value['descriptions'],
        'documentation_urls': value['documentationUrls'],
        'id': value['id'],
        'is_required': value['isRequired'],
        'context_id': value['contextId'],
        'position': value['position'],
        'labels': value['labels'],
        'hints': value['hints'],
        'length_max': value['lengthMax'],
        'length_min': value['lengthMin'],
        'meta_key_id': value['metaKeyId'],
    };
}

