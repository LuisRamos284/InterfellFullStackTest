import useSWR, { SWRResponse } from "swr";
import { HttpExceptionBody, RouteMethod } from "commons";
import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const defaultContentType = "application/json";

export type ApiResponse<T> =
  | { response: T; error: null }
  | { response: null; error: HttpExceptionBody };

interface ApiGetParams {
  path: string;
  contentType?: string;
  header?: Record<string, string>;
  query?: Record<string, string | string[]>;
  formData?: FormData;
}

type ApiFunctionGetParams = ApiGetParams;

export type MakeApiMutationParams<U> = ApiGetParams & {
  body?: U;
  method: RouteMethod;
};

type ApiMutationParams<U> = MakeApiMutationParams<U>;
function getHeaders(
  contentTypeSent: string | undefined,
  headersSent: Record<string, string> | undefined,
  formData?: FormData
): {
  "Content-Type"?: string;
} {
  const contentType = contentTypeSent || defaultContentType;

  return {
    ...headersSent,
    ...(!formData && { "Content-Type": `${contentType}` }),
  };
}

function getUrl(
  path: string,
  params: Record<string, string | string[]> | undefined
): string {
  //Using BaseRoute, path already have an initial /
  const url = `${BASE_URL}/v1${path}`;

  if (!params) return url;

  const queryParams = Object.keys(params)
    .map((k) => {
      if (typeof params[k] === "string") {
        return `${encodeURIComponent(k)}=${encodeURIComponent(
          params[k] as string
        )}`;
      }
      return (params[k] as string[])
        .map(
          (param) =>
            `${encodeURIComponent(k)}[]=${encodeURIComponent(param as string)}`
        )
        .join("&");
    })
    .join("&");

  return `${url}?${queryParams}`;
}

async function doFetch<T>(
  url: string,
  fetchParams: {
    method: RouteMethod;
    body?: string | FormData;
    headers: Record<string, string>;
  }
): Promise<ApiResponse<T>> {
  const { method, body, headers } = fetchParams;

  try {
    const response = await axios(url, {
      withCredentials: false,
      method,
      headers,
      data: body,
    });

    return { response: response.data, error: null };
  } catch (error) {
    console.log(error);
    return {
      response: null,
      error: (error as AxiosError)!.response!.data as HttpExceptionBody,
    };
  }
}

export const doApiMutation = async <T, U>(
  payload: ApiMutationParams<U>
): Promise<ApiResponse<T>> => {
  const {
    path,
    contentType: contentTypeSent,
    header,
    method,
    query,
    body,
    formData,
  } = payload;

  const url = getUrl(path, query);

  const headers = getHeaders(contentTypeSent, header, formData);

  try {
    return doFetch(url, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
      ...(!body && formData && { body: formData }),
    });
  } catch (error) {
    throw Error(error as string);
  }
};

export const makeApiMutation = async <T, U>(
  payload: MakeApiMutationParams<U>
): Promise<ApiResponse<T>> => {
  return doApiMutation({ ...payload });
};

export const makeApiGetRequest = async <T>(
  payload: ApiFunctionGetParams
): Promise<ApiResponse<T>> => {
  const { path, contentType: contentTypeSent, header, query } = payload;
  console.log(path);

  const url = getUrl(path, query);

  const headers = getHeaders(contentTypeSent, header);

  try {
    return doFetch(url, {
      method: RouteMethod.GET,
      headers,
    });
  } catch (error) {
    throw Error(error as string);
  }
};

/**
 * Hook for making server calls for GET requests.
 * First generic is for the response type, second is for the body type.
 * Pass in false as the params to not fetch (for conditional fetching)
 * @param params
 * @returns
 */
export function useApi<T>(
  params: false | ApiGetParams,
  refreshInterval?: number,
  revalidateOnFocus = false
): SWRResponse<ApiResponse<T>> {
  const response = useSWR(
    params && {
      ...params,
    },
    (...args) => makeApiGetRequest<T>(...args),
    {
      revalidateOnFocus,
      refreshWhenHidden: true,
      refreshInterval,
    }
  );

  return response;
}
