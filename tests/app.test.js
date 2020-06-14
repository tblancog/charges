const app = require("../src/app");
const request = require("supertest");
const { connect, clearDatabase, closeDatabase } = require("../config/db");

let server;
beforeAll(async () => {
  await connect();
  server = app.listen(3001);
});

// afterEach(async () => await clearDatabase());

afterAll(async (done) => {
  await clearDatabase();
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
  const event = {
    event_id: 4,
    amount: 500,
    currency: "USD",
    user: "5ee2f37b81dc478153e98662",
    event_type: "CLASIFICADO",
    date: "2020-06-11T14:02:03.409Z",
  };
  it("Should GET empty events", async () => {
    const response = await request(app).get("/events");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
  it("Should GET created event after POST", async () => {
    await request(app).post("/events").send(event);
    const response = await request(app).get("/events");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  it("Should fail POST event ", async () => {
    await request(app).post("/events").expect(500);
  });
});
describe("Users", () => {
  const user = {
    name: "Tony",
    status: "ACTIVO",
  };
  it("Should GET users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
  it("Should GET created user after POST", async () => {
    await request(app).post("/users").send(user);
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
  it("Should fail POST user ", async () => {
    await request(app).post("/users").expect(500);
  });
  it("Should GET user by id", async () => {
    // Create user
    const created = await request(app).post("/users").send(user);
    expect(created.status).toBe(200);

    // Get that user by id
    const response = await request(app).get(`/users/${created.body._id}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(created.body._id);
  });
});
