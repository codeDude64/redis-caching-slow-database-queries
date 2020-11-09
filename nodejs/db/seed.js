const sqlite3 = require('sqlite3').verbose(),
      db = new sqlite3.Database('./db/sample.db');

const courses = [
  {
    "title": "RU101: Introduction to Redis Data Structures",
    "description": "Learn Redis in this free course! Covers Redis data structures from the ground up with lectures, hands-on exercises, and quizzes and exams to test your knowledge.",
    "index_description": "RU101 is an introductory course, perfect for developers new to Redis. In this course, you'll learn about the data structures in Redis, and you'll see how to practically apply them in the real world.",
    "course_number": "RU101",
    "course_name": "Introduction to Redis Data Structures"
  } ,
  {
    "title": "RU102J: Redis for Java Developers",
    "description": "In this introductory course for Redis and Java, you'll build a complete application using Redis and Jedis using commom Redis data structures and design patterns.",
    "index_description": "Redis for Java Developers teaches you how to build robust Redis client applications in Java using the Jedis client library. The course focuses on writing idiomatic Java applications with the Jedis API, describing language-specific patterns for managing Redis database connections, handling errors, and using standard classes from the JDK. The course material uses the Jedis API directly.",
    "course_number": "RU102J",
    "course_name": "Redis for Java Developers"
  },
  {
    "title": "RU102JS: Redis for JavaScript Developers",
    "description": "Join our free, introductory course for Redis and Node.js! You'll build a complete application using Redis, Node.js, and Express, and you'll learn common Redis data structures and design patterns along the way.",
    "index_description": "RU102JS is a deep dive into Redis for Node.js applications. You can expect to learn how to make connections to Redis, store and retrieve data, and leverage essential Redis features such as sorted sets and streams.",
    "course_number": "RU102JS",
    "course_name": "Redis for JavaScript Developers"
  },
  {
    "title": "RU102PY: Redis for Python Developers",
    "description": "New to Redis and Python? In this free course, you'll build a complete application using the Flask web framework, and you'll learn Redis data structures and design patterns along the way.",
    "index_description": "RU102PY provides a deep dive into Python application development with Redis. You can expect to learn how to make connections to Redis, store and retrieve data, and leverage essential Redis features such as sorted sets and streams.",
    "course_number": "RU102PY",
    "course_name": "Redis for Python Developers"
  },
  {
    "title": "RU202: Redis Streams",
    "description": "A free course on Redis streams, the in-memory Redis data structure for realtime data and events that acts like an append-only log.",
    "index_description": "Redis Streams is a new feature for Redis 5.0. In this course, we'll cover the basic concepts of streaming, and then provide a broad overview of Redis Streams itself. After that, we'll explore the Redis Streams commands in detail, and discover how this new data structure works under the hood.",
    "course_number": "RU202",
    "course_name": "Redis Streams"
  },
  {
    "title": "RU330: Redis Security",
    "description": "Learn how to secure and harden your Redis deployments in this complete course on Redis security. Covers access control, data protection, encryption, secure architectures, and more.",
    "index_description": "This teaches you everything you need to know about Redis Security. The course focuses on access-control, data encryption, and secure deployment practices.",
    "course_number": "RU330",
    "course_name": "Redis Security"
  },
  {
    "title": "RU203: Querying, Indexing, and Full-Text Search",
    "description": "This course covers how to write SQL-like queries, create secondary indexes, aggregate data, and perform full-text search with the RediSearch module.",
    "index_description": "This course covers RediSearch, the in-memory query, indexing, and full-text search engine for Redis. You'll learn how to run SQL-like queries using the RediSearch query language, create secondary indexes, aggregate data, and perform full-text search.",
    "course_number": "RU203",
    "course_name": "Querying, Indexing, and Full-Text Search"
  },
  {
    "title": "RU330: Redis Security",
    "description": "Learn how to secure and harden your Redis deployments in this complete course on Redis security. Covers access control, data protection, encryption, secure architectures, and more.",
    "index_description": "This teaches you everything you need to know about Redis Security. The course focuses on access-control, data encryption, and secure deployment practices.",
    "course_number": "RU330",
    "course_name": "Redis Security"
  }
];

db.serialize(() => {
  db.run('DROP TABLE courses')
  .run('CREATE TABLE courses(title text, description text, index_description text, course_number text, course_name text)');
  
  courses.forEach( e => {
    db.run(`INSERT INTO courses (title, description, index_description, course_number, course_name) 
            VALUES(?, ?, ?, ?, ?)`, [e.title, e.description, e.index_description, e.course_number, e.course_name], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted for courseID ${this.lastID}`);
    });
  })
});