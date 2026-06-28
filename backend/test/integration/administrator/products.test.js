import request from "supertest";
import bcrypt from "bcrypt";
import assert from "node:assert";
import path from "node:path";
import multer from "multer";
import { fileURLToPath } from "node:url";
import { describe, test, beforeEach, after } from "node:test";
import app from "../../../src/app.js";
import prisma from "../../../prisma/prisma.js";
import fs from "node:fs";

describe("Post Product", () => {
  test("Crea producto si todo bien", async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const response = await request(app)
      .post("/administrator/stock/product")
      .field("fischerCode", 616302)
      .field("easySap", 1288445)
      .field("name", "BST 10 DUOBLADE+TMF4.5X40")
      .field("minimunStock", 20)
      .attach(
        "productPicture",
        path.join(__dirname, "../../testPhotos/mclarenParaTest.jpg"),
      );
    console.log(response.text);
    assert.equal(response.statusCode, 201);
  });
});
