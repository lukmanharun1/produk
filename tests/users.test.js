const request = require("supertest");
const app = require("../app");

const data = {
  email: `lu${Math.random() * 1000}@gmail.com`,
  first_name: `lukman ${Math.random() * 1000}`,
  last_name: "harun",
  password: "Lukman@harun1",
};

describe("POST /users/register", () => {
  it("should register user success", async () => {
    const response = await request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(data)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        status: "success",
        message: "Data user berhasil diregistrasi!",
      })
    );
  });

  it("should register user failed email already exists", async () => {
    const response = await request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(data)
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        status: "error",
        message: "Data email sudah ada!",
      })
    );
  });

  it("should register user failed invalid validation", async () => {
    await request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .expect(400);
  });
});

describe("POST /users/login", () => {
  it("should login user success", async () => {
    const response = await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send({ email: data.email, password: data.password })
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        status: "success",
        message: "Login berhasil!",
        token: response.body.token,
      })
    );
  });

  it("should login user failed user not register", async () => {
    const response = await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send({ email: "ngasal@gmail.com", password: "Belum@terdaftar1" })
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        status: "error",
        message: "Email atau password salah!",
      })
    );
  });

  it("should login user failed invalid validation", async () => {
    await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .expect(400);
  });
});
