const app = require("../src/app");
const request = require("supertest");
const { connect, clearDatabase, closeDatabase } = require("../config/db");

let server;
beforeAll(async () => {
  await connect();
  server = app.listen(3001);
});

afterEach(async () => await clearDatabase());

afterAll(async (done) => {
  await closeDatabase();
  server.close(done);
});

describe("Sanitiy tests", () => {
  it("Should do a basic test", () => {
    expect(1 + 1).toBe(2);
  });
  it("Should trigger sanity endpoint", async () => {
    const response = await request(app).get("/sanity");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("pass!");
  });
});

describe("Events", () => {
  it("Should GET events", async () => {
    await request(app).get("/events").expect(200);
  });
  it("Should POST event ", async () => {
    await request(app)
      .post("/events")
      .send({ name: "John Doe", createdAt: Date.now() })
      .expect(200);
  });
  it("Should fail POST event ", async () => {
    await request(app).post("/events").expect(500);
  });
});
