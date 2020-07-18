import Service from "./providers/Service";
import { ServiceProviders } from "../utils/app-constants";
import FirebaseService from "./providers/firebase/FirebaseService";

export default class ServiceProviderFactory {
  private static instance: Service;

  private constructor() {}

  public static getInstance(): Service {
    if (!ServiceProviderFactory.instance) {
      ServiceProviderFactory.instance = ServiceProviderFactory.createServiceProvider();
    }

    return ServiceProviderFactory.instance;
  }

  private static createServiceProvider(): Service {
    switch (process.env.SERVICE_PROVIDER) {
      case ServiceProviders.FIREBASE_SERVICE:
        return new FirebaseService();

      default:
        return new FirebaseService();
    }
  }
}
