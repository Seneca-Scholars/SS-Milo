import db from "../libs/prismaInit";
import { updateUserService } from "../services/updateUserService.js";

jest.mock("../libs/prismaInit.js", () =>({
    users: {
        update: jest.fn(),
    },
}));

describe("updateUserService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
})