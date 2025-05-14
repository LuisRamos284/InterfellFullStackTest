import { RouteMethod } from "commons";
import { Request, Response } from "express";

export interface HttpControllerRequest {
  req: Request;
  res: Response;
  defaultMessage: string;
  method: RouteMethod;
}
