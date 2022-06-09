const request = require("supertest");
const app = require("../../../app");

describe("POST /v1/auth/login", () => {
  it("should response with 201 as status code", async () => {
    const email = "member101009@gmail.com";
    const password = "123";

    return request(app)
      .post("/v1/auth/login")
      .set("Content-Type", "application/json")
      .send({email, password })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            ...res.body,
          })
        );
      });
  });

  it("should response with 404 as status code", async () => {
    const email = "1";
    const password = "";

    return request(app)
      .post("/v1/auth/login")
      .set("Content-Type", "application/json")
      .send({email, password})
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
          expect.objectContaining({
            error: {
              name: expect.any(String),
              message: expect.any(String),
              details:{
                email: expect.any(String),
              }
            },
          })
        );
      });
  });
});
