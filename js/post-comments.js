function fetchPostDetails() {
    const postId = new URLSearchParams(window.location.search).get("id");
    const apiUrl = `http://localhost:1337/post/${postId}`;
    const postContainer = document.getElementById("post-container");
    const commentsContainer = document.getElementById("comments-container");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const { title, content, comments } = data;

            postContainer.innerHTML = `
                <h2>${title}</h2>
                <p>${content}</p>
            `;

            commentsContainer.innerHTML = comments.map(comment => `
                <div class="comment">
                    <h3>${comment.user_name} (${comment.user_email})</h3>
                    <p>${comment.comment_content}</p>
                </div>
            `).join("");
        })
        .catch(error => {
            console.error("Failed to load post details:", error);
        });
}

function submitComment(event) {
    event.preventDefault();

    const postId = new URLSearchParams(window.location.search).get("id");
    const commentContent = document.getElementById("comment-content").value;

    if (!commentContent.trim()) {
        alert("Please enter a comment.");
        return;
    }

    const commentData = {
        content: commentContent,
    };

    fetch(`http://localhost:1337/post/${postId}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
    })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
            } else {
                fetchPostDetails();

                document.getElementById("comment-content").value = "";
            }
        })
        .catch(error => {
            console.error("Error submitting comment:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchPostDetails();

    const commentForm = document.getElementById("comment-form");
    commentForm.addEventListener("submit", submitComment);
});
