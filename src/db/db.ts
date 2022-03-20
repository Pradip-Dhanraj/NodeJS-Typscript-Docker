export interface UserStructure {
    email: string,
    password: string,
    name: string
}


export class User implements UserStructure {
    email: string
    password: string
    name: string
}

export const users: UserStructure[] = [
    {
        email: "pradip.dhanraj@gmail.com",
        password: "password",
        name: "Pradip Dhanraj"
    }
]