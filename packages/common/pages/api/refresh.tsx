import fetch from "node-fetch";
import type { NextApiRequest, NextApiResponse } from "next";
import { API } from "@hospe/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = "http://localhost:4000";

  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      res.status(403).json({ err: "no-token" });
      return;
    }    

    const sr = await fetch(`${baseUrl}/refresh/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      body: JSON.stringify({ refreshToken }),
    });

    if (!sr.ok) throw new Error("Refresh request failed");

    const data = await sr.json() as API.IAM.Refresh.Res;

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
