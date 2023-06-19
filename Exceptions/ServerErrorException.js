export default class ServerErrorException extends Error {
  constructor(msg, title = "Server error") {
    super(msg);
    this.title = title;
    this.status = 500;
  }
}
