export default class BadRequestException extends Error {
  constructor(msg, title = "Bad request") {
    super(msg);
    this.title = title;
    this.status = 400;
  }
}
