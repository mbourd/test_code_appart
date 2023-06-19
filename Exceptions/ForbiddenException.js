export default class ForbiddenException extends Error {
  constructor(msg, title = "Forbidden") {
    super(msg);
    this.title = title;
    this.status = 403;
  }
}
