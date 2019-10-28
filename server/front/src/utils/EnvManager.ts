export class EnvManager {
  private constructor() {}

  public static get ApiServerUrl() {
    return process.env.NODE_ENV === "production" ? 'https://oic-sns.herokuapp.com' : 'http://localhost:3000';
  }
}
