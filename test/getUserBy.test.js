import db from "../libs/prismaInit.js";
import { getUserByIdService, getUserByUsernameService } from "../services/getUserByService.js"

jest.mock("../libs/prismaInit.js", () => ({
    users: {
        findUnique: jest.fn(),
    },
}));

describe("getUserByIdService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
})