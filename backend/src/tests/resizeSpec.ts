import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("Testing resize endpoint", () => {
  it("resize with invalid data", async () => {
    const response = await request.post("/resize");
    expect(response.status).toBe(404);
  });
});
