import React from "react";
// next components
import ImageComponent from "../image";
// mui components
import Avatar, { AvatarProps } from "@mui/material/Avatar";
interface UserAvatarInt extends AvatarProps {
  user: { firstname: string; lastname: string };
}

const UserAvatar = (props: UserAvatarInt) => {
  const { user, ...rest } = props;

  return (
    <Avatar {...rest} sx={{ width: 48, height: 48, ...rest?.sx }}>
      {rest.src ? (
        <ImageComponent
          alt={`${user?.firstname}s profile picture`}
          layout="fill"
          objectFit="contain"
          src={rest.src}
        />
      ) : (
        Array.from(user?.firstname)[0]
      )}
    </Avatar>
  );
};

export default UserAvatar;
