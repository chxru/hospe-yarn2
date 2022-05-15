import fetch from "node-fetch";
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

    const data = await sr.json();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      err: error instanceof Error ? error.message : "Unknown error",
    });
  }
}