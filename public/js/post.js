const createPost = async (event)=>{
    // event.preventDefault();

    // Get the users inputted info
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            alert(response.statusText);
        }
    }
}

const createCommentFunc = async (event)=> {
    const postId = event.target.getAttribute('data-id');
    const comment = document.querySelector(`#comment_${postId}`).value.trim();

    if(comment) {
        const response = await fetch ('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, postId }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            window.location.reload();
        } else {
            alert('failed to create comment!');
        }
    }
}

const deletePost = async (event) => {
    if(event.target.getAttribute('data-id')) {
        const postId = event.target.getAttribute('data-id');
        
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            window.location.reload();
        } else {
            alert('failed to delete post!');
        }
    }
};

document.querySelector('#create-post').addEventListener('submit', createPost)
