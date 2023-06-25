export default class ServiceUnavailableException extends Error {
  constructor(msg, title = "Service error", extra = {}) {
    super(msg);
    this.extraData = extra;
    this.title = title;
    this.status = 503;
  }
}
