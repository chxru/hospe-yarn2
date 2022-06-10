import fetch from "node-fetch";
import { serialize } from "cookie";
import { API } from "@hospe/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = "http://localhost:4000";

  try {
    const sr = await fetch(`${baseUrl}/login/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: JSON.stringify(req.body),
    });

    if (!sr.ok) throw new Error("Login request failed");

    const { access, refresh, ...user } = await sr.json() as API.IAM.Login.Res;
    if (!access || !refresh) throw new Error("Tokens are missing");

    const header = serialize("refresh_token", refresh, {
      httpOnly: true,
      // TODO: Sync this with IAM expire duration
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: true,
    });

    res.setHeader("Set-Cookie", header);
    res.status(200).json({ ...user, access });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
