const request = require("supertest");
const app = require("../app");
const { createTokenLoginSync } = require("../helpers/jwt");
const { Produks } = require("../models");
const data = {
  kode_produk: "spt",
  nama_produk: `sepatu super ke-${Math.random() * 1000}`,
  qty: 10,
};

const token = createTokenLoginSync({
  email: "lukman@gmail.com",
  first_name: "lukman",
  last_name: "harun",
});

const uuidv4 = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";

describe("POST /produks", () => {
  it("should create produk success", async () => {
    const { kode_produk, nama_produk, qty } = data;
    const response = await request(app)
      .post("/produks")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .field("kode_produk", kode_produk)
      .field("nama_produk", nama_produk)
      .field("qty", qty)
      .attach("image_produk", __dirname + "/sepatu.jpg")
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        status: "success",
        message: "Data produk berhasil ditambahakan!",
      })
    );
  });

  it("should create produk failed duplicate nama_produk", async () => {
    const { kode_produk, nama_produk, qty } = data;
    const response = await request(app)
      .post("/produks")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .field("kode_produk", kode_produk)
      .field("nama_produk", nama_produk)
      .field("qty", qty)
      .attach("image_produk", __dirname + "/sepatu.jpg")
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        status: "error",
        message: "Data produk sudah ada!",
      })
    );
  });

  it("should create produk failed invalid validation", async () => {
    await request(app)
      .post("/produks")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect(400);
  });
});

describe("GET /produks", () => {
  it("should get all produk success", async () => {
    const response = await request(app)
      .get("/produks")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .query({ page: 1, per_page: 5 });
    expect(response.status).toEqual(response.status);
    if (response.status !== 301) {
      expect(response.body).toEqual(
        expect.objectContaining({ status: "success", data: response.body.data })
      );
    }
  });

  it("should get all produk not found", async () => {
    const response = await request(app)
      .get("/produks")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .query({ page: 3, per_page: 10 });

    expect(response.status).toEqual(response.status);
    if (response.status !== 301) {
      expect(response.body).toEqual(
        expect.objectContaining({
          status: "error",
          message: "Data produk tidak ada!",
        })
      );
    }
  });
});

describe("GET /produks/:id", () => {
  it("should get produk by id success", async () => {
    const getAllProduks = await Produks.findAll();

    const response = await request(app)
      .get(`/produks/${getAllProduks[0].id}`)
      .set("Accept", "application/json")
      .set("Authorization", token);

    expect(response.status).toEqual(response.status);
    if (response.status !== 301) {
      expect(response.body).toEqual(
        expect.objectContaining({
          status: "success",
          data: response.body.data,
        })
      );
    }
  });

  it("should get produk by id not found", async () => {
    const response = await request(app)
      .get(`/produks/${uuidv4}`)
      .set("Accept", "application/json")
      .set("Authorization", token);
    expect(response.status).toEqual(response.status);
    if (response.status !== 301) {
      expect(response.body).toEqual(
        expect.objectContaining({
          status: "error",
          message: "Data produk tidak ada!",
        })
      );
    }
  });
});

describe("PUT /produks", () => {
  it("should update produks success", async () => {
    const getAllProduks = await Produks.findAll();
    const { kode_produk, qty } = data;
    const response = await request(app)
      .put(`/produks/${getAllProduks[0].id}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .field("kode_produk", kode_produk)
      .field("nama_produk", `nama_produk baru ${Math.random() * 1000}`)
      .field("qty", qty)
      .attach("image_produk", __dirname + "/sepatu.jpg")
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        status: "success",
        message: "Data produk berhasil diupdate!",
      })
    );
  });
});

describe("DELETE /produks", () => {
  it("should delete produks success", async () => {
    const getAllProduks = await Produks.findAll();
    const response = await request(app)
      .delete(`/produks/${getAllProduks[0].id}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        status: "success",
        message: "Data produk berhasil dihapus!",
      })
    );
  });
});
