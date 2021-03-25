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

document.querySelector('#create-post').addEventListener('submit', createPost)