import { api_pass } from "@/lib/constants";
import md5 from "md5";

const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const authString = `${api_pass}_${currentDate}`;

export function createAuthHash() {
  const hash = md5(authString);

  return { hash }
}