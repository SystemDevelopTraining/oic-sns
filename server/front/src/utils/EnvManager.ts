export class EnvManager {
  private constructor() {}

  public static get ApiServerUrl() {
    return process.env.NODE_ENV === "production" ? 'https://oicity.herokuapp.com' : 'http://localhost:3000';
  }
}
