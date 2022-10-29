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
      .set("Content-type", "application/json; charset=UTF-8")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a("Array");
        expect(response.body.length).to.be.equal(10);
      });
  });
});

describe("POST /posts", function () {
  it("Resource can be created", function () {
    return request(url)
      .post("/posts")
      .set("Content-type", "application/json; charset=UTF-8")
      .send({
        title: "foo",
        body: "bar",
        userId: 1,
      })
      .then((response) => {
        expect(response.status).to.be.equal(201);
        expect(response.body).to.include({
          title: "foo",
          body: "bar",
          userId: 1,
        });
      });
  });
});

describe("PUT /posts", function () {
  it("Resource can be updated", function () {
    return request(url)
      .put("/posts/1")
      .set("Content-type", "application/json; charset=UTF-8")
      .send({
        title: "foo",
        body: "bar",
        userId: 1,
      })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.include({
          title: "foo",
          body: "bar",
          userId: 1,
        });
      });
  });
});

describe("PATCH /posts", function () {
  it("Resource can be patched", function () {
    return request(url)
      .patch("/posts/1")
      .set("Content-type", "application/json; charset=UTF-8")
      .send({
        title: "cat",
        body: "meow",
      })
      .then((response) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.include({
          title: "cat",
          body: "meow",
        });
      });
  });
});

describe("DELETE /posts", function () {
  it("Resource can be deleted", function () {
    return request(url)
      .delete("/posts/1")
      .then((response) => {
        expect(response.status).to.be.equal(200);
      });
  });
});
