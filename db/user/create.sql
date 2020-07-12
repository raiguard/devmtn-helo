insert into users (
  username,
  password,
  profile_pic
) values (
  ${username},
  ${hash},
  ${profilePicture}
)
returning id, username, profile_pic;