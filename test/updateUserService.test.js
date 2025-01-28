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

  it('should update a user with valid data', async () => {
    const mockUserId = 1;
    const mockUpdatedData = { firstName: "John", lastName: "Doe", username: "johndoe" };
    const mockUpdatedUser = { id: 1, firstName: "John", lastName: "Doe", username: "johndoe" };

    db.users.update.resolves(mockUpdatedUser); 

    const result = await updateUserService(mockUserId, mockUpdatedData);

    expect(db.users.update.calledOnceWithExactly({ 
      where: { id: mockUserId }, 
      data: mockUpdatedData 
    })).to.be.true; 
    expect(result).to.deep.equal(mockUpdatedUser); 
  });
  
  it("should throw an error for invalid user ID", async () => {
    const invalidUserId = "invalid";
    const mockUpdatedData = { firstName: "John", lastName: "Doe" };
 
 
    try {
      await updateUserService(invalidUserId, mockUpdatedData);
      expect.fail("expected an error to be thrown");
    } catch (error) {
      expect(error.message).to.include("invalid user ID");
    }
  });
 
  it('should throw an error for no updated data', async () => {
    const mockUserId = 1;

    try {
      await updateUserService(mockUserId, {});
      expect.fail('expected an error');
    } catch (error) {
      expect(error.message).to.include('0 data provided for update'); 
      expect(db.users.update.notCalled).to.be.true; 
    }
  });
  it('should throw an error for undefined updated data', async () => {
    const mockUserId = 1;

    try {
      await updateUserService(mockUserId);
      expect.fail('expected an error to be thrown');
    } catch (error) {
      expect(error.message).to.include('0 data provided for update'); 
      expect(db.users.update.notCalled).to.be.true; 
    }
  });
});
