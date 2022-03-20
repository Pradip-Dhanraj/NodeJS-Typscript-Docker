import { Request, Response } from "express";
import config from 'config'
export function getUrlsHandler(req: Request, res: Response) {
    //@ts-ignore
    res.send({
        dburl: `${config.get("dbUri")}`
    });
}