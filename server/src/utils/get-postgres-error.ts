export function getPostgresError(error: unknown): { code?: string } | null {
  if (
    typeof error === "object" &&
    error !== null &&
    "cause" in error &&
    error.cause &&
    typeof error.cause === "object"
  ) {
    return error.cause as { code?: string }
  }

  return null
}
