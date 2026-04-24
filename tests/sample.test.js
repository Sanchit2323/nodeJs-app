const request = require("supertest");
const appModule = require("../app");

const app = appModule.app;
const add = appModule.add;

describe("API Tests", () => {

  test("GET / should return 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("GET /about", async () => {
    const res = await request(app).get("/about");
    expect(res.statusCode).toBe(200);
  });

  test("GET /contact", async () => {
    const res = await request(app).get("/contact");
    expect(res.statusCode).toBe(200);
  });

  test("GET /api/info", async () => {
    const res = await request(app).get("/api/info");
    expect(res.statusCode).toBe(200);
    expect(res.body.company).toBe("Sanchit Technologies");
  });

  test("GET invalid route should return 404", async () => {
    const res = await request(app).get("/random");
    expect(res.statusCode).toBe(404);
  });

});

describe("Function Tests", () => {

  test("addition positive", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("addition negative", () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test("addition mixed", () => {
    expect(add(-2, 3)).toBe(1);
  });

});
