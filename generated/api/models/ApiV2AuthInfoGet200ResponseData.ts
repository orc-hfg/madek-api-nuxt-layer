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
 * @interface ApiV2AuthInfoGet200ResponseData
 */
export interface ApiV2AuthInfoGet200ResponseData {
    /**
     * 
     * @type {string}
     * @memberof ApiV2AuthInfoGet200ResponseData
     */
    type: string;
    /**
     * 
     * @type {string}
     * @memberof ApiV2AuthInfoGet200ResponseData
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ApiV2AuthInfoGet200ResponseData
     */
    login: string;
    /**
     * 
     * @type {Date}
     * @memberof ApiV2AuthInfoGet200ResponseData
     */
    createdAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof ApiV2AuthInfoGet200ResponseData
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiV2AuthInfoGet200ResponseData
     */
    lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiV2AuthInfoGet200ResponseData
     */
    emailAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiV2AuthInfoGet200ResponseData
     */
    authenticationMethod?: string;
}

/**
 * Check if a given object implements the ApiV2AuthInfoGet200ResponseData interface.
 */
export function instanceOfApiV2AuthInfoGet200ResponseData(value: object): value is ApiV2AuthInfoGet200ResponseData {
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('login' in value) || value['login'] === undefined) return false;
    return true;
}

export function ApiV2AuthInfoGet200ResponseDataFromJSON(json: any): ApiV2AuthInfoGet200ResponseData {
    return ApiV2AuthInfoGet200ResponseDataFromJSONTyped(json, false);
}

export function ApiV2AuthInfoGet200ResponseDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiV2AuthInfoGet200ResponseData {
    if (json == null) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
        'login': json['login'],
        'createdAt': json['created_at'] == null ? undefined : (new Date(json['created_at'])),
        'firstName': json['first_name'] == null ? undefined : json['first_name'],
        'lastName': json['last_name'] == null ? undefined : json['last_name'],
        'emailAddress': json['email_address'] == null ? undefined : json['email_address'],
        'authenticationMethod': json['authentication-method'] == null ? undefined : json['authentication-method'],
    };
}

export function ApiV2AuthInfoGet200ResponseDataToJSON(json: any): ApiV2AuthInfoGet200ResponseData {
    return ApiV2AuthInfoGet200ResponseDataToJSONTyped(json, false);
}

export function ApiV2AuthInfoGet200ResponseDataToJSONTyped(value?: ApiV2AuthInfoGet200ResponseData | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'type': value['type'],
        'id': value['id'],
        'login': value['login'],
        'created_at': value['createdAt'] == null ? undefined : ((value['createdAt']).toISOString()),
        'first_name': value['firstName'],
        'last_name': value['lastName'],
        'email_address': value['emailAddress'],
        'authentication-method': value['authenticationMethod'],
    };
}

