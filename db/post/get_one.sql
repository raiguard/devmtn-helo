select p.id as post_id, p.title, p.img, p.content, u.username, u.profile_pic, u.id as author_id
from posts p
join users u on p.author_id = u.id
where p.id = $1;