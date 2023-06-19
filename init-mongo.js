db.createUser(
  {
    user: "mongoUser",
    pwd: "ChangeMe",
    roles: [
      {
        role: "readWrite",
        db: "test_appartoo"
      }
    ]
  }
);