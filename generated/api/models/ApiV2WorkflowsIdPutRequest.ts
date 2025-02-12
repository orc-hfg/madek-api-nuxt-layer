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
 * @interface ApiV2WorkflowsIdPutRequest
 */
export interface ApiV2WorkflowsIdPutRequest {
    /**
     * 
     * @type {string}
     * @memberof ApiV2WorkflowsIdPutRequest
     */
    name?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ApiV2WorkflowsIdPutRequest
     */
    isActive?: boolean;
    /**
     * 
     * @type {object}
     * @memberof ApiV2WorkflowsIdPutRequest
     */
    _configuration?: object;
}

/**
 * Check if a given object implements the ApiV2WorkflowsIdPutRequest interface.
 */
export function instanceOfApiV2WorkflowsIdPutRequest(value: object): value is ApiV2WorkflowsIdPutRequest {
    return true;
}

export function ApiV2WorkflowsIdPutRequestFromJSON(json: any): ApiV2WorkflowsIdPutRequest {
    return ApiV2WorkflowsIdPutRequestFromJSONTyped(json, false);
}

export function ApiV2WorkflowsIdPutRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiV2WorkflowsIdPutRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
        'isActive': json['is_active'] == null ? undefined : json['is_active'],
        '_configuration': json['configuration'] == null ? undefined : json['configuration'],
    };
}

export function ApiV2WorkflowsIdPutRequestToJSON(json: any): ApiV2WorkflowsIdPutRequest {
    return ApiV2WorkflowsIdPutRequestToJSONTyped(json, false);
}

export function ApiV2WorkflowsIdPutRequestToJSONTyped(value?: ApiV2WorkflowsIdPutRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'is_active': value['isActive'],
        'configuration': value['_configuration'],
    };
}

