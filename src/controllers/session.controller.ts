import { NextFunction, Request, Response } from "express";
import { createSession, getuser, sessionTokenInterface, refreshTokenInterface, setInvalidSession } from "../services/session.service";
import { signJwt, verifyIfJwtExpired } from "../utils/jwt.utils";

export function createSessionHandler(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = getuser(email);
    if (!user || user.password !== password) {
        return res.status(401).send("invalid email or password");
    }

    const session: sessionTokenInterface = createSession(email);

    const accessToken = signJwt(user, "300000");

    const refreshTokenObject: refreshTokenInterface = { sessionId: session.sessionid };

    const refreshToken = signJwt(refreshTokenObject, "1y");

    res.cookie("accessToken", accessToken, {
        maxAge: 300000,
        httpOnly: true
    });

    res.cookie("refreshToken", refreshToken, {
        maxAge: 3.156e+10,
        httpOnly: true
    });

    res.send(session);
}

export function getSessionHandler(req: Request, res: Response) {
    //@ts-ignore
    res.send(req.user);
}

export function deleteSessionHandler(req: Request, res: Response) {
    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true
    });

    res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true
    });

    //@ts-ignore
    setInvalidSession(req.user.sessionid);

    //@ts-ignore
    res.send(req.user);
}