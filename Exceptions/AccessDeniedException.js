export default class AccessDeniedException extends Error {
  constructor(msg, title = "Access denied") {
    super(msg);
    this.title = title;
    this.status = 401;
  }
}
