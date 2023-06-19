export default class ServiceUnavailableException extends Error {
  constructor(msg, title = "Service error") {
    super(msg);
    this.title = title;
    this.status = 503;
  }
}
