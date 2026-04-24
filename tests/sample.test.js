const request = require("supertest");
const appModule = require("../app");

const app = appModule.app;
const add = appModule.add;

describe("API Tests", () => {

  test("GET / should return 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("GET unknown route", async () => {
    const res = await request(app).get('/unknown');
    expect(res.statusCode).toBe(404);
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

  test("app should be defined", () => {
    expect(app).toBeDefined();
  });

  test("multiply normal", () => {
    expect(appModule.multiply(2, 3)).toBe(6);
  });

  test("multiply zero case", () => {
    expect(appModule.multiply(0, 5)).toBe(0);
  });

  test("add zero case", () => {
    expect(add(0, 0)).toBe(0);
  });

  test("multiply negative numbers", () => {
    expect(multiply(-2, 3)).toBe(-6);
  });

  test("multiply both negative", () => {
    expect(multiply(-2, -3)).toBe(6);
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
