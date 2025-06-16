import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("Images Endpoint Testing", () => {
  it("gets all images", async () => {
    const response = await request.get("/images");
    expect(response.status).toBe(200);
  });
  it("gets a single image with unknown id", async () => {
    const response = await request.get("/images/unknown");
    expect(response.status).toBe(400);
  });

  it("post with invalid data", async () => {
    const response = await request
      .post("/images/upload")
      .send({ invalid: "data" });
    expect(response.status).toBe(400);
  });
  it("editing unknown image", async () => {
    const response = await request.put("/images/unknown");
    expect(response.status).toBe(400);
  });

  it("deleting unknown image", async () => {
    const response = await request.delete("/images/unknown");
    expect(response.status).toBe(400);
  });
});
