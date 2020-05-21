import UserService from "../../interfaces/service/UserService";

abstract class Service {
  public abstract userService(): UserService;
}

export default Service;
