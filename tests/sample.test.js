const request = require("supertest");
const appModule = require("../app");

const app = appModule.app;
const add = appModule.add;
const multiply = appModule.multiply;

describe("API Tests", () => {

  test("GET / should return 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("multiply normal", () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test("multiply zero first", () => {
    expect(multiply(0, 5)).toBe(0);
  });

  test("multiply zero second", () => {
    expect(multiply(5, 0)).toBe(0);
  });

  test("multiply negative", () => {
    expect(multiply(-2, 3)).toBe(-6);
  });

  test("multiply both negative", () => {
    expect(multiply(-2, -3)).toBe(6);
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

  test("multiply negative numbers", () => {
    expect(multiply(-2, 3)).toBe(-6);
  });

  test("multiply both negative", () => {
    expect(multiply(-2, -3)).toBe(6);
  });

  test("add zero", () => {
    expect(add(0, 5)).toBe(5);
  });

  test("multiply normal", () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test("multiply zero case", () => {
    expect(multiply(0, 5)).toBe(0);
  });

  test("multiply zero second param", () => {
    expect(multiply(5, 0)).toBe(0);
  });
  
  test("multiply normal", () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test("multiply zero case", () => {
    expect(multiply(0, 5)).toBe(0);
  });

  test("multiply zero second param", () => {
    expect(multiply(5, 0)).toBe(0);
  });

  test("multiply negative numbers", () => {
    expect(multiply(-2, 3)).toBe(-6);
  });

  test("multiply both negative", () => {
    expect(multiply(-2, -3)).toBe(6);
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

  test("add zero case", () => {
    expect(add(0, 0)).toBe(0);
  });

  test("add large numbers", () => {
    expect(add(1000, 2000)).toBe(3000);
  });

// MULTIPLY EDGE CASES
  test("multiply negative numbers", () => {
    expect(multiply(-2, 3)).toBe(-6);
  });

  test("multiply both negative", () => {
    expect(multiply(-2, -3)).toBe(6);
  });

  test("multiply with zero", () => {
    expect(multiply(0, 10)).toBe(0);
  });

  // ADD FUNCTION FULL COVERAGE

  test("add valid numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("add zero", () => {
    expect(add(0, 0)).toBe(0);
  });

  test("add negative numbers", () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test("add mixed numbers", () => {
    expect(add(-2, 3)).toBe(1);
  });

// IMPORTANT BRANCH CASES 🔥
  test("add invalid string input", () => {
    expect(add("a", 2)).toBeNaN();
  });

  test("add invalid second param", () => {
    expect(add(2, "b")).toBeNaN();
  });

  test("add both invalid", () => {
    expect(add("a", "b")).toBeNaN();
  });

// API EDGE CASES
  test("GET invalid route", async () => {
    const res = await request(app).get("/random");
    expect(res.statusCode).toBe(404);
  });

// INVALID INPUT CASE (important for coverage)
  test("add invalid input", () => {
    expect(add("a", 2)).toBeNaN();
  });

});
