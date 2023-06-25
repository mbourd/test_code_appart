export default class BadRequestException extends Error {
  constructor(msg, title = "Bad request", extra = {}) {
    super(msg);
    this.extraData = extra;
    this.title = title;
    this.status = 400;
  }
}
