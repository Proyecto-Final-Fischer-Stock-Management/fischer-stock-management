import request from "supertest";
import assert from "node:assert";
import { test, beforeEach, after } from "node:test";
import app from "../../../src/app.js";
import prisma from "../../../prisma/prisma.js";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST login", () => {
  test("devuelve token si todo bien", async () => {
    const response = await request(app).post("/login").send({
      email: "testmail@gmail.com",
      password: "123123123",
    });
    assert.equal(response.status, 200);
    assert.ok(response.body.token);
  });

  test("devuelve 404 si usuario no existe", async () => {
    const response = await request(app).post("/login").send({
      email: "tasemail@gmail.com",
    });
    assert.notEqual(response.status(404));
  });

  test("devuelve 401 si contraseña esta mal", async () => {
    const response = await request(app).post("/login").send({
      email: "testmail@gmail.com",
      password: "1231231234",
    });
    assert.notEqual(response.status(401));
  });
});
