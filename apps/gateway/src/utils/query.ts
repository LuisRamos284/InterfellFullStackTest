import url from "url";
import { Request } from "express";

export const buildQueryParamsFromRequest = (req: Request): string => {
  const query = JSON.parse(JSON.stringify(req.query));
  const params = new url.URLSearchParams(query);
  return params.toString();
};
