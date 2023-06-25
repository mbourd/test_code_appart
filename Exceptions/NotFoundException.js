export default class NotFoundException extends Error {
  constructor(msg, title = "Not found", extra = {}) {
    super(msg);
    this.extraData = extra;
    this.title = title;
    this.status = 404;
  }
}
