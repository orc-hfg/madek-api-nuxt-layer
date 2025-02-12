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
 * @interface ApiCollectionCollectionIdPermsResourcesGet200Response
 */
export interface ApiCollectionCollectionIdPermsResourcesGet200Response {
    /**
     * 
     * @type {string}
     * @memberof ApiCollectionCollectionIdPermsResourcesGet200Response
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ApiCollectionCollectionIdPermsResourcesGet200Response
     */
    creatorId: string;
    /**
     * 
     * @type {boolean}
     * @memberof ApiCollectionCollectionIdPermsResourcesGet200Response
     */
    getMetadataAndPreviews?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ApiCollectionCollectionIdPermsResourcesGet200Response
     */
    responsibleUserId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ApiCollectionCollectionIdPermsResourcesGet200Response
     */
    clipboardUserId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ApiCollectionCollectionIdPermsResourcesGet200Response
     */
    workflowId?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ApiCollectionCollectionIdPermsResourcesGet200Response
     */
    responsibleDelegationId?: string | null;
}

/**
 * Check if a given object implements the ApiCollectionCollectionIdPermsResourcesGet200Response interface.
 */
export function instanceOfApiCollectionCollectionIdPermsResourcesGet200Response(value: object): value is ApiCollectionCollectionIdPermsResourcesGet200Response {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('creatorId' in value) || value['creatorId'] === undefined) return false;
    return true;
}

export function ApiCollectionCollectionIdPermsResourcesGet200ResponseFromJSON(json: any): ApiCollectionCollectionIdPermsResourcesGet200Response {
    return ApiCollectionCollectionIdPermsResourcesGet200ResponseFromJSONTyped(json, false);
}

export function ApiCollectionCollectionIdPermsResourcesGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiCollectionCollectionIdPermsResourcesGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'creatorId': json['creator_id'],
        'getMetadataAndPreviews': json['get_metadata_and_previews'] == null ? undefined : json['get_metadata_and_previews'],
        'responsibleUserId': json['responsible_user_id'] == null ? undefined : json['responsible_user_id'],
        'clipboardUserId': json['clipboard_user_id'] == null ? undefined : json['clipboard_user_id'],
        'workflowId': json['workflow_id'] == null ? undefined : json['workflow_id'],
        'responsibleDelegationId': json['responsible_delegation_id'] == null ? undefined : json['responsible_delegation_id'],
    };
}

export function ApiCollectionCollectionIdPermsResourcesGet200ResponseToJSON(json: any): ApiCollectionCollectionIdPermsResourcesGet200Response {
    return ApiCollectionCollectionIdPermsResourcesGet200ResponseToJSONTyped(json, false);
}

export function ApiCollectionCollectionIdPermsResourcesGet200ResponseToJSONTyped(value?: ApiCollectionCollectionIdPermsResourcesGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'creator_id': value['creatorId'],
        'get_metadata_and_previews': value['getMetadataAndPreviews'],
        'responsible_user_id': value['responsibleUserId'],
        'clipboard_user_id': value['clipboardUserId'],
        'workflow_id': value['workflowId'],
        'responsible_delegation_id': value['responsibleDelegationId'],
    };
}

