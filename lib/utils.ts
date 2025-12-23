import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//可以按照实际情况切换 className 的名称，很干净
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
