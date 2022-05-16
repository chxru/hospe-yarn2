import { DB } from "../db";

export namespace API {
  export namespace IAM {
    export interface JWT {
      id: string,
      role: string
    }

    export namespace Login {
      export interface Req {
        email: string,
        password: string
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      export interface Res extends DB.User.PublicData {
        access: string,
        refresh: string
      }
    }

    export namespace Refresh {
      export interface Req {
        refreshToken: string
      }

      export type Res = Login.Res;
    }

    export namespace Register {
      export interface Req {
        email: string,
        fname: string,
        lname: string,
        password: string
      }

      export type Res = Login.Res;
    }
  }
}
