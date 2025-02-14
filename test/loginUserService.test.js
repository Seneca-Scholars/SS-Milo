// import { describe, it, beforeEach } from "mocha";
// import { expect } from "chai";
// import sinon from "sinon";
// import db from "../libs/prismaInit.js";
// import { generateAuthToken, hashPassword } from "../utilities/utilities.js";
// import bcrypt from "bcrypt";
// import { loginUserService } from "../services/loginService.js";

// describe("loginUserService", () => {
//   let sx;
//   let findUniqueStub;
//   let compareStub;

//   beforeEach(() => {
//     sx = sinon.createSandbox();

//     findUniqueStub = sx.stub(db.users, "findUnique");
//     //so that it defaults to no user found
//     findUniqueStub.resolves(null);
//     //if bcrypt doesnt return a value use 'callsFake'
//     const compareStub = sx.stub(bcrypt, "compare");
//     compareStub.callsFake((password, hash) => {
//       // if passwords match
//       return password === hash;
//     });
//   });

//   afterEach(() => {
//     sx.restore();
//   });

//   it("should successfully login with valid credentials", async () => {
//     const mockUsername = "johndoe";
//     const mockPassword = "secret123";
//     const mockHashedPassword = await hashPassword(mockPassword);
//     const mockUser = {
//       username: mockUsername,
//       passwordHash: mockHashedPassword,
//     };
//     const findUserStub = sx.stub(db.users, "findUnique").resolves(mockUsername);
//     bcrypt.compare.resolves(true);
//     console.log(bcrypt.compare.resolves);
//     const mockToken = findUserStub;
//     console.log(mockUser, mockToken);
//     sx.stub(generateAuthToken).resolve(compareStub);

//     const result = await loginUserService(mockUsername);
//     expect(result).to.have.property("token").that.equals(mockToken);
//     expect(result).to.have.property("user").that.deep.equals(mockUser);
//     expect(db.users.findUnique).calledOnceWithExactly({
//       where: { username: mockUsername },
//     });
//     expect(bcrypt.compare).calledOnceWithExactly(
//       mockPassword,
//       mockHashedPassword
//     );
//   });
// });

// // describe("loginService", () => {
// //   let sx;

// //   beforeEach(() => {
// //     sx = sinon.createSandbox();
// //     sx.stub(db.users, "findUnique").resolves(null);//     //so that it defaults to no user found
// //     const compareStub = sx.stub(bcrypt, "compare");
// //     //if bcrypt doesnt return a value use 'callsFake'
// //         compareStub.callsFake((password, hash) => {
// //           // if passwords match
// //           return password === hash;
// //   });

// //   afterEach(() => {
// //     sx.restore();
// //   });

// //   it("should successfully login with valid credentials", async () => {
// //     const mockUsername = "johndoe";
// //     const mockPassword = "secret123";
// //     const mockHashedPassword = await hashPassword(mockPassword);
// //     const mockUser = {
// //       username: mockUsername,
// //       passwordHash: mockHashedPassword,
// //       // token: generateAuthToken
// //     };

// //     sx.stub(db.users, "findUnique").resolves(mockUser);

// //     const result = await loginUserService(username, passwordHash);

// //     expect(result).to.have.property("token").that.is.a("string");wa
// //     expect(result).to.have.property("user").that.deep.equals(mockUser);
// //     expect(db.users.findUnique).calledOnceWith({
// //       where: { username: mockUsername },
// //     });
// //     expect(bcrypt.compare).calledOnceWith(mockPassword, mockHashedPassword);
// //   });
// // });
// // });

import bcrypt from "bcrypt";
import { generateAuthToken, hashPassword } from "../utilities/utilities.js";
import db from "../libs/prismaInit.js";
import { loginUserService } from "../services/loginService.js";
import { expect } from "chai";
import sinon from "sinon";

describe("loginUserService", () => {
  let sx;

  beforeEach(() => {
    sx = sinon.createSandbox();
    sx.stub(db, "users").value({
      findUnique: sinon.stub(),
    });
  });

  afterEach(async () => {
    sx.restore();
  });

  it("should successfully log in a user with correct credentials", async () => {
    const mockUser = {
      username: "johndoe1",
      firstName: "john",
      lastName: "doe",
      passwordHash: hashPassword("password") };

    const mockToken = "mocked_auth_token";

    // sx.stub(db.users, "findUnique").resolves(mockUser);
    sx.stub(bcrypt, "compare").resolves(true);

    const generateAuthTokenStub = sx.stub();
    generateAuthTokenStub.returns(mockToken);
     console.log(await mockUser.passwordHash)
    const result = await loginUserService(mockUser.username, await mockUser.passwordHash
    );

    expect(db.users.findUnique.calledOnceWith({ where: { username: mockUser.username } })).to.be.true; // Use prisma!
    expect(bcrypt.compare.calledOnceWith("password", mockUser.passwordHash)).to.be.true; // Use plain password
    expect(generateAuthTokenStub.calledOnceWith(mockUser)).to.be.true; // Use the stub
    expect(result).to.have.property("token").that.equals(mockToken); // Correct assertion
    expect(result).to.have.property("user").that.deep.equals(mockUser); // Correct assertion
  });
})
    // console.log("Result:", result); // Check the actual result
    // console.log("Mock User:", mockUser); // Verify the mock user
    // console.log(
    //   "DB Call:",
    //   db.users.findUnique.calledOnceWith({
    //     where: { username: "testuser" },
    //   })
    // ); // Check if DB was called
    // console.log(
    //   "bcrypt Call:",
    //   bcrypt.compare.calledOnceWith("password", mockUser.passwordHash)
    // ); // Check bcrypt call

    // expect(result).to.have.property("token").that.is.a("string");wa
    //     expect(result).to.have.property("user").that.deep.equals(mockUser);
    //     expect(db.users.findUnique).calledOnceWith({
    //       where: { username: mockUser.username },
    //     });
    //     expect(bcrypt.compare).calledOnceWith(mockPassword, mockUser.passwordHash);
    //   });
    // });