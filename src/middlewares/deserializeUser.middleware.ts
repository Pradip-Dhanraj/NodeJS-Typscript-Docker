import { NextFunction, Request, Response } from "express";
import { payloadStructure, verifyIfJwtExpired, signJwt } from "../utils/jwt.utils";
import { getSession, refreshTokenInterface } from "../services/session.service";

export function deserializeUser(req: Request, res: Response, next: NextFunction) {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken) {
        return next();
    }

    const { payload, expired }: payloadStructure = verifyIfJwtExpired(accessToken);
    if (payload) {
        //@ts-ignore
        req.user = payload;
        return next();
    }
    const { payload: refresh } =
        expired && refreshToken ? verifyIfJwtExpired(refreshToken) : { payload: null };

    if (!refresh) {
        return next();
    }

    // @ts-ignore
    const session = getSession(refresh.sessionId);

    if (!session) {
        return next();
    }

    const newAccessToken = signJwt(session, "30000");

    res.cookie("accessToken", newAccessToken, {
        maxAge: 300000, // 5 minutes
        httpOnly: true,
    });

    // @ts-ignore
    req.user = verifyIfJwtExpired(newAccessToken).payload;

    return next();
}