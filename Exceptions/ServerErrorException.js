export default class ServerErrorException extends Error {
  constructor(msg, title = "Server error", extra = {}) {
    super(msg);
    this.extraData = extra;
    this.title = title;
    this.status = 500;
  }
}
