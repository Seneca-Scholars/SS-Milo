import { describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import db from "../libs/prismaInit.js";
import { updateUserService } from "../services/updateUserService.js";

describe("updateUserService", () => {
  let sx;

  beforeEach(() => {
    sx = sinon.createSandbox();

    sx.stub(db, "users").value({
      update: sinon.stub(),
    }); //this is called stubbing, stub db.users.update directly
  });

  afterEach(() => {
    sx.restore();
  });
});
