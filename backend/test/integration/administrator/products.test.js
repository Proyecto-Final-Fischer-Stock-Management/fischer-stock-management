import request from "supertest";
import assert from "node:assert";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, test } from "node:test";
import app from "../../../src/app.js";

describe("Post Product", () => {
  test("Crea producto si todo bien", async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const response = await request(app)
      .post("/administrator/stock/product")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJpYXQiOjE3OTMyMzc2NjEsImV4cCI6MTc5MzIzODg2MX0.OdpaEYcBgTWxz61nEOzBpgYFvDdikPLTPdnO1pr4EBg`,
      )
      .field("fischerCode", 616302)
      .field("easySap", 1288445)
      .field("sodimacSku", 36217836)
      .field("carrefourEan", 9102363)
      .field("anonimaCodInt", 1278351)
      .field("hipertehuelcheCode", 8976232)
      .field("name", "BST 10 DUOBLADE+TMF4.5X40")
      .field("minimunStock", 20)
      .attach(
        "productPicture",
        path.join(__dirname, "../../testPhotos/mclarenParaTest.jpg"),
      )
      .field("productPictureType", ".png");
    console.log(response.text);
    assert.equal(response.statusCode, 201);
  });
});
