-- up

create table challenges (
  id CHAR(20),
  url CHAR(50),
  name CHAR(30),
  author CHAR(20),
  author_url CHAR(50),
  difficulty CHAR(10)
);

---

-- down

drop table challenges;
