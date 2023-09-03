import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isValidJson(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    console.log(str);

    return false;
  }
  return true;
}
