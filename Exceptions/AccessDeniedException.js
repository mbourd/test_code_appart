export default class AccessDeniedException extends Error {
  constructor(msg, title = "Access denied", extra = {}) {
    super(msg);
    this.extraData = extra;
    this.title = title;
    this.status = 401;
  }
}
