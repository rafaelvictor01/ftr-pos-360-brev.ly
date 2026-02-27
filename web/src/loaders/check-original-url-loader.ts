import type { LoaderFunctionArgs } from "react-router"

import { getOriginalUrl } from "../services/get-original-url"

export async function checkOriginalUrlLoader({ params }: LoaderFunctionArgs) {
  return getOriginalUrl(params.shortCode!)
}
