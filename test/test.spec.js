const request = require("supertest");
const { expect } = require("chai");
const url = "https://jsonplaceholder.typicode.com";

describe("GET /users", function () {
  it("Status code is equal 200", function () {
    return request(url)
      .get("/users")
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.not.be.empty;
      });
  });

  it("Content-type 'header' exists in the obtained response", function () {
    return request(url)
      .get("/users")
      .expect(200)
      .then((response) => {
        expect(response.headers).to.not.be.empty;
        expect(response.headers["content-type"]).to.be.include(
          "application/json"
        );
        expect(response.headers["content-type"]).to.include("charset=utf-8");
      });
  });

  it("Content of the response body is the array of 10 users", function () {
    return request(url)
      .get("/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a("Array");
        expect(response.body.length).to.be.equal(10);
      });
  });
});
