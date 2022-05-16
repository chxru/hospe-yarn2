export namespace DB {
  export namespace User {
    export interface Data {
      _id: string,
      name: {
        first: string,
        last: string,
      },
      email: string,
      permission: {
        admin: boolean,
        doctor: boolean,
        user: boolean
      },
      password: string
    }

    export type PublicData = Omit<Data, "password" | "permission">;
  }
}
