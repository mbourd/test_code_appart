export default class ForbiddenException extends Error {
  constructor(msg, title = "Forbidden", extra = {}) {
    super(msg);
    this.extraData = extra;
    this.title = title;
    this.status = 403;
  }
}
