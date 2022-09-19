import { cache } from ".";
import { UserInt } from "./interface";

export const setAuth = ({
  id,
  firstname,
  surname,
  avatar,
  status,
  token,
}: UserInt) => {
  // Add user basic info to session and cookie
  cache.set(
    "user",
    {
      id,
      firstname,
      avatar,
      status,
      surname,
    },
    true
  );

  cache.set("token", token, true);
};
