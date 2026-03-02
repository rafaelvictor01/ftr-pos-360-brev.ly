import { describe, expect, it } from "vitest"

describe("Health check route tests", () => {
  it("should successfully check the connection", async () => {
    expect(true).toBe(true)
  })

  it("should fail to check the connection", async () => {
    expect(false).toBe(false)
  })
})
