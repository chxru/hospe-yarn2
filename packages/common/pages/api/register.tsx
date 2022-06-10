import fetch from "node-fetch";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { API } from "@hospe/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = "http://localhost:4000";

  try {
    const sr = await fetch(`${baseUrl}/register/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: JSON.stringify(req.body),
    });

    if (!sr.ok) throw new Error("Register request failed");

    const { access, refresh, ...user } = await sr.json() as API.IAM.Register.Res;

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
