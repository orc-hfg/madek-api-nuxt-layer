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
 * @interface ApiV2MediaEntryMediaEntryIdPreviewGet200Response
 */
export interface ApiV2MediaEntryMediaEntryIdPreviewGet200Response {
    /**
     * 
     * @type {number}
     * @memberof ApiV2MediaEntryMediaEntryIdPreviewGet200Response
     */
    width: number | null;
    /**
     * 
     * @type {number}
     * @memberof ApiV2MediaEntryMediaEntryIdPreviewGet200Response
     */
    height: number | null;
    /**
     * 
     * @type {string}
     * @memberof ApiV2MediaEntryMediaEntryIdPreviewGet200Response
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ApiV2MediaEntryMediaEntryIdPreviewGet200Response
     */
    thumbnail: string;
    /**
     * 
     * @type {object}
     * @memberof ApiV2MediaEntryMediaEntryIdPreviewGet200Response
     */
    updatedAt: object;
    /**
     * 
     * @type {string}
     * @memberof ApiV2MediaEntryMediaEntryIdPreviewGet200Response
     */
    mediaType: string;
    /**
     * 
     * @type {string}
     * @memberof ApiV2MediaEntryMediaEntryIdPreviewGet200Response
     */
    conversionProfile: string | null;
    /**
     * 
     * @type {object}
     * @memberof ApiV2MediaEntryMediaEntryIdPreviewGet200Response
     */
    createdAt: object;
    /**
     * 
     * @type {string}
     * @memberof ApiV2MediaEntryMediaEntryIdPreviewGet200Response
     */
    mediaFileId: string;
    /**
     * 
     * @type {string}
     * @memberof ApiV2MediaEntryMediaEntryIdPreviewGet200Response
     */
    contentType: string;
    /**
     * 
     * @type {string}
     * @memberof ApiV2MediaEntryMediaEntryIdPreviewGet200Response
     */
    filename: string;
}

/**
 * Check if a given object implements the ApiV2MediaEntryMediaEntryIdPreviewGet200Response interface.
 */
export function instanceOfApiV2MediaEntryMediaEntryIdPreviewGet200Response(value: object): value is ApiV2MediaEntryMediaEntryIdPreviewGet200Response {
    if (!('width' in value) || value['width'] === undefined) return false;
    if (!('height' in value) || value['height'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('thumbnail' in value) || value['thumbnail'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    if (!('mediaType' in value) || value['mediaType'] === undefined) return false;
    if (!('conversionProfile' in value) || value['conversionProfile'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('mediaFileId' in value) || value['mediaFileId'] === undefined) return false;
    if (!('contentType' in value) || value['contentType'] === undefined) return false;
    if (!('filename' in value) || value['filename'] === undefined) return false;
    return true;
}

export function ApiV2MediaEntryMediaEntryIdPreviewGet200ResponseFromJSON(json: any): ApiV2MediaEntryMediaEntryIdPreviewGet200Response {
    return ApiV2MediaEntryMediaEntryIdPreviewGet200ResponseFromJSONTyped(json, false);
}

export function ApiV2MediaEntryMediaEntryIdPreviewGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiV2MediaEntryMediaEntryIdPreviewGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'width': json['width'],
        'height': json['height'],
        'id': json['id'],
        'thumbnail': json['thumbnail'],
        'updatedAt': json['updated_at'],
        'mediaType': json['media_type'],
        'conversionProfile': json['conversion_profile'],
        'createdAt': json['created_at'],
        'mediaFileId': json['media_file_id'],
        'contentType': json['content_type'],
        'filename': json['filename'],
    };
}

export function ApiV2MediaEntryMediaEntryIdPreviewGet200ResponseToJSON(json: any): ApiV2MediaEntryMediaEntryIdPreviewGet200Response {
    return ApiV2MediaEntryMediaEntryIdPreviewGet200ResponseToJSONTyped(json, false);
}

export function ApiV2MediaEntryMediaEntryIdPreviewGet200ResponseToJSONTyped(value?: ApiV2MediaEntryMediaEntryIdPreviewGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'width': value['width'],
        'height': value['height'],
        'id': value['id'],
        'thumbnail': value['thumbnail'],
        'updated_at': value['updatedAt'],
        'media_type': value['mediaType'],
        'conversion_profile': value['conversionProfile'],
        'created_at': value['createdAt'],
        'media_file_id': value['mediaFileId'],
        'content_type': value['contentType'],
        'filename': value['filename'],
    };
}

