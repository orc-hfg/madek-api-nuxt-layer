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
 * @interface ApiV2CollectionCollectionIdPermsResourcesPutRequest
 */
export interface ApiV2CollectionCollectionIdPermsResourcesPutRequest {
    /**
     * 
     * @type {boolean}
     * @memberof ApiV2CollectionCollectionIdPermsResourcesPutRequest
     */
    getMetadataAndPreviews?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ApiV2CollectionCollectionIdPermsResourcesPutRequest
     */
    responsibleUserId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ApiV2CollectionCollectionIdPermsResourcesPutRequest
     */
    clipboardUserId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ApiV2CollectionCollectionIdPermsResourcesPutRequest
     */
    workflowId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ApiV2CollectionCollectionIdPermsResourcesPutRequest
     */
    responsibleDelegationId?: string | null;
}

/**
 * Check if a given object implements the ApiV2CollectionCollectionIdPermsResourcesPutRequest interface.
 */
export function instanceOfApiV2CollectionCollectionIdPermsResourcesPutRequest(value: object): value is ApiV2CollectionCollectionIdPermsResourcesPutRequest {
    return true;
}

export function ApiV2CollectionCollectionIdPermsResourcesPutRequestFromJSON(json: any): ApiV2CollectionCollectionIdPermsResourcesPutRequest {
    return ApiV2CollectionCollectionIdPermsResourcesPutRequestFromJSONTyped(json, false);
}

export function ApiV2CollectionCollectionIdPermsResourcesPutRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiV2CollectionCollectionIdPermsResourcesPutRequest {
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

export function ApiV2CollectionCollectionIdPermsResourcesPutRequestToJSON(json: any): ApiV2CollectionCollectionIdPermsResourcesPutRequest {
    return ApiV2CollectionCollectionIdPermsResourcesPutRequestToJSONTyped(json, false);
}

export function ApiV2CollectionCollectionIdPermsResourcesPutRequestToJSONTyped(value?: ApiV2CollectionCollectionIdPermsResourcesPutRequest | null, ignoreDiscriminator: boolean = false): any {
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

