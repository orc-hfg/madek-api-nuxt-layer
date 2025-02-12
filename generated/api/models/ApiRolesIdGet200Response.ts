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
 * @interface ApiRolesIdGet200Response
 */
export interface ApiRolesIdGet200Response {
    /**
     * 
     * @type {string}
     * @memberof ApiRolesIdGet200Response
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ApiRolesIdGet200Response
     */
    metaKeyId: string;
    /**
     * 
     * @type {object}
     * @memberof ApiRolesIdGet200Response
     */
    labels: object;
    /**
     * 
     * @type {string}
     * @memberof ApiRolesIdGet200Response
     */
    creatorId?: string;
    /**
     * 
     * @type {object}
     * @memberof ApiRolesIdGet200Response
     */
    createdAt?: object;
    /**
     * 
     * @type {object}
     * @memberof ApiRolesIdGet200Response
     */
    updatedAt?: object;
}

/**
 * Check if a given object implements the ApiRolesIdGet200Response interface.
 */
export function instanceOfApiRolesIdGet200Response(value: object): value is ApiRolesIdGet200Response {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('metaKeyId' in value) || value['metaKeyId'] === undefined) return false;
    if (!('labels' in value) || value['labels'] === undefined) return false;
    return true;
}

export function ApiRolesIdGet200ResponseFromJSON(json: any): ApiRolesIdGet200Response {
    return ApiRolesIdGet200ResponseFromJSONTyped(json, false);
}

export function ApiRolesIdGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiRolesIdGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'metaKeyId': json['meta_key_id'],
        'labels': json['labels'],
        'creatorId': json['creator_id'] == null ? undefined : json['creator_id'],
        'createdAt': json['created_at'] == null ? undefined : json['created_at'],
        'updatedAt': json['updated_at'] == null ? undefined : json['updated_at'],
    };
}

export function ApiRolesIdGet200ResponseToJSON(json: any): ApiRolesIdGet200Response {
    return ApiRolesIdGet200ResponseToJSONTyped(json, false);
}

export function ApiRolesIdGet200ResponseToJSONTyped(value?: ApiRolesIdGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'meta_key_id': value['metaKeyId'],
        'labels': value['labels'],
        'creator_id': value['creatorId'],
        'created_at': value['createdAt'],
        'updated_at': value['updatedAt'],
    };
}

