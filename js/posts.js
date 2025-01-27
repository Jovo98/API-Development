function fetchPosts() {
    const apiUrl = "http://localhost:1337/post";
    const postsContainer = document.getElementById("posts-container");

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }
            return response.json();
        })
        .then(posts => {
            postsContainer.innerHTML = "";
            posts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.className = "post";

                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p><br>
                    <a href="post-comments.html?id=${post.id}"><button>Read More</button></a>
                `;

                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error("Error fetching posts:", error);
            postsContainer.innerHTML = `Failed to load posts`;
        });
}

document.addEventListener("DOMContentLoaded", fetchPosts);
