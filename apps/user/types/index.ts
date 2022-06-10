import { NextPage } from "next";

type NextApplicationPage<P = unknown, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

export type { NextApplicationPage };
