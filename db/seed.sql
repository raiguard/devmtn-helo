create table if not exists users (
  id serial primary key,
  username varchar(20),
  password varchar(250),
  profile_pic text
);

create table if not exists posts (
  id serial primary key,
  title varchar(45),
  img text,
  content text,
  author_id int references users(id)
);