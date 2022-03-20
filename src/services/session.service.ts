import { User, users } from "../db/db";


export interface sessionTokenInterface {
    sessionid: string,
    email: string,
    valid: boolean
}

export interface refreshTokenInterface {
    sessionId: string
}

export const sessions: Record<string, sessionTokenInterface> = {

};

export function getSession(sessionid: string): sessionTokenInterface | false {
    const session = sessions[sessionid];
    return session && session.valid ? session : false;
}

export function setInvalidSession(sessionid: string): sessionTokenInterface {
    const session = sessions[sessionid];
    if (session) {
        session.valid = false;
    }
    return session;
}

export function createSession(email: string): sessionTokenInterface {
    const sessionid: string = String(Object.keys(sessions).length + 1);
    const sessionData: sessionTokenInterface = { sessionid: sessionid, email: email, valid: true };
    sessions[sessionid] = sessionData;
    return sessionData;
}

export function getuser(email: string): User | undefined {
    return users.find(user => user.email === email);
}

export function createUser(userData: User): boolean {
    users.push(userData);
    return users.includes(userData);
}