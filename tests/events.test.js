const app = require("../src/app");
const supertest = require("supertest");
const request = supertest(app);
const { connect, clearDatabase, closeDatabase } = require("../config/db");

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe.skip("Event tests", () => {
  it("Get events", async () => {
    await request.get("/events").expect(200);
  });
  it("Post events", async () => {
    await request.post();
  });
});
