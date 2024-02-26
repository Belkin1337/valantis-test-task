import { api_point } from "../constants";
import { createAuthHash } from "../utils/auth";

export const fetchAPI = async (
  action: string,
  params: Record<string, string | string[] | number | undefined>,
) => {
  const { hash } = createAuthHash();

  const response = await fetch(api_point, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": hash,
    },
    body: JSON.stringify({
      action,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};