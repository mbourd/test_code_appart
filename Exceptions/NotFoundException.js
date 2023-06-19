export default class NotFoundException extends Error {
  constructor(msg, title = "Not found") {
    super(msg);
    this.title = title;
    this.status = 404;
  }
}
