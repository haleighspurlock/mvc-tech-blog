const updatePost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#updated-title').value.trim();
    const content = document.querySelector('#updated-content').value.trim();

    if (title && content) {
        const postId = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/posts/${postId}`);
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#edit-post').addEventListener('submit', updatePost)