import * as httpMock from "node-mocks-http";

import { UserApplication } from "../../../src/module/application/user.application";
import { UserInfrastructure } from "../../../src/module/infrastructure/user.infrastructure";
import UserController from "../../../src/module/interfaces/http/user.controller";
import mockUsers from "../../mocks/users.json";

let req: any;
let res: any;
let next: any;

let mockUserApplication: any;

describe("UserController", () => {
  beforeAll(() => {
    (UserInfrastructure as jest.Mock) = jest.fn();

    (UserApplication as jest.Mock) = jest.fn().mockReturnValue({
      create: jest.fn().mockResolvedValue({
        isErr: jest.fn(),
        isOk: jest.fn(),
        value: {
          id: mockUsers[0].id,
          name: mockUsers[0].name,
          email: mockUsers[0].email,
        },
      }),
    });

    const mockUserInfrastructure = new UserInfrastructure();
    mockUserApplication = new UserApplication(mockUserInfrastructure);
  });

  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next;
  });

  it("create user", async () => {
    // Prepare
    const userController = new UserController(mockUserApplication);
    req.body.id = mockUsers[0].id;
    req.body.name = mockUsers[0].name;
    req.body.email = mockUsers[0].email;
    req.body.password = mockUsers[0].password;
    req.body.age = mockUsers[0].age;

    // Act
    await userController.create(req, res, next);

    // Assert
    expect(res.statusCode).toBe(200);
  });
});
