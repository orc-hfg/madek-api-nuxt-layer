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
 * @interface ApiV2MediaEntryMediaEntryIdGet200Response
 */
export interface ApiV2MediaEntryMediaEntryIdGet200Response {
    /**
     * 
     * @type {boolean}
     * @memberof ApiV2MediaEntryMediaEntryIdGet200Response
     */
    getMetadataAndPreviews?: boolean;
    /**
     * 
     * @type {object}
     * @memberof ApiV2MediaEntryMediaEntryIdGet200Response
     */
    editSessionUpdatedAt?: object;
    /**
     * 
     * @type {boolean}
     * @memberof ApiV2MediaEntryMediaEntryIdGet200Response
     */
    getFullSize?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ApiV2MediaEntryMediaEntryIdGet200Response
     */
    id: string;
    /**
     * 
     * @type {object}
     * @memberof ApiV2MediaEntryMediaEntryIdGet200Response
     */
    updatedAt?: object;
    /**
     * 
     * @type {boolean}
     * @memberof ApiV2MediaEntryMediaEntryIdGet200Response
     */
    isPublished?: boolean;
    /**
     * 
     * @type {object}
     * @memberof ApiV2MediaEntryMediaEntryIdGet200Response
     */
    createdAt?: object;
    /**
     * 
     * @type {string}
     * @memberof ApiV2MediaEntryMediaEntryIdGet200Response
     */
    responsibleDelegationId?: string | null;
    /**
     * 
     * @type {object}
     * @memberof ApiV2MediaEntryMediaEntryIdGet200Response
     */
    metaDataUpdatedAt?: object;
    /**
     * 
     * @type {string}
     * @memberof ApiV2MediaEntryMediaEntryIdGet200Response
     */
    responsibleUserId?: string;
    /**
     * 
     * @type {string}
     * @memberof ApiV2MediaEntryMediaEntryIdGet200Response
     */
    creatorId?: string;
}

/**
 * Check if a given object implements the ApiV2MediaEntryMediaEntryIdGet200Response interface.
 */
export function instanceOfApiV2MediaEntryMediaEntryIdGet200Response(value: object): value is ApiV2MediaEntryMediaEntryIdGet200Response {
    if (!('id' in value) || value['id'] === undefined) return false;
    return true;
}

export function ApiV2MediaEntryMediaEntryIdGet200ResponseFromJSON(json: any): ApiV2MediaEntryMediaEntryIdGet200Response {
    return ApiV2MediaEntryMediaEntryIdGet200ResponseFromJSONTyped(json, false);
}

export function ApiV2MediaEntryMediaEntryIdGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiV2MediaEntryMediaEntryIdGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'getMetadataAndPreviews': json['get_metadata_and_previews'] == null ? undefined : json['get_metadata_and_previews'],
        'editSessionUpdatedAt': json['edit_session_updated_at'] == null ? undefined : json['edit_session_updated_at'],
        'getFullSize': json['get_full_size'] == null ? undefined : json['get_full_size'],
        'id': json['id'],
        'updatedAt': json['updated_at'] == null ? undefined : json['updated_at'],
        'isPublished': json['is_published'] == null ? undefined : json['is_published'],
        'createdAt': json['created_at'] == null ? undefined : json['created_at'],
        'responsibleDelegationId': json['responsible_delegation_id'] == null ? undefined : json['responsible_delegation_id'],
        'metaDataUpdatedAt': json['meta_data_updated_at'] == null ? undefined : json['meta_data_updated_at'],
        'responsibleUserId': json['responsible_user_id'] == null ? undefined : json['responsible_user_id'],
        'creatorId': json['creator_id'] == null ? undefined : json['creator_id'],
    };
}

export function ApiV2MediaEntryMediaEntryIdGet200ResponseToJSON(json: any): ApiV2MediaEntryMediaEntryIdGet200Response {
    return ApiV2MediaEntryMediaEntryIdGet200ResponseToJSONTyped(json, false);
}

export function ApiV2MediaEntryMediaEntryIdGet200ResponseToJSONTyped(value?: ApiV2MediaEntryMediaEntryIdGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'get_metadata_and_previews': value['getMetadataAndPreviews'],
        'edit_session_updated_at': value['editSessionUpdatedAt'],
        'get_full_size': value['getFullSize'],
        'id': value['id'],
        'updated_at': value['updatedAt'],
        'is_published': value['isPublished'],
        'created_at': value['createdAt'],
        'responsible_delegation_id': value['responsibleDelegationId'],
        'meta_data_updated_at': value['metaDataUpdatedAt'],
        'responsible_user_id': value['responsibleUserId'],
        'creator_id': value['creatorId'],
    };
}

