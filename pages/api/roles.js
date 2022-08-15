const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const roles = (function () {
  ac.grant("user")
    .createOwn("blogs")
    .updateOwn("blogs")
    .deleteOwn("blogs")
    .readAny("blogs")
    .readOwn("profile")
    .updateOwn("profile")
    .deleteOwn("profile");

  ac.grant("admin")
    .extend("user")
    .updateAny("profile")
    .deleteAny("profile")
    .updateAny("blogs")
    .deleteAny("blogs");

  return ac;
})();

export default roles;
