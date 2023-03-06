import { describe } from "node:test";
import ping from "../ping";
import request from "supertest";

describe("GET /ping", () => {
  test("should return pong text", async () => {
    const response = await request(ping).get("/ping").send();
    expect("pong");
    console.log(response);
  });
});
