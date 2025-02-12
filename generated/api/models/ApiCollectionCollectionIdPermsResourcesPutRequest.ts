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
 * @interface ApiCollectionCollectionIdPermsResourcesPutRequest
 */
export interface ApiCollectionCollectionIdPermsResourcesPutRequest {
    /**
     * 
     * @type {boolean}
     * @memberof ApiCollectionCollectionIdPermsResourcesPutRequest
     */
    getMetadataAndPreviews?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ApiCollectionCollectionIdPermsResourcesPutRequest
     */
    responsibleUserId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ApiCollectionCollectionIdPermsResourcesPutRequest
     */
    clipboardUserId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ApiCollectionCollectionIdPermsResourcesPutRequest
     */
    workflowId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ApiCollectionCollectionIdPermsResourcesPutRequest
     */
    responsibleDelegationId?: string | null;
}

/**
 * Check if a given object implements the ApiCollectionCollectionIdPermsResourcesPutRequest interface.
 */
export function instanceOfApiCollectionCollectionIdPermsResourcesPutRequest(value: object): value is ApiCollectionCollectionIdPermsResourcesPutRequest {
    return true;
}

export function ApiCollectionCollectionIdPermsResourcesPutRequestFromJSON(json: any): ApiCollectionCollectionIdPermsResourcesPutRequest {
    return ApiCollectionCollectionIdPermsResourcesPutRequestFromJSONTyped(json, false);
}

export function ApiCollectionCollectionIdPermsResourcesPutRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiCollectionCollectionIdPermsResourcesPutRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'getMetadataAndPreviews': json['get_metadata_and_previews'] == null ? undefined : json['get_metadata_and_previews'],
        'responsibleUserId': json['responsible_user_id'] == null ? undefined : json['responsible_user_id'],
        'clipboardUserId': json['clipboard_user_id'] == null ? undefined : json['clipboard_user_id'],
        'workflowId': json['workflow_id'] == null ? undefined : json['workflow_id'],
        'responsibleDelegationId': json['responsible_delegation_id'] == null ? undefined : json['responsible_delegation_id'],
    };
}

export function ApiCollectionCollectionIdPermsResourcesPutRequestToJSON(json: any): ApiCollectionCollectionIdPermsResourcesPutRequest {
    return ApiCollectionCollectionIdPermsResourcesPutRequestToJSONTyped(json, false);
}

export function ApiCollectionCollectionIdPermsResourcesPutRequestToJSONTyped(value?: ApiCollectionCollectionIdPermsResourcesPutRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'get_metadata_and_previews': value['getMetadataAndPreviews'],
        'responsible_user_id': value['responsibleUserId'],
        'clipboard_user_id': value['clipboardUserId'],
        'workflow_id': value['workflowId'],
        'responsible_delegation_id': value['responsibleDelegationId'],
    };
}

