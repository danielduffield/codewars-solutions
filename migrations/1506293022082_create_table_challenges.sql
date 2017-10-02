-- up

create table challenges (
  id VARCHAR(30),
  url VARCHAR(50),
  name VARCHAR(40),
  author VARCHAR(20),
  author_url VARCHAR(50),
  difficulty VARCHAR(10)
);

---

-- down

drop table challenges;
