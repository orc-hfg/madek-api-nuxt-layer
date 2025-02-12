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
 * @interface ApiPeopleGet200Response
 */
export interface ApiPeopleGet200Response {
    /**
     * 
     * @type {Array<object>}
     * @memberof ApiPeopleGet200Response
     */
    people: Array<object>;
}

/**
 * Check if a given object implements the ApiPeopleGet200Response interface.
 */
export function instanceOfApiPeopleGet200Response(value: object): value is ApiPeopleGet200Response {
    if (!('people' in value) || value['people'] === undefined) return false;
    return true;
}

export function ApiPeopleGet200ResponseFromJSON(json: any): ApiPeopleGet200Response {
    return ApiPeopleGet200ResponseFromJSONTyped(json, false);
}

export function ApiPeopleGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiPeopleGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'people': json['people'],
    };
}

export function ApiPeopleGet200ResponseToJSON(json: any): ApiPeopleGet200Response {
    return ApiPeopleGet200ResponseToJSONTyped(json, false);
}

export function ApiPeopleGet200ResponseToJSONTyped(value?: ApiPeopleGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'people': value['people'],
    };
}

