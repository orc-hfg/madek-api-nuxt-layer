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
 * @interface ApiMetaKeysIdGet200Response
 */
export interface ApiMetaKeysIdGet200Response {
    /**
     * 
     * @type {object}
     * @memberof ApiMetaKeysIdGet200Response
     */
    descriptions: object | null;
    /**
     * 
     * @type {string}
     * @memberof ApiMetaKeysIdGet200Response
     */
    metaDatumObjectType?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ApiMetaKeysIdGet200Response
     */
    isExtensibleList?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ApiMetaKeysIdGet200Response
     */
    isEnabledForCollections?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ApiMetaKeysIdGet200Response
     */
    allowedRdfClass?: string | null;
    /**
     * 
     * @type {object}
     * @memberof ApiMetaKeysIdGet200Response
     */
    documentationUrls: object | null;
    /**
     * 
     * @type {string}
     * @memberof ApiMetaKeysIdGet200Response
     */
    vocabularyId: string;
    /**
     * 
     * @type {boolean}
     * @memberof ApiMetaKeysIdGet200Response
     */
    isEnabledForMediaEntries?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ApiMetaKeysIdGet200Response
     */
    id: string;
    /**
     * 
     * @type {number}
     * @memberof ApiMetaKeysIdGet200Response
     */
    position?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiMetaKeysIdGet200Response
     */
    position2?: number;
    /**
     * 
     * @type {object}
     * @memberof ApiMetaKeysIdGet200Response
     */
    labels: object | null;
    /**
     * 
     * @type {object}
     * @memberof ApiMetaKeysIdGet200Response
     */
    hints: object | null;
    /**
     * 
     * @type {boolean}
     * @memberof ApiMetaKeysIdGet200Response
     */
    keywordsAlphabeticalOrder?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ApiMetaKeysIdGet200Response
     */
    enabledForPublicView?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ApiMetaKeysIdGet200Response
     */
    textType?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ApiMetaKeysIdGet200Response
     */
    allowedPeopleSubtypes?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ApiMetaKeysIdGet200Response
     */
    id2?: string;
    /**
     * 
     * @type {object}
     * @memberof ApiMetaKeysIdGet200Response
     */
    labels2?: object;
    /**
     * 
     * @type {object}
     * @memberof ApiMetaKeysIdGet200Response
     */
    descriptions2?: object;
    /**
     * 
     * @type {object}
     * @memberof ApiMetaKeysIdGet200Response
     */
    ioMappings?: object;
    /**
     * 
     * @type {boolean}
     * @memberof ApiMetaKeysIdGet200Response
     */
    enabledForPublicUse?: boolean;
}

/**
 * Check if a given object implements the ApiMetaKeysIdGet200Response interface.
 */
export function instanceOfApiMetaKeysIdGet200Response(value: object): value is ApiMetaKeysIdGet200Response {
    if (!('descriptions' in value) || value['descriptions'] === undefined) return false;
    if (!('documentationUrls' in value) || value['documentationUrls'] === undefined) return false;
    if (!('vocabularyId' in value) || value['vocabularyId'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('labels' in value) || value['labels'] === undefined) return false;
    if (!('hints' in value) || value['hints'] === undefined) return false;
    return true;
}

export function ApiMetaKeysIdGet200ResponseFromJSON(json: any): ApiMetaKeysIdGet200Response {
    return ApiMetaKeysIdGet200ResponseFromJSONTyped(json, false);
}

export function ApiMetaKeysIdGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiMetaKeysIdGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'descriptions': json['descriptions'],
        'metaDatumObjectType': json['meta_datum_object_type'] == null ? undefined : json['meta_datum_object_type'],
        'isExtensibleList': json['is_extensible_list'] == null ? undefined : json['is_extensible_list'],
        'isEnabledForCollections': json['is_enabled_for_collections'] == null ? undefined : json['is_enabled_for_collections'],
        'allowedRdfClass': json['allowed_rdf_class'] == null ? undefined : json['allowed_rdf_class'],
        'documentationUrls': json['documentation_urls'],
        'vocabularyId': json['vocabulary_id'],
        'isEnabledForMediaEntries': json['is_enabled_for_media_entries'] == null ? undefined : json['is_enabled_for_media_entries'],
        'id': json['id'],
        'position': json['position'] == null ? undefined : json['position'],
        'position2': json['position_2'] == null ? undefined : json['position_2'],
        'labels': json['labels'],
        'hints': json['hints'],
        'keywordsAlphabeticalOrder': json['keywords_alphabetical_order'] == null ? undefined : json['keywords_alphabetical_order'],
        'enabledForPublicView': json['enabled_for_public_view'] == null ? undefined : json['enabled_for_public_view'],
        'textType': json['text_type'] == null ? undefined : json['text_type'],
        'allowedPeopleSubtypes': json['allowed_people_subtypes'] == null ? undefined : json['allowed_people_subtypes'],
        'id2': json['id_2'] == null ? undefined : json['id_2'],
        'labels2': json['labels_2'] == null ? undefined : json['labels_2'],
        'descriptions2': json['descriptions_2'] == null ? undefined : json['descriptions_2'],
        'ioMappings': json['io_mappings'] == null ? undefined : json['io_mappings'],
        'enabledForPublicUse': json['enabled_for_public_use'] == null ? undefined : json['enabled_for_public_use'],
    };
}

export function ApiMetaKeysIdGet200ResponseToJSON(json: any): ApiMetaKeysIdGet200Response {
    return ApiMetaKeysIdGet200ResponseToJSONTyped(json, false);
}

export function ApiMetaKeysIdGet200ResponseToJSONTyped(value?: ApiMetaKeysIdGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'descriptions': value['descriptions'],
        'meta_datum_object_type': value['metaDatumObjectType'],
        'is_extensible_list': value['isExtensibleList'],
        'is_enabled_for_collections': value['isEnabledForCollections'],
        'allowed_rdf_class': value['allowedRdfClass'],
        'documentation_urls': value['documentationUrls'],
        'vocabulary_id': value['vocabularyId'],
        'is_enabled_for_media_entries': value['isEnabledForMediaEntries'],
        'id': value['id'],
        'position': value['position'],
        'position_2': value['position2'],
        'labels': value['labels'],
        'hints': value['hints'],
        'keywords_alphabetical_order': value['keywordsAlphabeticalOrder'],
        'enabled_for_public_view': value['enabledForPublicView'],
        'text_type': value['textType'],
        'allowed_people_subtypes': value['allowedPeopleSubtypes'],
        'id_2': value['id2'],
        'labels_2': value['labels2'],
        'descriptions_2': value['descriptions2'],
        'io_mappings': value['ioMappings'],
        'enabled_for_public_use': value['enabledForPublicUse'],
    };
}

