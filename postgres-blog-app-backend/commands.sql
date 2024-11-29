CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0 
);

INSERT INTO blogs (author, url, title ) VALUES ('Hillary Nyakundi', 'https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/', 'How to Write a Good README File for Your GitHub Project');
INSERT INTO blogs (author, url, title ) VALUES ('Ioan Solderea', 'https://www.lambdatest.com/blog/cypress-vs-playwright/', 'Cypress vs Playwright: A Detailed Comparison');