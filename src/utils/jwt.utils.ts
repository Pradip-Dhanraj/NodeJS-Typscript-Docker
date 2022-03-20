import config from "config";
import jwt from "jsonwebtoken";

export interface payloadStructure {
    payload: null | jwt.JwtPayload | string,
    expired: boolean | string
}

const publicKey = Buffer.from(
    config.get<string>("publicKey"),
    "base64"
).toString("ascii");
const privateKey = Buffer.from(
    config.get<string>("privateKey"),
    "base64"
).toString("ascii");

export function signJwt(object: Object, expiredIn: string | number, options?: jwt.SignOptions | undefined) {
    try {
        return jwt.sign(object, privateKey, {
            ...(options && options),
            algorithm: "RS256",
            expiresIn: expiredIn
        });
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

export function verifyIfJwtExpired(token: string): payloadStructure {
    try {
        const decoded = jwt.verify(token, publicKey);
        return { payload: decoded, expired: false };
    } catch (error) {
        return { payload: null, expired: "jwt expired" };
    }
}

/// generic type verificaiton with jwt
function verifyJwt<T>(token: string): T | null {
    try {
        const decoded = jwt.verify(token, publicKey) as T;
        return decoded;
    } catch (e) {
        return null;
    }
}