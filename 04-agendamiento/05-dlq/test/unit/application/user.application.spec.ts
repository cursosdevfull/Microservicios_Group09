import { UserApplication } from "../../../src/module/application/user.application";
import { UserFactory } from "../../../src/module/domain/user.factory";
import { UserInfrastructure } from "../../../src/module/infrastructure/user.infrastructure";
import mockUsers from "../../mocks/users.json";

const user = UserFactory.create(
  mockUsers[0].id,
  mockUsers[0].name,
  mockUsers[0].email,
  mockUsers[0].password,
  mockUsers[0].age
);

describe("UserApplication", () => {
  beforeEach(() => {
    (UserInfrastructure as jest.Mock) = jest.fn().mockReturnValue({
      create: jest.fn().mockResolvedValue({
        isErr: jest.fn(),
        isOk: jest.fn().mockReturnValue(true),
        value: {
          id: mockUsers[0].id,
          name: mockUsers[0].name,
          email: mockUsers[0].email,
        },
      }),
    });
  });

  it("create user", async () => {
    // Prepare

    // Act
    const userInfrastructure: UserInfrastructure = new UserInfrastructure();
    const userApplication = new UserApplication(userInfrastructure);
    const result = await userApplication.create(user);

    // Assert
    expect(userInfrastructure.create).toBeCalled();
    expect(userInfrastructure.create).toBeCalledWith(user);
    expect(userInfrastructure.create).toBeCalledTimes(1);

    if (result.isOk()) {
      expect(result.value).toHaveProperty("id");
      expect(result.value.id).toBe(mockUsers[0].id);
      expect(result.value.name).toBe(mockUsers[0].name);
      expect(result.value.email).toBe(mockUsers[0].email);
    }
  });
});
