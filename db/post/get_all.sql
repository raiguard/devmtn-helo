select p.id, p.title, u.username, u.profile_pic
from posts p
join users u on p.author_id = u.id
where (${userposts} = true or p.author_id <> ${userid})
and (${search} is null or lower(p.title) like ${search});