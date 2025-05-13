enum RouteMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type HttpExceptionBody = {
  message: string | string[];
  error?: string;
  statusCode: number;
};

export { RouteMethod };
export type { HttpExceptionBody };
