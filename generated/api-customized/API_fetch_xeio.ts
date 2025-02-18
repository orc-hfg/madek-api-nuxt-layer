/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum MetaKeysListParamsScopeEnum {
  Use = "use",
  View = "view",
}

export enum PeopleSubtypeEnum {
  PeopleInstitutionalGroup = "PeopleInstitutionalGroup",
  Person = "Person",
  PeopleGroup = "PeopleGroup",
}

export enum PeopleListParamsSubtypeEnum {
  PeopleInstitutionalGroup = "PeopleInstitutionalGroup",
  Person = "Person",
  PeopleGroup = "PeopleGroup",
}

export enum SubtypeEnum {
  PeopleInstitutionalGroup = "PeopleInstitutionalGroup",
  Person = "Person",
  PeopleGroup = "PeopleGroup",
}

export enum CollectionsDefaultResourceTypeEnum {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum CollectionsLayoutEnum {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum CollectionsSortingEnum {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export enum DefaultResourceTypeEnum {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum LayoutEnum {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum SortingEnum {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export enum CollectionCreatePayloadDefaultResourceTypeEnum {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum CollectionCreatePayloadLayoutEnum {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum CollectionCreatePayloadSortingEnum {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export interface CollectionCreatePayload {
  default_resource_type?: CollectionCreatePayloadDefaultResourceTypeEnum;
  get_metadata_and_previews?: boolean;
  is_master?: boolean;
  /** @format uuid */
  default_context_id?: string | null;
  layout?: CollectionCreatePayloadLayoutEnum;
  /** @format uuid */
  responsible_delegation_id?: string | null;
  sorting?: CollectionCreatePayloadSortingEnum;
  /** @format uuid */
  workflow_id?: string | null;
  /** @format uuid */
  responsible_user_id?: string;
}

export enum DefaultResourceTypeEnum1 {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum LayoutEnum1 {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum SortingEnum1 {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export enum DefaultResourceTypeEnum2 {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum LayoutEnum2 {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum SortingEnum2 {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export enum CollectionUpdatePayloadLayoutEnum {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum CollectionUpdatePayloadSortingEnum {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export enum CollectionUpdatePayloadDefaultResourceTypeEnum {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export interface CollectionUpdatePayload {
  layout?: CollectionUpdatePayloadLayoutEnum;
  is_master?: boolean;
  sorting?: CollectionUpdatePayloadSortingEnum;
  /** @format uuid */
  default_context_id?: string | null;
  /** @format uuid */
  workflow_id?: string | null;
  default_resource_type?: CollectionUpdatePayloadDefaultResourceTypeEnum;
}

export enum DefaultResourceTypeEnum3 {
  Collection = "collection",
  Entries = "entries",
  All = "all",
}

export enum LayoutEnum3 {
  List = "list",
  Grid = "grid",
  Tiles = "tiles",
  Miniature = "miniature",
}

export enum SortingEnum3 {
  ManualDESC = "manual DESC",
  ManualASC = "manual ASC",
  TitleASC = "title ASC",
  CreatedAtDESC = "created_at DESC",
  TitleDESC = "title DESC",
  CreatedAtASC = "created_at ASC",
  LastChange = "last_change",
}

export interface CollectionPermsResourcesUpdatePayload {
  get_metadata_and_previews?: boolean;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  clipboard_user_id?: string | null;
  /** @format uuid */
  workflow_id?: string | null;
  /** @format uuid */
  responsible_delegation_id?: string | null;
}

export enum CollectionPermsResourceUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
}

export enum CollectionPermsResourceUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
}

export interface CollectionPermsUserCreatePayload {
  get_metadata_and_previews: boolean;
  edit_metadata_and_relations: boolean;
  edit_permissions: boolean;
}

export enum CollectionPermsUserUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditPermissions = "edit_permissions",
  EditMetadataAndRelations = "edit_metadata_and_relations",
}

export enum CollectionPermsUserUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditPermissions = "edit_permissions",
  EditMetadataAndRelations = "edit_metadata_and_relations",
}

export interface CollectionPermsGroupCreatePayload {
  get_metadata_and_previews: boolean;
  edit_metadata_and_relations: boolean;
}

export enum CollectionPermsGroupUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadataAndRelations = "edit_metadata_and_relations",
}

export enum CollectionPermsGroupUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadataAndRelations = "edit_metadata_and_relations",
}

export interface MediaEntryCreatePayload {
  file?: {
    filename: string;
    "content-type": string;
    tempfile: any;
    /** @format int64 */
    size: number;
  };
}

export interface MediaEntryPermsResourcesUpdatePayload {
  get_metadata_and_previews?: boolean;
  get_full_size?: boolean;
  /** @format uuid */
  responsible_user_id?: string | null;
  /** @format uuid */
  responsible_delegation_id?: string | null;
}

export enum MediaEntryPermsResourceUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  GetFullSize = "get_full_size",
}

export enum MediaEntryPermsResourceUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  GetFullSize = "get_full_size",
}

export interface MediaEntryPermsUserCreatePayload {
  get_metadata_and_previews: boolean;
  get_full_size: boolean;
  edit_metadata: boolean;
  edit_permissions: boolean;
}

export enum MediaEntryPermsUserUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadata = "edit_metadata",
  EditPermissions = "edit_permissions",
  GetFullSize = "get_full_size",
}

export enum MediaEntryPermsUserUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadata = "edit_metadata",
  EditPermissions = "edit_permissions",
  GetFullSize = "get_full_size",
}

export interface MediaEntryPermsGroupCreatePayload {
  get_metadata_and_previews: boolean;
  get_full_size: boolean;
  edit_metadata: boolean;
}

export enum MediaEntryPermsGroupUpdateParamsPermNameEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadata = "edit_metadata",
  GetFullSize = "get_full_size",
}

export enum MediaEntryPermsGroupUpdateParamsEnum {
  GetMetadataAndPreviews = "get_metadata_and_previews",
  EditMetadata = "edit_metadata",
  GetFullSize = "get_full_size",
}

export interface WorkflowsCreatePayload {
  name: string;
  is_active?: boolean;
  configuration?: any;
}

export interface WorkflowsUpdatePayload {
  name?: string;
  is_active?: boolean;
  configuration?: any;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title No title
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @name AuthInfoList
     * @summary Authentication help and info.
     * @request GET:/api-v2/auth-info
     */
    authInfoList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/auth-info`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name AppSettingsList
     * @summary PUBLIC Context: Get App Settings.
     * @request GET:/api-v2/app-settings
     */
    appSettingsList: (params: RequestParams = {}) =>
      this.request<
        {
          available_locales?: string[];
          catalog_subtitles?: {
            de?: string | null;
            en?: string | null;
          };
          /** @format uuid */
          media_entry_default_license_id?: string | null;
          contexts_for_entry_edit?: string[];
          contexts_for_entry_validation?: string[];
          copyright_notice_default_text?: string | null;
          featured_set_subtitles?: {
            de?: string | null;
            en?: string | null;
          };
          media_entry_default_license_usage_meta_key?: string | null;
          /** @format uuid */
          featured_set_id?: string | null;
          /** @format uuid */
          teaser_set_id?: string | null;
          /** @format int32 */
          id?: number;
          contexts_for_entry_extra?: string[];
          provenance_notices?: {
            de?: string | null;
            en?: string | null;
          };
          media_entry_default_license_usage_text?: string | null;
          time_zone?: string;
          updated_at?: any;
          welcome_titles?: {
            de?: string | null;
            en?: string | null;
          };
          welcome_texts?: {
            de?: string | null;
            en?: string | null;
          };
          sitemap?: any;
          copyright_notice_templates?: string[];
          catalog_titles?: {
            de?: string | null;
            en?: string | null;
          };
          support_urls?: {
            de?: string | null;
            en?: string | null;
          };
          contexts_for_collection_extra?: string[];
          edit_meta_data_power_users_group_id?: string | null;
          about_pages?: {
            de?: string | null;
            en?: string | null;
          };
          contexts_for_collection_edit?: string[];
          site_titles?: {
            de?: string | null;
            en?: string | null;
          };
          context_for_entry_summary?: string | null;
          created_at?: any;
          media_entry_default_license_meta_key?: string | null;
          default_locale?: string | null;
          /** @format uuid */
          splashscreen_slideshow_set_id?: string | null;
          catalog_context_keys?: string[];
          brand_texts?: {
            de?: string | null;
            en?: string | null;
          };
          contexts_for_dynamic_filters?: string[];
          brand_logo_url?: string | null;
          contexts_for_list_details?: string[];
          featured_set_titles?: {
            de?: string | null;
            en?: string | null;
          };
          ignored_keyword_keys_for_browsing?: string | null;
          section_meta_key_id?: string | null;
          context_for_collection_summary?: string | null;
        },
        any
      >({
        path: `/api-v2/app-settings`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ContextKeysList
     * @summary PUBLIC Context: Query / List context_keys.
     * @request GET:/api-v2/context-keys
     */
    contextKeysList: (
      query?: {
        id?: string;
        context_id?: string;
        meta_key_id?: string;
        is_required?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          descriptions?: {
            de?: string | null;
            en?: string | null;
          };
          documentation_urls?: {
            de?: string | null;
            en?: string | null;
          };
          /** @format uuid */
          id: string;
          is_required: boolean;
          context_id: string;
          /** @format int32 */
          position: number;
          labels?: {
            de?: string | null;
            en?: string | null;
          };
          hints?: {
            de?: string | null;
            en?: string | null;
          };
          /** @format int32 */
          length_max?: number | null;
          /** @format int32 */
          length_min?: number | null;
          meta_key_id: string;
        }[],
        any
      >({
        path: `/api-v2/context-keys`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ContextKeysDetail
     * @summary PUBLIC Context: Get context_key by id.
     * @request GET:/api-v2/context-keys/{id}
     */
    contextKeysDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          descriptions?: {
            de?: string | null;
            en?: string | null;
          };
          documentation_urls?: {
            de?: string | null;
            en?: string | null;
          };
          /** @format uuid */
          id: string;
          is_required: boolean;
          context_id: string;
          /** @format int32 */
          position: number;
          labels?: {
            de?: string | null;
            en?: string | null;
          };
          hints?: {
            de?: string | null;
            en?: string | null;
          };
          /** @format int32 */
          length_max?: number | null;
          /** @format int32 */
          length_min?: number | null;
          meta_key_id: string;
        },
        any
      >({
        path: `/api-v2/context-keys/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ContextsList
     * @summary USER Context: List contexts.
     * @request GET:/api-v2/contexts
     */
    contextsList: (params: RequestParams = {}) =>
      this.request<
        {
          id: string;
          labels?: {
            de?: string | null;
            en?: string | null;
          };
          descriptions?: {
            de?: string | null;
            en?: string | null;
          };
        }[],
        any
      >({
        path: `/api-v2/contexts`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ContextsDetail
     * @summary USER Context: Get contexts by id.
     * @request GET:/api-v2/contexts/{id}
     */
    contextsDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          id: string;
          labels?: {
            de?: string | null;
            en?: string | null;
          };
          descriptions?: {
            de?: string | null;
            en?: string | null;
          };
        },
        any
      >({
        path: `/api-v2/contexts/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name KeywordsList
     * @summary PUBLIC Context: Query / list keywords.
     * @request GET:/api-v2/keywords
     */
    keywordsList: (
      query?: {
        /** @format uuid */
        id?: string;
        meta_key_id?: string;
        term?: string;
        description?: string;
        rdf_class?: string;
        /** @format int32 */
        page: number;
        /** @format int32 */
        size2: number;
        /** @format int32 */
        //size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          keywords: {
            /** @format uuid */
            id: string;
            meta_key_id: string;
            term: string;
            description?: string | null;
            /** @format int32 */
            position?: number | null;
            external_uris: any[];
            external_uri?: string | null;
            rdf_class: string;
          }[];
        },
        any
      >({
        path: `/api-v2/keywords`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get keyword for id. Returns 404, if no such keyword exists.
     *
     * @name KeywordsDetail
     * @summary PUBLIC Context: Get keyword for id.
     * @request GET:/api-v2/keywords/{id}
     */
    keywordsDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          meta_key_id: string;
          term: string;
          description?: string | null;
          /** @format int32 */
          position?: number | null;
          external_uris: any[];
          external_uri?: string | null;
          rdf_class: string;
        },
        any
      >({
        path: `/api-v2/keywords/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of meta-key ids. Paging is used as you get a limit of 100 entries.
     *
     * @name MetaKeysList
     * @summary PUBLIC/USER Context: Get all meta-key ids
     * @request GET:/api-v2/meta-keys
     */
    metaKeysList: (
      query?: {
        id?: string;
        vocabulary_id?: string;
        meta_datum_object_type?: string;
        is_enabled_for_collections?: boolean;
        is_enabled_for_media_entries?: boolean;
        scope?: MetaKeysListParamsScopeEnum;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        count?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          "meta-keys": {
            descriptions?: {
              de?: string | null;
              en?: string | null;
            };
            meta_datum_object_type?: string;
            is_extensible_list?: boolean;
            is_enabled_for_collections?: boolean;
            allowed_rdf_class?: string | null;
            documentation_urls?: {
              de?: string | null;
              en?: string | null;
            };
            vocabulary_id: string;
            is_enabled_for_media_entries?: boolean;
            id: string;
            /** @format int32 */
            position?: number;
            /** @format int32 */
            position_2?: number;
            labels?: {
              de?: string | null;
              en?: string | null;
            };
            hints?: {
              de?: string | null;
              en?: string | null;
            };
            keywords_alphabetical_order?: boolean;
            enabled_for_public_view?: boolean;
            text_type?: string;
            allowed_people_subtypes?: string[];
            id_2?: string;
            labels_2?: any;
            descriptions_2?: any;
            io_mappings?: any;
            enabled_for_public_use?: boolean;
          }[];
        },
        any
      >({
        path: `/api-v2/meta-keys`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get meta-key by id. Returns 404, if no such meta-key exists.
     *
     * @name MetaKeysDetail
     * @summary PUBLIC/USER Context: Get meta-key by id
     * @request GET:/api-v2/meta-keys/{id}
     */
    metaKeysDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          descriptions?: {
            de?: string | null;
            en?: string | null;
          };
          meta_datum_object_type?: string;
          is_extensible_list?: boolean;
          is_enabled_for_collections?: boolean;
          allowed_rdf_class?: string | null;
          documentation_urls?: {
            de?: string | null;
            en?: string | null;
          };
          vocabulary_id: string;
          is_enabled_for_media_entries?: boolean;
          id: string;
          /** @format int32 */
          position?: number;
          /** @format int32 */
          position_2?: number;
          labels?: {
            de?: string | null;
            en?: string | null;
          };
          hints?: {
            de?: string | null;
            en?: string | null;
          };
          keywords_alphabetical_order?: boolean;
          enabled_for_public_view?: boolean;
          text_type?: string;
          allowed_people_subtypes?: string[];
          id_2?: string;
          labels_2?: any;
          descriptions_2?: any;
          io_mappings?: any;
          enabled_for_public_use?: boolean;
        },
        {
          message: string;
        }
      >({
        path: `/api-v2/meta-keys/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Query list of people only for ids or full-data. Optional Paging.
     *
     * @name PeopleList
     * @summary PUBLIC Context: Get all people ids
     * @request GET:/api-v2/people/
     */
    peopleList: (
      query?: {
        subtype?: PeopleListParamsSubtypeEnum;
        institutional_id?: string;
        searchable?: string;
        /** @format uuid */
        id?: string;
        /** @format int32 */
        count?: number;
        pseudonym?: string;
        last_name?: string;
        first_name?: string;
        /** @format int32 */
        page?: number;
        full_data?: boolean;
        description?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          people: {
            subtype: PeopleSubtypeEnum;
            institutional_id?: string | null;
            searchable?: string;
            external_uris?: string[];
            /** @format uuid */
            id: string;
            pseudonym?: string | null;
            updated_at?: any;
            last_name?: string | null;
            first_name?: string | null;
            created_at?: any;
            external_uri?: string | null;
            description?: string | null;
          }[];
        },
        any
      >({
        path: `/api-v2/people/`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get person by id. Returns 404, if no such person exists. TODO query params.
     *
     * @name PeopleDetail
     * @summary PUBLIC Context: Get person by id
     * @request GET:/api-v2/people/{id}
     */
    peopleDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          subtype: SubtypeEnum;
          institutional_id?: string | null;
          external_uris: string[];
          /** @format uuid */
          id: string;
          pseudonym?: string | null;
          updated_at: any;
          last_name?: string | null;
          first_name?: string | null;
          created_at: any;
          external_uri?: string | null;
          description?: string | null;
        },
        string
      >({
        path: `/api-v2/people/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionsList
     * @summary USER Context: Query/List collections.
     * @request GET:/api-v2/collections
     */
    collectionsList: (
      query?: {
        me_edit_permission?: boolean;
        /** @format int32 */
        size?: number;
        me_edit_metadata_and_relations?: boolean;
        me_get_metadata_and_previews?: boolean;
        collection_id?: string;
        /** @format uuid */
        clipboard_user_id?: string;
        order?: string;
        /** @format uuid */
        responsible_delegation_id?: string;
        /** @format int32 */
        page?: number;
        /** @format uuid */
        workflow_id?: string;
        /** @format uuid */
        responsible_user_id?: string;
        /** @format uuid */
        creator_id?: string;
        full_data?: boolean;
        public_get_metadata_and_previews?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          collections: {
            default_resource_type?: CollectionsDefaultResourceTypeEnum;
            get_metadata_and_previews?: boolean;
            edit_session_updated_at?: any;
            is_master?: boolean;
            /** @format uuid */
            default_context_id?: string | null;
            /** @format uuid */
            id: string;
            updated_at?: any;
            layout?: CollectionsLayoutEnum;
            /** @format uuid */
            clipboard_user_id?: string | null;
            created_at?: any;
            /** @format uuid */
            responsible_delegation_id?: string | null;
            sorting?: CollectionsSortingEnum;
            /** @format uuid */
            workflow_id?: string | null;
            meta_data_updated_at?: any;
            /** @format uuid */
            responsible_user_id?: string | null;
            /** @format uuid */
            creator_id?: string;
          }[];
        },
        any
      >({
        path: `/api-v2/collections`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionCreate
     * @summary USER Context: Create collection
     * @request POST:/api-v2/collection
     */
    collectionCreate: (body: CollectionCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          default_resource_type?: DefaultResourceTypeEnum;
          get_metadata_and_previews?: boolean;
          edit_session_updated_at?: any;
          is_master?: boolean;
          /** @format uuid */
          default_context_id?: string | null;
          /** @format uuid */
          id: string;
          updated_at?: any;
          layout?: LayoutEnum;
          /** @format uuid */
          clipboard_user_id?: string | null;
          created_at?: any;
          /** @format uuid */
          responsible_delegation_id?: string | null;
          sorting?: SortingEnum;
          /** @format uuid */
          workflow_id?: string | null;
          meta_data_updated_at?: any;
          /** @format uuid */
          responsible_user_id?: string | null;
          /** @format uuid */
          creator_id?: string;
        },
        any
      >({
        path: `/api-v2/collection`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionDetail
     * @summary PUBLIC/USER Context: Get collection for id.
     * @request GET:/api-v2/collection/{collection_id}
     */
    collectionDetail: (collectionId: string, params: RequestParams = {}) =>
      this.request<
        {
          default_resource_type?: DefaultResourceTypeEnum1;
          get_metadata_and_previews?: boolean;
          edit_session_updated_at?: any;
          is_master?: boolean;
          /** @format uuid */
          default_context_id?: string | null;
          /** @format uuid */
          id: string;
          updated_at?: any;
          layout?: LayoutEnum1;
          /** @format uuid */
          clipboard_user_id?: string | null;
          created_at?: any;
          /** @format uuid */
          responsible_delegation_id?: string | null;
          sorting?: SortingEnum1;
          /** @format uuid */
          workflow_id?: string | null;
          meta_data_updated_at?: any;
          /** @format uuid */
          responsible_user_id?: string | null;
          /** @format uuid */
          creator_id?: string;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionUpdate
     * @summary USER Context: Update collection for id.
     * @request PUT:/api-v2/collection/{collection_id}
     */
    collectionUpdate: (collectionId: string, body: CollectionUpdatePayload, params: RequestParams = {}) =>
      this.request<
        {
          default_resource_type?: DefaultResourceTypeEnum2;
          get_metadata_and_previews?: boolean;
          edit_session_updated_at?: any;
          is_master?: boolean;
          /** @format uuid */
          default_context_id?: string | null;
          /** @format uuid */
          id: string;
          updated_at?: any;
          layout?: LayoutEnum2;
          /** @format uuid */
          clipboard_user_id?: string | null;
          created_at?: any;
          /** @format uuid */
          responsible_delegation_id?: string | null;
          sorting?: SortingEnum2;
          /** @format uuid */
          workflow_id?: string | null;
          meta_data_updated_at?: any;
          /** @format uuid */
          responsible_user_id?: string | null;
          /** @format uuid */
          creator_id?: string;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionDelete
     * @summary USER Context: Delete collection for id.
     * @request DELETE:/api-v2/collection/{collection_id}
     */
    collectionDelete: (collectionId: string, params: RequestParams = {}) =>
      this.request<
        {
          default_resource_type?: DefaultResourceTypeEnum3;
          get_metadata_and_previews?: boolean;
          edit_session_updated_at?: any;
          is_master?: boolean;
          /** @format uuid */
          default_context_id?: string | null;
          /** @format uuid */
          id: string;
          updated_at?: any;
          layout?: LayoutEnum3;
          /** @format uuid */
          clipboard_user_id?: string | null;
          created_at?: any;
          /** @format uuid */
          responsible_delegation_id?: string | null;
          sorting?: SortingEnum3;
          /** @format uuid */
          workflow_id?: string | null;
          meta_data_updated_at?: any;
          /** @format uuid */
          responsible_user_id?: string | null;
          /** @format uuid */
          creator_id?: string;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDataDetail
     * @summary Get meta-data for collection.
     * @request GET:/api-v2/collection/{collection_id}/meta-data
     */
    collectionMetaDataDetail: (
      collectionId: string,
      query?: {
        updated_after?: string;
        meta_keys?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-data`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDataRelatedDetail
     * @summary Get meta-data for collection.
     * @request GET:/api-v2/collection/{collection_id}/meta-data-related
     */
    collectionMetaDataRelatedDetail: (
      collectionId: string,
      query?: {
        updated_after?: string;
        meta_keys?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-data-related`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumDetail
     * @summary Get meta-data for collection and meta-key.
     * @request GET:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}
     */
    collectionMetaDatumDetail: (collectionId: string, metaKeyId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumDelete
     * @summary Delete meta-data for collection and meta-key
     * @request DELETE:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}
     */
    collectionMetaDatumDelete: (collectionId: string, metaKeyId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumTextCreate
     * @summary Create meta-data text for collection.
     * @request POST:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/text
     */
    collectionMetaDatumTextCreate: (
      collectionId: string,
      metaKeyId: string,
      body: {
        string: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/text`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumTextUpdate
     * @summary Update meta-data text for collection.
     * @request PUT:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/text
     */
    collectionMetaDatumTextUpdate: (
      collectionId: string,
      metaKeyId: string,
      body: {
        string: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/text`,
        method: "PUT",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumTextDateCreate
     * @summary Create meta-data json for collection.
     * @request POST:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/text-date
     */
    collectionMetaDatumTextDateCreate: (
      collectionId: string,
      metaKeyId: string,
      body: {
        string: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/text-date`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumTextDateUpdate
     * @summary Update meta-data text-date for collection.
     * @request PUT:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/text-date
     */
    collectionMetaDatumTextDateUpdate: (
      collectionId: string,
      metaKeyId: string,
      body: {
        string: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/text-date`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumJsonCreate
     * @summary Create meta-data json for collection.
     * @request POST:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/json
     */
    collectionMetaDatumJsonCreate: (
      collectionId: string,
      metaKeyId: string,
      body: {
        json: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/json`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumJsonUpdate
     * @summary Update meta-data json for collection.
     * @request PUT:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/json
     */
    collectionMetaDatumJsonUpdate: (
      collectionId: string,
      metaKeyId: string,
      body: {
        json: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/json`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumKeywordDetail
     * @summary Get meta-data keywords for collection meta-key
     * @request GET:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/keyword
     */
    collectionMetaDatumKeywordDetail: (collectionId: string, metaKeyId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/keyword`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumKeywordCreate
     * @summary Create meta-data keyword for collection.
     * @request POST:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/keyword/{keyword_id}
     */
    collectionMetaDatumKeywordCreate: (
      collectionId: string,
      metaKeyId: string,
      keywordId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/keyword/${keywordId}`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumKeywordDelete
     * @summary Delete meta-data keyword for collection.
     * @request DELETE:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/keyword/{keyword_id}
     */
    collectionMetaDatumKeywordDelete: (
      collectionId: string,
      metaKeyId: string,
      keywordId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/keyword/${keywordId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumPeopleDetail
     * @summary Get meta-data people for collection meta-key.
     * @request GET:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/people
     */
    collectionMetaDatumPeopleDetail: (collectionId: string, metaKeyId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/people`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumPeopleCreate
     * @summary Create meta-data people for media-entry
     * @request POST:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/people/{person_id}
     */
    collectionMetaDatumPeopleCreate: (
      collectionId: string,
      metaKeyId: string,
      personId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/people/${personId}`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumPeopleDelete
     * @summary Delete meta-data people for collection.
     * @request DELETE:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/people/{person_id}
     */
    collectionMetaDatumPeopleDelete: (
      collectionId: string,
      metaKeyId: string,
      personId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/people/${personId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMetaDatumRoleCreate
     * @summary Create meta-data role for media-entry
     * @request POST:/api-v2/collection/{collection_id}/meta-datum/{meta_key_id}/role/{role_id}
     */
    collectionMetaDatumRoleCreate: (
      mediaEntryId: string,
      metaKeyId: string,
      roleId: string,
      collectionId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/meta-datum/${metaKeyId}/role/${roleId}`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionCustomUrlDetail
     * @summary Get custom_url for collection.
     * @request GET:/api-v2/collection/{collection_id}/custom_url
     */
    collectionCustomUrlDetail: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/collection/${collectionId}/custom_url`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionCustomUrlCreate
     * @summary USER Context: Create custom_url for collection.
     * @request POST:/api-v2/collection/{collection_id}/custom_url
     */
    collectionCustomUrlCreate: (
      collectionId: string,
      body: {
        id: string;
        is_primary: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: string;
          is_primary: boolean;
          /** @format uuid */
          creator_id: string;
          /** @format uuid */
          updator_id: string;
          updated_at: any;
          created_at: any;
          /** @format uuid */
          media_entry_id?: string | null;
          /** @format uuid */
          collection_id?: string | null;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/custom_url`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionCustomUrlUpdate
     * @summary USER Context: Update custom_url for collection.
     * @request PUT:/api-v2/collection/{collection_id}/custom_url
     */
    collectionCustomUrlUpdate: (
      collectionId: string,
      body: {
        id?: string;
        is_primary?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: string;
          is_primary: boolean;
          /** @format uuid */
          creator_id: string;
          /** @format uuid */
          updator_id: string;
          updated_at: any;
          created_at: any;
          /** @format uuid */
          media_entry_id?: string | null;
          /** @format uuid */
          collection_id?: string | null;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/custom_url`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionCustomUrlDelete
     * @summary TODO: Delete custom_url for collection.
     * @request DELETE:/api-v2/collection/{collection_id}/custom_url
     */
    collectionCustomUrlDelete: (collectionId: string, params: RequestParams = {}) =>
      this.request<
        {
          id: string;
          is_primary: boolean;
          /** @format uuid */
          creator_id: string;
          /** @format uuid */
          updator_id: string;
          updated_at: any;
          created_at: any;
          /** @format uuid */
          media_entry_id?: string | null;
          /** @format uuid */
          collection_id?: string | null;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/custom_url`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionEditSessionsDetail
     * @summary PUBLIC/USER Context: Get edit_session list for collection.
     * @request GET:/api-v2/collection/{collection_id}/edit_sessions
     */
    collectionEditSessionsDetail: (collectionId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          user_id: string;
          created_at: any;
          /** @format uuid */
          media_entry_id?: string | null;
          /** @format uuid */
          collection_id?: string | null;
        }[],
        any
      >({
        path: `/api-v2/collection/${collectionId}/edit_sessions`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionEditSessionsCreate
     * @summary USER Context: Create edit session for collection and authed user.
     * @request POST:/api-v2/collection/{collection_id}/edit_sessions
     */
    collectionEditSessionsCreate: (collectionId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          user_id: string;
          created_at: any;
          /** @format uuid */
          media_entry_id?: string | null;
          /** @format uuid */
          collection_id?: string | null;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/edit_sessions`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionFavoriteDetail
     * @summary USER Context: Get favorite_collection for authed user and collection id.
     * @request GET:/api-v2/collection/{collection_id}/favorite
     */
    collectionFavoriteDetail: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/collection/${collectionId}/favorite`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionFavoriteCreate
     * @summary USER Context: Create favorite_collection for authed user and collection.
     * @request POST:/api-v2/collection/{collection_id}/favorite
     */
    collectionFavoriteCreate: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/collection/${collectionId}/favorite`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionFavoriteDelete
     * @summary USER Context: Delete favorite_collection for authed user and collection id.
     * @request DELETE:/api-v2/collection/{collection_id}/favorite
     */
    collectionFavoriteDelete: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/collection/${collectionId}/favorite`,
        method: "DELETE",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionPermsDetail
     * @summary Query collection permissions.
     * @request GET:/api-v2/collection/{collection_id}/perms/
     */
    collectionPermsDetail: (collectionId: string, params: RequestParams = {}) =>
      this.request<
        {
          "media-resource": {
            /** @format uuid */
            id: string;
            /** @format uuid */
            creator_id: string;
            get_metadata_and_previews?: boolean;
            /** @format uuid */
            responsible_user_id?: string | null;
            /** @format uuid */
            clipboard_user_id?: string | null;
            /** @format uuid */
            workflow_id?: string | null;
            /** @format uuid */
            responsible_delegation_id?: string | null;
          };
          users: {
            /** @format uuid */
            user_id: string;
            get_metadata_and_previews: boolean;
            edit_permissions: boolean;
            /** @format uuid */
            delegation_id?: string | null;
            edit_metadata_and_relations: boolean;
            /** @format uuid */
            id: string;
            /** @format uuid */
            updator_id?: string | null;
            updated_at: any;
            /** @format uuid */
            collection_id: string;
            created_at: any;
          }[];
          groups: {
            /** @format uuid */
            id: string;
            /** @format uuid */
            updator_id?: string | null;
            /** @format uuid */
            collection_id: string;
            /** @format uuid */
            group_id: string;
            get_metadata_and_previews: boolean;
            edit_metadata_and_relations: boolean;
            created_at: any;
            updated_at: any;
          }[];
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionPermsResourcesDetail
     * @summary Query collection permissions.
     * @request GET:/api-v2/collection/{collection_id}/perms/resources
     */
    collectionPermsResourcesDetail: (collectionId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          creator_id: string;
          get_metadata_and_previews?: boolean;
          /** @format uuid */
          responsible_user_id?: string | null;
          /** @format uuid */
          clipboard_user_id?: string | null;
          /** @format uuid */
          workflow_id?: string | null;
          /** @format uuid */
          responsible_delegation_id?: string | null;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/resources`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Valid perm_name values are["get_metadata_and_previews" "get_full_size" "edit_metadata" "edit_permissions"]
     *
     * @name CollectionPermsResourcesUpdate
     * @summary Update collection entity permissions
     * @request PUT:/api-v2/collection/{collection_id}/perms/resources
     */
    collectionPermsResourcesUpdate: (
      collectionId: string,
      body: CollectionPermsResourcesUpdatePayload,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          creator_id: string;
          get_metadata_and_previews?: boolean;
          /** @format uuid */
          responsible_user_id?: string | null;
          /** @format uuid */
          clipboard_user_id?: string | null;
          /** @format uuid */
          workflow_id?: string | null;
          /** @format uuid */
          responsible_delegation_id?: string | null;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/resources`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Valid perm_name values are["get_metadata_and_previews" "get_full_size" "edit_metadata" "edit_permissions"]
     *
     * @name CollectionPermsResourceUpdate
     * @summary Update collection entity permissions
     * @request PUT:/api-v2/collection/{collection_id}/perms/resource/{perm_name}/{perm_val}
     */
    collectionPermsResourceUpdate: (
      collectionId: string,
      permName: CollectionPermsResourceUpdateParamsEnum,
      permVal: boolean,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          creator_id: string;
          get_metadata_and_previews?: boolean;
          /** @format uuid */
          responsible_user_id?: string | null;
          /** @format uuid */
          clipboard_user_id?: string | null;
          /** @format uuid */
          workflow_id?: string | null;
          /** @format uuid */
          responsible_delegation_id?: string | null;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/resource/${permName}/${permVal}`,
        method: "PUT",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionPermsUsersDetail
     * @summary Query collection permissions.
     * @request GET:/api-v2/collection/{collection_id}/perms/users
     */
    collectionPermsUsersDetail: (collectionId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          get_metadata_and_previews: boolean;
          edit_permissions: boolean;
          /** @format uuid */
          delegation_id?: string | null;
          edit_metadata_and_relations: boolean;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          updated_at: any;
          /** @format uuid */
          collection_id: string;
          created_at: any;
        }[],
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/users`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionPermsUserDetail
     * @summary Get collection user permissions.
     * @request GET:/api-v2/collection/{collection_id}/perms/user/{user_id}
     */
    collectionPermsUserDetail: (collectionId: string, userId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          get_metadata_and_previews: boolean;
          edit_permissions: boolean;
          /** @format uuid */
          delegation_id?: string | null;
          edit_metadata_and_relations: boolean;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          updated_at: any;
          /** @format uuid */
          collection_id: string;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/user/${userId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionPermsUserCreate
     * @summary Create collection user permissions.
     * @request POST:/api-v2/collection/{collection_id}/perms/user/{user_id}
     */
    collectionPermsUserCreate: (
      collectionId: string,
      userId: string,
      body: CollectionPermsUserCreatePayload,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          get_metadata_and_previews: boolean;
          edit_permissions: boolean;
          /** @format uuid */
          delegation_id?: string | null;
          edit_metadata_and_relations: boolean;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          updated_at: any;
          /** @format uuid */
          collection_id: string;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/user/${userId}`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionPermsUserDelete
     * @summary Delete collection user permissions.
     * @request DELETE:/api-v2/collection/{collection_id}/perms/user/{user_id}
     */
    collectionPermsUserDelete: (collectionId: string, userId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          get_metadata_and_previews: boolean;
          edit_permissions: boolean;
          /** @format uuid */
          delegation_id?: string | null;
          edit_metadata_and_relations: boolean;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          updated_at: any;
          /** @format uuid */
          collection_id: string;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/user/${userId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionPermsUserUpdate
     * @summary Update collection user permissions
     * @request PUT:/api-v2/collection/{collection_id}/perms/user/{user_id}/{perm_name}/{perm_val}
     */
    collectionPermsUserUpdate: (
      collectionId: string,
      userId: string,
      permName: CollectionPermsUserUpdateParamsEnum,
      permVal: boolean,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          get_metadata_and_previews: boolean;
          edit_permissions: boolean;
          /** @format uuid */
          delegation_id?: string | null;
          edit_metadata_and_relations: boolean;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          updated_at: any;
          /** @format uuid */
          collection_id: string;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/user/${userId}/${permName}/${permVal}`,
        method: "PUT",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionPermsGroupsDetail
     * @summary Query collection permissions.
     * @request GET:/api-v2/collection/{collection_id}/perms/groups
     */
    collectionPermsGroupsDetail: (collectionId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          collection_id: string;
          /** @format uuid */
          group_id: string;
          get_metadata_and_previews: boolean;
          edit_metadata_and_relations: boolean;
          created_at: any;
          updated_at: any;
        }[],
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/groups`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionPermsGroupDetail
     * @summary Get collection group permissions.
     * @request GET:/api-v2/collection/{collection_id}/perms/group/{group_id}
     */
    collectionPermsGroupDetail: (collectionId: string, groupId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          collection_id: string;
          /** @format uuid */
          group_id: string;
          get_metadata_and_previews: boolean;
          edit_metadata_and_relations: boolean;
          created_at: any;
          updated_at: any;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/group/${groupId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionPermsGroupCreate
     * @summary Create collection group permissions.
     * @request POST:/api-v2/collection/{collection_id}/perms/group/{group_id}
     */
    collectionPermsGroupCreate: (
      collectionId: string,
      groupId: string,
      body: CollectionPermsGroupCreatePayload,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          collection_id: string;
          /** @format uuid */
          group_id: string;
          get_metadata_and_previews: boolean;
          edit_metadata_and_relations: boolean;
          created_at: any;
          updated_at: any;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/group/${groupId}`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionPermsGroupDelete
     * @summary Delete collection group permissions.
     * @request DELETE:/api-v2/collection/{collection_id}/perms/group/{group_id}
     */
    collectionPermsGroupDelete: (collectionId: string, groupId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          collection_id: string;
          /** @format uuid */
          group_id: string;
          get_metadata_and_previews: boolean;
          edit_metadata_and_relations: boolean;
          created_at: any;
          updated_at: any;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/group/${groupId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Valid perm_name values are["get_metadata_and_previews" "get_full_size" "edit_metadata" "edit_permissions"]
     *
     * @name CollectionPermsGroupUpdate
     * @summary Update collection group permissions
     * @request PUT:/api-v2/collection/{collection_id}/perms/group/{group_id}/{perm_name}/{perm_val}
     */
    collectionPermsGroupUpdate: (
      collectionId: string,
      groupId: string,
      permName: CollectionPermsGroupUpdateParamsEnum,
      permVal: boolean,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          collection_id: string;
          /** @format uuid */
          group_id: string;
          get_metadata_and_previews: boolean;
          edit_metadata_and_relations: boolean;
          created_at: any;
          updated_at: any;
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/perms/group/${groupId}/${permName}/${permVal}`,
        method: "PUT",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMediaEntryArcsDetail
     * @summary Get collection media-entry arcs.
     * @request GET:/api-v2/collection/{collection_id}/media-entry-arcs
     */
    collectionMediaEntryArcsDetail: (collectionId: string, params: RequestParams = {}) =>
      this.request<
        {
          "collection-media-entry-arcs": {
            cover?: boolean | null;
            /** @format uuid */
            id: string;
            /** @format int32 */
            position?: number | null;
            /** @format uuid */
            media_entry_id: string;
            updated_at: any;
            /** @format uuid */
            collection_id: string;
            /** @format double */
            order?: number | null;
            created_at: any;
            highlight: boolean;
          }[];
        },
        any
      >({
        path: `/api-v2/collection/${collectionId}/media-entry-arcs`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMediaEntryArcCreate
     * @summary USER Context: Create collection media-entry arc
     * @request POST:/api-v2/collection/{collection_id}/media-entry-arc/{media_entry_id}
     */
    collectionMediaEntryArcCreate: (
      collectionId: string,
      mediaEntryId: string,
      body: {
        highlight?: boolean;
        cover?: boolean;
        /** @format double */
        order?: number;
        /** @format int32 */
        position?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/media-entry-arc/${mediaEntryId}`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMediaEntryArcUpdate
     * @summary USER Context: Update collection media-entry arc
     * @request PUT:/api-v2/collection/{collection_id}/media-entry-arc/{media_entry_id}
     */
    collectionMediaEntryArcUpdate: (
      collectionId: string,
      mediaEntryId: string,
      body: {
        highlight?: boolean;
        cover?: boolean;
        /** @format double */
        order?: number;
        /** @format int32 */
        position?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/media-entry-arc/${mediaEntryId}`,
        method: "PUT",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMediaEntryArcDelete
     * @summary USER Context: Delete collection media-entry arc
     * @request DELETE:/api-v2/collection/{collection_id}/media-entry-arc/{media_entry_id}
     */
    collectionMediaEntryArcDelete: (collectionId: string, mediaEntryId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/collection/${collectionId}/media-entry-arc/${mediaEntryId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionCollectionArcDetail
     * @summary Get collection collection arcs.
     * @request GET:/api-v2/collection/{parent_id}/collection-arc/{child_id}
     */
    collectionCollectionArcDetail: (parentId: string, childId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/collection/${parentId}/collection-arc/${childId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionCollectionArcCreate
     * @summary TODO: Create collection collection arc
     * @request POST:/api-v2/collection/{parent_id}/collection-arc/{child_id}
     */
    collectionCollectionArcCreate: (
      parentId: string,
      childId: string,
      body: {
        highlight?: boolean;
        /** @format double */
        order?: number;
        /** @format int32 */
        position?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${parentId}/collection-arc/${childId}`,
        method: "POST",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionCollectionArcUpdate
     * @summary USER Context: Update collection collection arc
     * @request PUT:/api-v2/collection/{parent_id}/collection-arc/{child_id}
     */
    collectionCollectionArcUpdate: (
      parentId: string,
      childId: string,
      body: {
        highlight?: boolean;
        /** @format double */
        order?: number;
        /** @format int32 */
        position?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection/${parentId}/collection-arc/${childId}`,
        method: "PUT",
        body: body,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionCollectionArcDelete
     * @summary USER Context: Delete collection collection arc
     * @request DELETE:/api-v2/collection/{parent_id}/collection-arc/{child_id}
     */
    collectionCollectionArcDelete: (parentId: string, childId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/collection/${parentId}/collection-arc/${childId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMediaEntryArcsList
     * @summary Query collection media-entry arcs.
     * @request GET:/api-v2/collection-media-entry-arcs/
     */
    collectionMediaEntryArcsList: (
      query?: {
        /** @format uuid */
        collection_id?: string;
        /** @format uuid */
        media_entry_id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection-media-entry-arcs/`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionMediaEntryArcsDetail2
     * @summary Get collection media-entry arc.
     * @request GET:/api-v2/collection-media-entry-arcs/{id}
     * @originalName collectionMediaEntryArcsDetail
     * @duplicate
     */
    collectionMediaEntryArcsDetail2: (id: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/collection-media-entry-arcs/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionCollectionArcsList
     * @summary Query collection collection arcs.
     * @request GET:/api-v2/collection-collection-arcs/
     */
    collectionCollectionArcsList: (
      query?: {
        /** @format uuid */
        child_id?: string;
        /** @format uuid */
        parent_id?: string;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        count?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/collection-collection-arcs/`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionCollectionArcsDetail
     * @summary Get collection collection arcs.
     * @request GET:/api-v2/collection-collection-arcs/{id}
     */
    collectionCollectionArcsDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/collection-collection-arcs/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionFullTextDetail
     * @summary PUBLIC/USER Context: Get full_text.
     * @request GET:/api-v2/collection/{collection_id}/full_text
     */
    collectionFullTextDetail: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/collection/${collectionId}/full_text`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionFullTextCreate
     * @summary USER Context: Create full_text for collection
     * @request POST:/api-v2/collection/{collection_id}/full_text
     */
    collectionFullTextCreate: (
      collectionId: string,
      body: {
        text: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/api-v2/collection/${collectionId}/full_text`,
        method: "POST",
        body: body,
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionFullTextUpdate
     * @summary USER Context: Update full_text for collection.
     * @request PUT:/api-v2/collection/{collection_id}/full_text
     */
    collectionFullTextUpdate: (
      collectionId: string,
      body: {
        text: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/api-v2/collection/${collectionId}/full_text`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CollectionFullTextDelete
     * @summary USER Context: Delete full_text.
     * @request DELETE:/api-v2/collection/{collection_id}/full_text
     */
    collectionFullTextDelete: (collectionId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/collection/${collectionId}/full_text`,
        method: "DELETE",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CustomUrlsList
     * @summary USER Context: Query and list custom_urls.
     * @request GET:/api-v2/custom_urls/
     */
    customUrlsList: (
      query?: {
        full_data?: boolean;
        id?: string;
        /** @format uuid */
        media_entry_id?: string;
        /** @format uuid */
        collection_id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/api-v2/custom_urls/`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CustomUrlsDetail
     * @summary USER Context: Get custom_url.
     * @request GET:/api-v2/custom_urls/{id}
     */
    customUrlsDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/custom_urls/${id}`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name EditSessionsList
     * @summary USER Context: List authed users edit_sessions.
     * @request GET:/api-v2/edit_sessions/
     */
    editSessionsList: (
      query?: {
        full_data?: boolean;
        /** @format int32 */
        page?: number;
        /** @format int32 */
        count?: number;
        /** @format uuid */
        id?: string;
        /** @format uuid */
        media_entry_id?: string;
        /** @format uuid */
        collection_id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/api-v2/edit_sessions/`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name EditSessionsDetail
     * @summary USER Context: Get edit_session.
     * @request GET:/api-v2/edit_sessions/{id}
     */
    editSessionsDetail: (id: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/edit_sessions/${id}`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name FavoriteMediaEntriesList
     * @summary USER Context: List users favorites media_entries ids.
     * @request GET:/api-v2/favorite/media-entries
     */
    favoriteMediaEntriesList: (params: RequestParams = {}) =>
      this.request<
        {
          media_entry_ids: string[];
        },
        any
      >({
        path: `/api-v2/favorite/media-entries`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name FavoriteCollectionsList
     * @summary USER Context: List users favorite_collections.
     * @request GET:/api-v2/favorite/collections
     */
    favoriteCollectionsList: (params: RequestParams = {}) =>
      this.request<
        {
          collection_ids: string[];
        },
        any
      >({
        path: `/api-v2/favorite/collections`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name FullTextsList
     * @summary USER Context: Query or list full_texts.
     * @request GET:/api-v2/full_texts
     */
    fullTextsList: (
      query?: {
        full_data?: boolean;
        /** @format uuid */
        media_resource_id?: string;
        text?: string;
        page?: string;
        count?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/api-v2/full_texts`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name FullTextsDetail
     * @summary USER Context: Get full_text.
     * @request GET:/api-v2/full_texts/{media_resource_id}
     */
    fullTextsDetail: (mediaResourceId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/full_texts/${mediaResourceId}`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntriesList
     * @summary Query media-entries.
     * @request GET:/api-v2/media-entries
     */
    mediaEntriesList: (
      query?: {
        me_edit_metadata?: boolean;
        public_get_full_size?: boolean;
        me_edit_permissions?: boolean;
        /** @format int32 */
        count?: number;
        filter_by?: string;
        me_get_metadata_and_previews?: boolean;
        me_get_full_size?: boolean;
        /** @format uuid */
        collection_id?: string;
        order?: string;
        /** @format int32 */
        page?: number;
        full_data?: boolean;
        public_get_metadata_and_previews?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          media_entries: {
            get_metadata_and_previews?: boolean;
            edit_session_updated_at?: any;
            get_full_size?: boolean;
            /** @format uuid */
            id: string;
            updated_at?: any;
            is_published?: boolean;
            created_at?: any;
            /** @format uuid */
            responsible_delegation_id?: string | null;
            meta_data_updated_at?: any;
            /** @format uuid */
            responsible_user_id?: string;
            /** @format uuid */
            creator_id?: string;
          }[];
          col_arcs?: {
            /** @format uuid */
            media_entry_id: string;
            /** @format uuid */
            id: string;
            /** @format double */
            order?: number | null;
            /** @format int32 */
            position?: number | null;
            created_at: any;
            updated_at: any;
          }[];
        },
        any
      >({
        path: `/api-v2/media-entries`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntriesRelatedDataList
     * @summary Query media-entries with all related data.
     * @request GET:/api-v2/media-entries-related-data
     */
    mediaEntriesRelatedDataList: (
      query?: {
        me_edit_metadata?: boolean;
        public_get_full_size?: boolean;
        me_edit_permissions?: boolean;
        /** @format int32 */
        count?: number;
        filter_by?: string;
        me_get_metadata_and_previews?: boolean;
        me_get_full_size?: boolean;
        /** @format uuid */
        collection_id?: string;
        order?: string;
        /** @format int32 */
        page?: number;
        full_data?: boolean;
        public_get_metadata_and_previews?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          media_entries: {
            get_metadata_and_previews?: boolean;
            edit_session_updated_at?: any;
            get_full_size?: boolean;
            /** @format uuid */
            id: string;
            updated_at?: any;
            is_published?: boolean;
            created_at?: any;
            /** @format uuid */
            responsible_delegation_id?: string | null;
            meta_data_updated_at?: any;
            /** @format uuid */
            responsible_user_id?: string;
            /** @format uuid */
            creator_id?: string;
          }[];
          meta_data: {
            json?: string | null;
            string?: string | null;
            /** @format uuid */
            other_media_entry_id?: string | null;
            /** @format uuid */
            id: string;
            /** @format uuid */
            media_entry_id?: string | null;
            /** @format uuid */
            collection_id?: string | null;
            type: string;
            meta_key_id: string;
            meta_data_updated_at: any;
          }[][];
          media_files: {
            /** @format int32 */
            width?: number | null;
            /** @format int32 */
            height?: number | null;
            /** @format uuid */
            uploader_id: string;
            /** @format uuid */
            id: string;
            extension: string;
            /** @format uuid */
            media_entry_id: string;
            updated_at: any;
            media_type?: string | null;
            conversion_profiles: any[];
            access_hash: string;
            created_at: any;
            meta_data?: string | null;
            /** @format int32 */
            size: number;
            guid: string;
            content_type: string;
            filename: string;
          }[];
          previews: {
            /** @format int32 */
            width?: number | null;
            /** @format int32 */
            height?: number | null;
            /** @format uuid */
            id: string;
            thumbnail: string;
            updated_at: any;
            media_type: string;
            conversion_profile?: string | null;
            created_at: any;
            /** @format uuid */
            media_file_id: string;
            content_type: string;
            filename: string;
          }[][];
          col_arcs?: {
            /** @format uuid */
            media_entry_id: string;
            /** @format uuid */
            id: string;
            /** @format double */
            order?: number | null;
            /** @format int32 */
            position?: number | null;
            created_at: any;
            updated_at: any;
          }[];
          col_meta_data?: {
            json?: string | null;
            string?: string | null;
            /** @format uuid */
            other_media_entry_id?: string | null;
            /** @format uuid */
            id: string;
            /** @format uuid */
            media_entry_id?: string | null;
            /** @format uuid */
            collection_id?: string | null;
            type: string;
            meta_key_id: string;
            meta_data_updated_at: any;
          }[];
        },
        any
      >({
        path: `/api-v2/media-entries-related-data`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryCreate
     * @summary TODO: Create media-entry. Only for testing. Use webapp until media-encoder is ready
     * @request POST:/api-v2/media-entry
     */
    mediaEntryCreate: (
      data: MediaEntryCreatePayload,
      query?: {
        copy_me_id?: string;
        collection_id?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/api-v2/media-entry`,
        method: "POST",
        query: query,
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryDetail
     * @summary Get media-entry for id.
     * @request GET:/api-v2/media-entry/{media_entry_id}
     */
    mediaEntryDetail: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          get_metadata_and_previews?: boolean;
          edit_session_updated_at?: any;
          get_full_size?: boolean;
          /** @format uuid */
          id: string;
          updated_at?: any;
          is_published?: boolean;
          created_at?: any;
          /** @format uuid */
          responsible_delegation_id?: string | null;
          meta_data_updated_at?: any;
          /** @format uuid */
          responsible_user_id?: string;
          /** @format uuid */
          creator_id?: string;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryDelete
     * @summary Delete media-entry for id.
     * @request DELETE:/api-v2/media-entry/{media_entry_id}
     */
    mediaEntryDelete: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/media-entry/${mediaEntryId}`,
        method: "DELETE",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPublishUpdate
     * @summary Try publish media-entry for id.
     * @request PUT:/api-v2/media-entry/{media_entry_id}/publish
     */
    mediaEntryPublishUpdate: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          get_metadata_and_previews?: boolean;
          edit_session_updated_at?: any;
          get_full_size?: boolean;
          /** @format uuid */
          id: string;
          updated_at?: any;
          is_published?: boolean;
          created_at?: any;
          /** @format uuid */
          responsible_delegation_id?: string | null;
          meta_data_updated_at?: any;
          /** @format uuid */
          responsible_user_id?: string;
          /** @format uuid */
          creator_id?: string;
        },
        {
          message: {
            is_publishable: boolean;
            /** @format uuid */
            media_entry_id: string;
            has_meta_data: Record<string, boolean>[];
          };
        }
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/publish`,
        method: "PUT",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPreviewDetail
     * @summary Get preview for media-entry id.
     * @request GET:/api-v2/media-entry/{media_entry_id}/preview
     */
    mediaEntryPreviewDetail: (
      mediaEntryId: string,
      query?: {
        size?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format int32 */
          width?: number | null;
          /** @format int32 */
          height?: number | null;
          /** @format uuid */
          id: string;
          thumbnail: string;
          updated_at: any;
          media_type: string;
          conversion_profile?: string | null;
          created_at: any;
          /** @format uuid */
          media_file_id: string;
          content_type: string;
          filename: string;
        },
        any
      >({
        //path: `/api-v2/media-entry/${mediaEntryId}/preview`,
        path: `/api-v2/media-entry/${mediaEntryId}/preview`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPreviewDataStreamDetail
     * @summary Get preview for media-entry id.
     * @request GET:/api-v2/media-entry/{media_entry_id}/preview/data-stream
     */
    mediaEntryPreviewDataStreamDetail: (
      mediaEntryId: string,
      query?: {
        size?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/api-v2/media-entry/${mediaEntryId}/preview/data-stream`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDataDetail
     * @summary Get meta-data for media-entry.
     * @request GET:/api-v2/media-entry/{media_entry_id}/meta-data
     */
    mediaEntryMetaDataDetail: (
      mediaEntryId: string,
      query?: {
        updated_after?: string;
        meta_keys?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-data`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDataRelatedDetail
     * @summary Get meta-data for media-entry.
     * @request GET:/api-v2/media-entry/{media_entry_id}/meta-data-related
     */
    mediaEntryMetaDataRelatedDetail: (
      mediaEntryId: string,
      query?: {
        updated_after?: string;
        meta_keys?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-data-related`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumDetail
     * @summary Get meta-data for media-entry and meta-key.
     * @request GET:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}
     */
    mediaEntryMetaDatumDetail: (mediaEntryId: string, metaKeyId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumDelete
     * @summary Delete meta-data for media-entry and meta-key
     * @request DELETE:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}
     */
    mediaEntryMetaDatumDelete: (mediaEntryId: string, metaKeyId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumTextCreate
     * @summary Create meta-data text for media-entry
     * @request POST:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/text
     */
    mediaEntryMetaDatumTextCreate: (
      mediaEntryId: string,
      metaKeyId: string,
      body: {
        string: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/text`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumTextUpdate
     * @summary Update meta-data text for media-entry
     * @request PUT:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/text
     */
    mediaEntryMetaDatumTextUpdate: (
      mediaEntryId: string,
      metaKeyId: string,
      body: {
        string: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/text`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumTextDateCreate
     * @summary Create meta-data text-date for media-entry
     * @request POST:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/text-date
     */
    mediaEntryMetaDatumTextDateCreate: (
      mediaEntryId: string,
      metaKeyId: string,
      body: {
        string: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/text-date`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumTextDateUpdate
     * @summary Update meta-data text-date for media-entry
     * @request PUT:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/text-date
     */
    mediaEntryMetaDatumTextDateUpdate: (
      mediaEntryId: string,
      metaKeyId: string,
      body: {
        string: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/text-date`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumJsonCreate
     * @summary Create meta-data json for media-entry
     * @request POST:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/json
     */
    mediaEntryMetaDatumJsonCreate: (
      mediaEntryId: string,
      metaKeyId: string,
      body: {
        json: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/json`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumJsonUpdate
     * @summary Update meta-data json for media-entry
     * @request PUT:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/json
     */
    mediaEntryMetaDatumJsonUpdate: (
      mediaEntryId: string,
      metaKeyId: string,
      body: {
        json: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/json`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumKeywordDetail
     * @summary Get meta-data keywords for media-entries meta-key
     * @request GET:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/keyword
     */
    mediaEntryMetaDatumKeywordDetail: (mediaEntryId: string, metaKeyId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/keyword`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumKeywordCreate
     * @summary Create meta-data keyword for media-entry.
     * @request POST:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/keyword/{keyword_id}
     */
    mediaEntryMetaDatumKeywordCreate: (
      mediaEntryId: string,
      metaKeyId: string,
      keywordId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/keyword/${keywordId}`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumKeywordDelete
     * @summary Delete meta-data keyword for media-entry.
     * @request DELETE:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/keyword/{keyword_id}
     */
    mediaEntryMetaDatumKeywordDelete: (
      mediaEntryId: string,
      metaKeyId: string,
      keywordId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/keyword/${keywordId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumPeopleDetail
     * @summary Get meta-data people for media-entries meta-key.
     * @request GET:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/people
     */
    mediaEntryMetaDatumPeopleDetail: (mediaEntryId: string, metaKeyId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/people`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumPeopleCreate
     * @summary Create meta-data people for a media-entries meta-key.
     * @request POST:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/people/{person_id}
     */
    mediaEntryMetaDatumPeopleCreate: (
      mediaEntryId: string,
      metaKeyId: string,
      personId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/people/${personId}`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumPeopleDelete
     * @summary Delete meta-data people for media-entry
     * @request DELETE:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/people/{person_id}
     */
    mediaEntryMetaDatumPeopleDelete: (
      mediaEntryId: string,
      metaKeyId: string,
      personId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/people/${personId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumRoleDetail
     * @summary Get meta-data role for media-entry.
     * @request GET:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/role
     */
    mediaEntryMetaDatumRoleDetail: (mediaEntryId: string, metaKeyId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/role`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumRoleDelete
     * @summary Delete meta-data role for media-entry.
     * @request DELETE:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/role/{role_id}/{person_id}
     */
    mediaEntryMetaDatumRoleDelete: (
      mediaEntryId: string,
      metaKeyId: string,
      roleId: string,
      personId: string,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/role/${roleId}/${personId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMetaDatumRoleCreate
     * @summary Create meta-data role for media-entry.
     * @request POST:/api-v2/media-entry/{media_entry_id}/meta-datum/{meta_key_id}/role/{role_id}/{person_id}/{position}
     */
    mediaEntryMetaDatumRoleCreate: (
      mediaEntryId: string,
      metaKeyId: string,
      roleId: string,
      personId: string,
      position: number,
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/api-v2/media-entry/${mediaEntryId}/meta-datum/${metaKeyId}/role/${roleId}/${personId}/${position}`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryCustomUrlDetail
     * @summary Get custom_url for media entry.
     * @request GET:/api-v2/media-entry/{media_entry_id}/custom_url
     */
    mediaEntryCustomUrlDetail: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          id: string;
          is_primary: boolean;
          /** @format uuid */
          creator_id: string;
          /** @format uuid */
          updator_id: string;
          updated_at: any;
          created_at: any;
          /** @format uuid */
          media_entry_id?: string | null;
          /** @format uuid */
          collection_id?: string | null;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/custom_url`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryCustomUrlCreate
     * @summary USER Context: Create custom_url for media entry.
     * @request POST:/api-v2/media-entry/{media_entry_id}/custom_url
     */
    mediaEntryCustomUrlCreate: (
      mediaEntryId: string,
      body: {
        id: string;
        is_primary: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: string;
          is_primary: boolean;
          /** @format uuid */
          creator_id: string;
          /** @format uuid */
          updator_id: string;
          updated_at: any;
          created_at: any;
          /** @format uuid */
          media_entry_id?: string | null;
          /** @format uuid */
          collection_id?: string | null;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/custom_url`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryCustomUrlUpdate
     * @summary USER Context: Update custom_url for media entry.
     * @request PUT:/api-v2/media-entry/{media_entry_id}/custom_url
     */
    mediaEntryCustomUrlUpdate: (
      mediaEntryId: string,
      body: {
        id?: string;
        is_primary?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: string;
          is_primary: boolean;
          /** @format uuid */
          creator_id: string;
          /** @format uuid */
          updator_id: string;
          updated_at: any;
          created_at: any;
          /** @format uuid */
          media_entry_id?: string | null;
          /** @format uuid */
          collection_id?: string | null;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/custom_url`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryCustomUrlDelete
     * @summary TODO: Delete custom_url for media entry.
     * @request DELETE:/api-v2/media-entry/{media_entry_id}/custom_url
     */
    mediaEntryCustomUrlDelete: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          id: string;
          is_primary: boolean;
          /** @format uuid */
          creator_id: string;
          /** @format uuid */
          updator_id: string;
          updated_at: any;
          created_at: any;
          /** @format uuid */
          media_entry_id?: string | null;
          /** @format uuid */
          collection_id?: string | null;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/custom_url`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryEditSessionsDetail
     * @summary PUBLIC/USER Context: Get edit_session list for media entry.
     * @request GET:/api-v2/media-entry/{media_entry_id}/edit_sessions
     */
    mediaEntryEditSessionsDetail: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          user_id: string;
          created_at: any;
          /** @format uuid */
          media_entry_id?: string | null;
          /** @format uuid */
          collection_id?: string | null;
        }[],
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/edit_sessions`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryEditSessionsCreate
     * @summary USER Context: Create edit session for media entry and authed user.
     * @request POST:/api-v2/media-entry/{media_entry_id}/edit_sessions
     */
    mediaEntryEditSessionsCreate: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          user_id: string;
          created_at: any;
          /** @format uuid */
          media_entry_id?: string | null;
          /** @format uuid */
          collection_id?: string | null;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/edit_sessions`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryFavoriteDetail
     * @summary USER Context: Get favorite_media_entry for authed user and media-entry.
     * @request GET:/api-v2/media-entry/{media_entry_id}/favorite
     */
    mediaEntryFavoriteDetail: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/favorite`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryFavoriteCreate
     * @summary USER Context: Create favorite_media_entry for authed user and media-entry.
     * @request POST:/api-v2/media-entry/{media_entry_id}/favorite
     */
    mediaEntryFavoriteCreate: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/favorite`,
        method: "POST",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryFavoriteDelete
     * @summary USER Context: Delete favorite_media_entry for authed user and media-entry.
     * @request DELETE:/api-v2/media-entry/{media_entry_id}/favorite
     */
    mediaEntryFavoriteDelete: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/favorite`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMediaFileDetail
     * @summary PUBLIC/USER Context: Get media-file for media-entry id.
     * @request GET:/api-v2/media-entry/{media_entry_id}/media-file
     */
    mediaEntryMediaFileDetail: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          previews: any;
          /** @format uuid */
          id: string;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          media_type?: string | null;
          created_at: any;
          /** @format int32 */
          size: number;
          content_type: string;
          filename: string;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/media-file`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryMediaFileDataStreamDetail
     * @summary PUBLIC/USER Context: Get media-file data-stream for media-entry id.
     * @request GET:/api-v2/media-entry/{media_entry_id}/media-file/data-stream
     */
    mediaEntryMediaFileDataStreamDetail: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/media-entry/${mediaEntryId}/media-file/data-stream`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPermsDetail
     * @summary PUBLIC/USER Context: List media-entry permissions.
     * @request GET:/api-v2/media-entry/{media_entry_id}/perms/
     */
    mediaEntryPermsDetail: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          "media-resource": {
            /** @format uuid */
            id: string;
            /** @format uuid */
            creator_id: string;
            is_published: boolean;
            get_metadata_and_previews?: boolean;
            get_full_size?: boolean;
            /** @format uuid */
            responsible_user_id?: string | null;
            /** @format uuid */
            responsible_delegation_id?: string | null;
          };
          users: {
            /** @format uuid */
            user_id: string;
            get_metadata_and_previews: boolean;
            edit_metadata: boolean;
            edit_permissions: boolean;
            /** @format uuid */
            delegation_id?: string | null;
            get_full_size: boolean;
            /** @format uuid */
            id: string;
            /** @format uuid */
            updator_id?: string | null;
            /** @format uuid */
            media_entry_id: string;
            updated_at: any;
            created_at: any;
          }[];
          groups: {
            get_metadata_and_previews: boolean;
            edit_metadata: boolean;
            get_full_size: boolean;
            /** @format uuid */
            group_id: string;
            /** @format uuid */
            id: string;
            /** @format uuid */
            updator_id?: string | null;
            /** @format uuid */
            media_entry_id: string;
            updated_at: any;
            created_at: any;
          }[];
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPermsResourcesDetail
     * @summary Query media-entry permissions.
     * @request GET:/api-v2/media-entry/{media_entry_id}/perms/resources
     */
    mediaEntryPermsResourcesDetail: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          creator_id: string;
          is_published: boolean;
          get_metadata_and_previews?: boolean;
          get_full_size?: boolean;
          /** @format uuid */
          responsible_user_id?: string | null;
          /** @format uuid */
          responsible_delegation_id?: string | null;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/resources`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Valid perm_name values are["get_metadata_and_previews" "get_full_size" "edit_metadata" "edit_permissions"]
     *
     * @name MediaEntryPermsResourcesUpdate
     * @summary Update media-entry entity permissions
     * @request PUT:/api-v2/media-entry/{media_entry_id}/perms/resources
     */
    mediaEntryPermsResourcesUpdate: (
      mediaEntryId: string,
      body: MediaEntryPermsResourcesUpdatePayload,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          creator_id: string;
          is_published: boolean;
          get_metadata_and_previews?: boolean;
          get_full_size?: boolean;
          /** @format uuid */
          responsible_user_id?: string | null;
          /** @format uuid */
          responsible_delegation_id?: string | null;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/resources`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Valid perm_name values are["get_metadata_and_previews" "get_full_size" "edit_metadata" "edit_permissions"]
     *
     * @name MediaEntryPermsResourceUpdate
     * @summary Update media-entry entity permissions
     * @request PUT:/api-v2/media-entry/{media_entry_id}/perms/resource/{perm_name}/{perm_val}
     */
    mediaEntryPermsResourceUpdate: (
      mediaEntryId: string,
      permName: MediaEntryPermsResourceUpdateParamsEnum,
      permVal: boolean,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          creator_id: string;
          is_published: boolean;
          get_metadata_and_previews?: boolean;
          get_full_size?: boolean;
          /** @format uuid */
          responsible_user_id?: string | null;
          /** @format uuid */
          responsible_delegation_id?: string | null;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/resource/${permName}/${permVal}`,
        method: "PUT",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPermsUsersDetail
     * @summary Query media-entry user permissions.
     * @request GET:/api-v2/media-entry/{media_entry_id}/perms/users
     */
    mediaEntryPermsUsersDetail: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          get_metadata_and_previews: boolean;
          edit_metadata: boolean;
          edit_permissions: boolean;
          /** @format uuid */
          delegation_id?: string | null;
          get_full_size: boolean;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        }[],
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/users`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPermsUserDetail
     * @summary Get media-entry user permissions.
     * @request GET:/api-v2/media-entry/{media_entry_id}/perms/user/{user_id}
     */
    mediaEntryPermsUserDetail: (mediaEntryId: string, userId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          get_metadata_and_previews: boolean;
          edit_metadata: boolean;
          edit_permissions: boolean;
          /** @format uuid */
          delegation_id?: string | null;
          get_full_size: boolean;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/user/${userId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPermsUserCreate
     * @summary Create media-entry user permissions.
     * @request POST:/api-v2/media-entry/{media_entry_id}/perms/user/{user_id}
     */
    mediaEntryPermsUserCreate: (
      mediaEntryId: string,
      userId: string,
      body: MediaEntryPermsUserCreatePayload,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          get_metadata_and_previews: boolean;
          edit_metadata: boolean;
          edit_permissions: boolean;
          /** @format uuid */
          delegation_id?: string | null;
          get_full_size: boolean;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/user/${userId}`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPermsUserDelete
     * @summary Delete media-entry user permissions.
     * @request DELETE:/api-v2/media-entry/{media_entry_id}/perms/user/{user_id}
     */
    mediaEntryPermsUserDelete: (mediaEntryId: string, userId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          get_metadata_and_previews: boolean;
          edit_metadata: boolean;
          edit_permissions: boolean;
          /** @format uuid */
          delegation_id?: string | null;
          get_full_size: boolean;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/user/${userId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Valid perm_name values are["get_metadata_and_previews" "get_full_size" "edit_metadata" "edit_permissions"]
     *
     * @name MediaEntryPermsUserUpdate
     * @summary Update media-entry user permissions
     * @request PUT:/api-v2/media-entry/{media_entry_id}/perms/user/{user_id}/{perm_name}/{perm_val}
     */
    mediaEntryPermsUserUpdate: (
      mediaEntryId: string,
      userId: string,
      permName: MediaEntryPermsUserUpdateParamsEnum,
      permVal: boolean,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          user_id: string;
          get_metadata_and_previews: boolean;
          edit_metadata: boolean;
          edit_permissions: boolean;
          /** @format uuid */
          delegation_id?: string | null;
          get_full_size: boolean;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/user/${userId}/${permName}/${permVal}`,
        method: "PUT",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPermsGroupsDetail
     * @summary Query media-entry group permissions.
     * @request GET:/api-v2/media-entry/{media_entry_id}/perms/groups
     */
    mediaEntryPermsGroupsDetail: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<
        {
          get_metadata_and_previews: boolean;
          edit_metadata: boolean;
          get_full_size: boolean;
          /** @format uuid */
          group_id: string;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        }[],
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/groups`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPermsGroupDetail
     * @summary Get media-entry group permissions.
     * @request GET:/api-v2/media-entry/{media_entry_id}/perms/group/{group_id}
     */
    mediaEntryPermsGroupDetail: (mediaEntryId: string, groupId: string, params: RequestParams = {}) =>
      this.request<
        {
          get_metadata_and_previews: boolean;
          edit_metadata: boolean;
          get_full_size: boolean;
          /** @format uuid */
          group_id: string;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/group/${groupId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPermsGroupCreate
     * @summary Create media-entry group permissions.
     * @request POST:/api-v2/media-entry/{media_entry_id}/perms/group/{group_id}
     */
    mediaEntryPermsGroupCreate: (
      mediaEntryId: string,
      groupId: string,
      body: MediaEntryPermsGroupCreatePayload,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          get_metadata_and_previews: boolean;
          edit_metadata: boolean;
          get_full_size: boolean;
          /** @format uuid */
          group_id: string;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/group/${groupId}`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryPermsGroupDelete
     * @summary Delete media-entry group permissions.
     * @request DELETE:/api-v2/media-entry/{media_entry_id}/perms/group/{group_id}
     */
    mediaEntryPermsGroupDelete: (mediaEntryId: string, groupId: string, params: RequestParams = {}) =>
      this.request<
        {
          get_metadata_and_previews: boolean;
          edit_metadata: boolean;
          get_full_size: boolean;
          /** @format uuid */
          group_id: string;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/group/${groupId}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Valid perm_name values are["get_metadata_and_previews" "get_full_size" "edit_metadata" "edit_permissions"]
     *
     * @name MediaEntryPermsGroupUpdate
     * @summary Update media-entry group permissions
     * @request PUT:/api-v2/media-entry/{media_entry_id}/perms/group/{group_id}/{perm_name}/{perm_val}
     */
    mediaEntryPermsGroupUpdate: (
      mediaEntryId: string,
      groupId: string,
      permName: MediaEntryPermsGroupUpdateParamsEnum,
      permVal: boolean,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          get_metadata_and_previews: boolean;
          edit_metadata: boolean;
          get_full_size: boolean;
          /** @format uuid */
          group_id: string;
          /** @format uuid */
          id: string;
          /** @format uuid */
          updator_id?: string | null;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          created_at: any;
        },
        any
      >({
        path: `/api-v2/media-entry/${mediaEntryId}/perms/group/${groupId}/${permName}/${permVal}`,
        method: "PUT",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryFullTextDetail
     * @summary PUBLIC/USER Context: Get full_text.
     * @request GET:/api-v2/media-entry/{media_entry_id}/full_text
     */
    mediaEntryFullTextDetail: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/media-entry/${mediaEntryId}/full_text`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryFullTextCreate
     * @summary USER Context: Create full_text for collection
     * @request POST:/api-v2/media-entry/{media_entry_id}/full_text
     */
    mediaEntryFullTextCreate: (
      mediaEntryId: string,
      body: {
        text: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/api-v2/media-entry/${mediaEntryId}/full_text`,
        method: "POST",
        body: body,
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryFullTextUpdate
     * @summary USER Context: Update full_text for collection.
     * @request PUT:/api-v2/media-entry/{media_entry_id}/full_text
     */
    mediaEntryFullTextUpdate: (
      mediaEntryId: string,
      body: {
        text: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/api-v2/media-entry/${mediaEntryId}/full_text`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaEntryFullTextDelete
     * @summary USER Context: Delete full_text.
     * @request DELETE:/api-v2/media-entry/{media_entry_id}/full_text
     */
    mediaEntryFullTextDelete: (mediaEntryId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/media-entry/${mediaEntryId}/full_text`,
        method: "DELETE",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaFileDetail
     * @summary PUBLIC/USER Context: Get media-file for id.
     * @request GET:/api-v2/media-file/{media_file_id}
     */
    mediaFileDetail: (mediaFileId: string, params: RequestParams = {}) =>
      this.request<
        {
          previews: any;
          /** @format uuid */
          id: string;
          /** @format uuid */
          media_entry_id: string;
          updated_at: any;
          media_type?: string | null;
          created_at: any;
          /** @format int32 */
          size: number;
          content_type: string;
          filename: string;
        },
        any
      >({
        path: `/api-v2/media-file/${mediaFileId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name MediaFileDataStreamDetail
     * @summary PUBLIC/USER Context: Get media-file data-stream for id.
     * @request GET:/api-v2/media-file/{media_file_id}/data-stream
     */
    mediaFileDataStreamDetail: (mediaFileId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/media-file/${mediaFileId}/data-stream`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Get meta-data for id. TODO: should return 404, if no such meta-data role exists.
     *
     * @name MetaDataDetail
     * @summary Get meta-data for id
     * @request GET:/api-v2/meta-data/{meta_datum_id}
     */
    metaDataDetail: (metaDatumId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/meta-data/${metaDatumId}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get meta-data data-stream.
     *
     * @name MetaDataDataStreamDetail
     * @summary Get meta-data data-stream.
     * @request GET:/api-v2/meta-data/{meta_datum_id}/data-stream
     */
    metaDataDataStreamDetail: (metaDatumId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/meta-data/${metaDatumId}/data-stream`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Get meta-data role for id. TODO: should return 404, if no such meta-data role exists.
     *
     * @name MetaDataRoleDetail
     * @summary Get meta-data role for id
     * @request GET:/api-v2/meta-data/{meta_datum_id}/role
     */
    metaDataRoleDetail: (metaDatumId: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/api-v2/meta-data/${metaDatumId}/role`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PreviewsDetail
     * @summary Get preview for id.
     * @request GET:/api-v2/previews/{preview_id}
     */
    previewsDetail: (previewId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/previews/${previewId}`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name PreviewsDataStreamDetail
     * @summary Get preview data-stream for id.
     * @request GET:/api-v2/previews/{preview_id}/data-stream
     */
    previewsDataStreamDetail: (previewId: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/previews/${previewId}/data-stream`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Get list of roles.
     *
     * @name RolesList
     * @summary Get list of roles.
     * @request GET:/api-v2/roles/
     */
    rolesList: (
      query?: {
        /** @format int32 */
        page?: number;
        /** @format int32 */
        count?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          roles: {
            /** @format uuid */
            id: string;
            meta_key_id: string;
            labels: {
              de?: string | null;
              en?: string | null;
            };
            /** @format uuid */
            creator_id?: string;
            created_at?: any;
            updated_at?: any;
          }[];
        },
        any
      >({
        path: `/api-v2/roles/`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a role by id. Returns 404, if no such role exists.
     *
     * @name RolesDetail
     * @summary Get role by id
     * @request GET:/api-v2/roles/{id}
     */
    rolesDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          meta_key_id: string;
          labels: {
            de?: string | null;
            en?: string | null;
          };
          /** @format uuid */
          creator_id?: string;
          created_at?: any;
          updated_at?: any;
        },
        any
      >({
        path: `/api-v2/roles/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of users ids.
     *
     * @name UsersList
     * @summary USER Context: Get list of users ids.
     * @request GET:/api-v2/users/
     */
    usersList: (
      query?: {
        autocomplete?: string;
        /** @format uuid */
        institutional_id?: string;
        searchable?: string;
        email?: string;
        /** @format int32 */
        count?: number;
        /** @format uuid */
        person_id?: string;
        institution?: string;
        notes?: string;
        /** @format int32 */
        page?: number;
        full_data?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          users: {
            autocomplete?: string;
            institutional_id?: string | null;
            settings?: any;
            searchable?: string;
            is_deactivated?: boolean;
            /** @format uuid */
            id: string;
            email?: string;
            /** @format uuid */
            person_id?: string;
            /** @format uuid */
            accepted_usage_terms_id?: string | null;
            updated_at?: any;
            institution?: string | null;
            created_at?: any;
            notes?: string | null;
            login?: string;
            last_signed_in_at?: any;
          }[];
        },
        any
      >({
        path: `/api-v2/users/`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a user by id. Returns 404, if no such users exists.
     *
     * @name UsersDetail
     * @summary USER Context: Get user by id
     * @request GET:/api-v2/users/{id}
     */
    usersDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          autocomplete?: string;
          institutional_id?: string | null;
          settings?: any;
          searchable?: string;
          is_deactivated?: boolean;
          /** @format uuid */
          id: string;
          email?: string;
          /** @format uuid */
          person_id?: string;
          /** @format uuid */
          accepted_usage_terms_id?: string | null;
          updated_at?: any;
          institution?: string | null;
          created_at?: any;
          notes?: string | null;
          login?: string;
          last_signed_in_at?: any;
        },
        any
      >({
        path: `/api-v2/users/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of group ids. Paging is used as you get a limit of 100 entries.
     *
     * @name GroupsList
     * @summary Get all group ids
     * @request GET:/api-v2/groups/
     */
    groupsList: (
      query?: {
        institutional_id?: string;
        institutional_name?: string;
        searchable?: string;
        /** @format uuid */
        id?: string;
        /** @format int32 */
        count?: number;
        /** @format uuid */
        person_id?: string;
        name?: string;
        type?: string;
        /** @format int32 */
        page?: number;
        full_data?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          groups: {
            /** @format uuid */
            id: string;
            name?: string;
            type?: string;
            institutional_id?: string | null;
            institutional_name?: string | null;
            /** @format uuid */
            person_id?: string | null;
            searchable?: string;
          }[];
        },
        any
      >({
        path: `/api-v2/groups/`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get group by id. Returns 404, if no such group exists.
     *
     * @name GroupsDetail
     * @summary Get group by id
     * @request GET:/api-v2/groups/{id}
     */
    groupsDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          name?: string;
          type?: string;
          institutional_id?: string | null;
          institutional_name?: string | null;
          /** @format uuid */
          person_id?: string | null;
          searchable?: string;
        },
        any
      >({
        path: `/api-v2/groups/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsageTermsList
     * @summary PUBLIC Context: List usage_terms.
     * @request GET:/api-v2/usage-terms/
     */
    usageTermsList: (
      query?: {
        full_data?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          title?: string;
          version?: string;
          intro?: string;
          body?: string;
          created_at?: any;
          updated_at?: any;
        }[],
        any
      >({
        path: `/api-v2/usage-terms/`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsageTermsDetail
     * @summary PUBLIC Context: Get usage_terms by id.
     * @request GET:/api-v2/usage-terms/{id}
     */
    usageTermsDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          title?: string;
          version?: string;
          intro?: string;
          body?: string;
          created_at?: any;
          updated_at?: any;
        },
        any
      >({
        path: `/api-v2/usage-terms/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of vocabularies ids.
     *
     * @name VocabulariesList
     * @summary Get list of vocabularies ids.
     * @request GET:/api-v2/vocabularies
     */
    vocabulariesList: (
      query?: {
        /** @format int32 */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          vocabularies: {
            id: string;
            enabled_for_public_view: boolean;
            enabled_for_public_use: boolean;
            /** @format int32 */
            position: number;
            labels?: {
              de?: string | null;
              en?: string | null;
            };
            descriptions?: {
              de?: string | null;
              en?: string | null;
            };
            admin_comment?: string | null;
          }[];
        },
        any
      >({
        path: `/api-v2/vocabularies`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a vocabulary by id. Returns 404, if no such vocabulary exists.
     *
     * @name VocabulariesDetail
     * @summary Get vocabulary by id.
     * @request GET:/api-v2/vocabularies/{id}
     */
    vocabulariesDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          id: string;
          enabled_for_public_view: boolean;
          enabled_for_public_use: boolean;
          /** @format int32 */
          position: number;
          labels?: {
            de?: string | null;
            en?: string | null;
          };
          descriptions?: {
            de?: string | null;
            en?: string | null;
          };
          admin_comment?: string | null;
        },
        any
      >({
        path: `/api-v2/vocabularies/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name WorkflowsList
     * @summary ADMIN Context: List workflows.
     * @request GET:/api-v2/workflows/
     */
    workflowsList: (
      query?: {
        full_data?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          name?: string;
          is_active?: boolean;
          configuration?: any;
          /** @format uuid */
          creator_id?: string;
          created_at?: any;
          updated_at?: any;
        }[],
        any
      >({
        path: `/api-v2/workflows/`,
        method: "GET",
        query: query,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name WorkflowsCreate
     * @summary ADMIN Context: Create workflow.
     * @request POST:/api-v2/workflows/
     */
    workflowsCreate: (body: WorkflowsCreatePayload, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          name?: string;
          is_active?: boolean;
          configuration?: any;
          /** @format uuid */
          creator_id?: string;
          created_at?: any;
          updated_at?: any;
        },
        any
      >({
        path: `/api-v2/workflows/`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name WorkflowsDetail
     * @summary ADMIN Context: Get workflow by id.
     * @request GET:/api-v2/workflows/{id}
     */
    workflowsDetail: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          name?: string;
          is_active?: boolean;
          configuration?: any;
          /** @format uuid */
          creator_id?: string;
          created_at?: any;
          updated_at?: any;
        },
        any
      >({
        path: `/api-v2/workflows/${id}`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name WorkflowsUpdate
     * @summary ADMIN Context: Update workflow with id.
     * @request PUT:/api-v2/workflows/{id}
     */
    workflowsUpdate: (id: string, body: WorkflowsUpdatePayload, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          name?: string;
          is_active?: boolean;
          configuration?: any;
          /** @format uuid */
          creator_id?: string;
          created_at?: any;
          updated_at?: any;
        },
        any
      >({
        path: `/api-v2/workflows/${id}`,
        method: "PUT",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name WorkflowsDelete
     * @summary ADMIN Context: Delete workflow by id.
     * @request DELETE:/api-v2/workflows/{id}
     */
    workflowsDelete: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          name?: string;
          is_active?: boolean;
          configuration?: any;
          /** @format uuid */
          creator_id?: string;
          created_at?: any;
          updated_at?: any;
        },
        any
      >({
        path: `/api-v2/workflows/${id}`,
        method: "DELETE",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ManagementStatusList
     * @request GET:/api-v2/management/status
     */
    managementStatusList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/management/status`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name ManagementShutdownCreate
     * @request POST:/api-v2/management/shutdown
     */
    managementShutdownCreate: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api-v2/management/shutdown`,
        method: "POST",
        type: ContentType.Json,
        ...params,
      }),
  };
  test = {
    /**
     * No description
     *
     * @name ExceptionList
     * @request GET:/test/exception
     */
    exceptionList: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/test/exception`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name GetTest
     * @request GET:/test/ok
     */
    getTest: (params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/test/ok`,
        method: "GET",
        type: ContentType.Json,
        ...params,
      }),
  };
}
