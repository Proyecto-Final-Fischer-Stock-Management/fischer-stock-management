import request from "supertest";
import bcrypt from "bcrypt";
import assert from "node:assert";
import { describe, test, beforeEach } from "node:test";
import app from "../../../src/app.js";
import prisma from "../../../prisma/prisma.js";

beforeEach(async () => {
  await prisma.users.deleteMany();

  const hashedpass = await bcrypt.hash("123123123", 24);

  await prisma.users.create({
    data: {
      email: "testmail@gmail.com",
      complete_name: "Persona de Test",
      role: "Administrator",
      password: hashedpass,
    },
  });
});

describe("POST login", () => {
  test("devuelve token si todo bien", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "testmail@gmail.com",
      password: "123123123",
    });
    assert.equal(response.status, 200);
    assert.ok(response.body.result);
  });

  test("devuelve 400, complete fields, si usuario no completa email", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "",
      password: "123123123",
    });
    assert.equal(response.status, 400);
  });

  test("devuelve 400, complete fields, si usuario no completa password", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "testmail@gmail.com",
      password: "",
    });
    assert.equal(response.status, 400);
  });

  test("devuelve 400, invalid credentials, si usuario no existe", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "tasemail@gmail.com",
      password: "123123123",
    });
    assert.equalqual(response.status, 400);
  });

  test("devuelve 400, invalid credentials, si contraseña esta mal", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "testmail@gmail.com",
      password: "1231231234",
    });
    assert.equal(response.status, 400);
  });
});
