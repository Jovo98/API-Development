import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
const app = express();


app.use(cors());
app.use(express.json());

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const port = process.env.PORT || 3000;



app.get("/users", async (req, res) => {
    const [result, fields] = await connection.query("SELECT * FROM user");
    res.json(result);
});

app.get("/user/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!isNaN(id)) {
        try {
            const [result] = await connection.query("SELECT * FROM user WHERE id=?", [
                id,
            ]);
            if (result.length) {
                res.json(result);
            } else {
                res.send("no user found");
            }
        } catch (e) {
            res.status(500).send("Something went wrong");
        }
    } else {
        res.status(400).send("ID is not a valid number");
    }
});
app.post("/post", async (req, res) => {
    const { id, title, content } = req.body;

    const [result] = await connection.query(`
    INSERT INTO post(title, content, user_id)
    VALUES('${title}','${content}', ${id});
    `);

    res.json(result);
});

app.get("/query", (req, res) => {
    res.send(req.query);
});
app.get("/post", async (req, res) => {
    const [result] = await connection.query(`
        SELECT * FROM post
        `);
    res.json(result);
});
// app.get("/thepost", async (req, res) => {
//     const [result] = await connection.query(`
//         SELECT * FROM comment WHERE post_id = 1;
//
//         `);
//     res.json(result);
// });

app.get("/post/:id", async (req, res) => {
    const postId = req.params.id;

    try {
        const [postResult] = await connection.query(
            `SELECT * FROM post WHERE id = ?`,
            [postId]
        );

        if (postResult.length === 0) {
            console.log(`No post found with id ${postId}`);
            return res.status(404).json({ error: "Post not found" });
        }
        const post = postResult[0];
        console.log("Post:", post);

        const [commentsResult] = await connection.query(
            `SELECT 
                c.id AS comment_id, 
                c.content AS comment_content, 
                u.name AS user_name, 
                u.email AS user_email 
             FROM comment c 
             LEFT JOIN user u ON c.user_id = u.id 
             WHERE c.post_id = ?`,
            [postId]
        );

        res.json({
            ...post,
            comments: commentsResult,
        });
    } catch (error) {
        console.error("Error fetching post details:", error.message, error.stack);
        res.status(500).json({ error: "Failed to fetch post details" });
    }
});

app.post("/post/:id/comment", async (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;

    if (!content || content.trim() === '') {
        return res.status(400).json({ error: 'Content cannot be empty' });
    }

    try {
        const [result] = await connection.query(
            `INSERT INTO comment (content, post_id, user_id) 
             VALUES (?, ?, ?)`,
            [content, postId, 1]
        );


        res.status(201).json({
            id: result.insertId,
            content: content,
            post_id: postId,
            user_id: 1,
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});



app.get("/comments", async (req, res) => {
    const [result] = await connection.query(`
        SELECT * FROM comment
        `);
    res.json(result);
});


// app.get("/test", async (req, res) => {
//     const sort = req.query.sort || "id";
//     const sortOrder = req.query.sortOrder || "ASC";
//     //http://localhost:1337/test?sort=id&sortOrder=DESC
//     const [result] = await connection.query(
//         `SELECT * FROM test ORDER BY ${sort} ${sortOrder}`
//     );
//     res.json(result);
// });
//
// app.get("/test/:id", async (req, res) => {
//     const { id } = req.params;
//     const [result] = await connection.query("SELECT * FROM test WHERE id=" + id);
//     res.json(result);
// });
//
// app.post("/test", async (req, res) => {
//     const { content } = req.body;
//     const [result] = await connection.query(
//         `INSERT INTO test(content) VALUES (?);`,
//         [content]
//     );
//     res.send("success");
// });

app.listen(port, () => {
    console.log("Server started on port: ", port);
});

