// lib/api.ts
import axios from "axios";

export async function api<T>(path: string): Promise<T> {
  // Choose base URL depending on environment
  const baseURL =
    typeof window === "undefined"
      ? "http://localhost:3001/api/bookora" // SSR (Node.js)
      : "/api/bookora";                     // Browser

  try {
    const res = await axios.get<T>(`${baseURL}${path}`, {
      // Equivalent to fetch(..., { cache: "no-store" })
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return res.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Axios throws automatically on non-2xx, mimic your old Error(await res.text())
    throw new Error(
      err.response?.data?.message || err.message || "API request failed"
    );
  }
}
