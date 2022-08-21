const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const roles = (function () {
  ac.grant("user")
    .createOwn("blogs")
    .updateOwn("blogs")
    .deleteOwn("blogs")
    .readAny("blogs")
    .createOwn("comments")
    .updateOwn("comments")
    .deleteOwn("comments")
    .readAny("comments")
    .createOwn("likes")
    .updateOwn("likes")
    .readOwn("profile")
    .updateOwn("profile")
    .deleteOwn("profile")
    .updateOwn("password");

  ac.grant("admin")
    .extend("user")
    .readAny("profile")
    .updateAny("profile")
    .deleteAny("profile")
    .updateAny("blogs")
    .deleteAny("blogs")
    .updateAny("comments")
    .deleteAny("comments");

  return ac;
})();

export default roles;
