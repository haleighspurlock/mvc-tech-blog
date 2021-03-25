const newFormHandler = async (event) => {
    event.preventDefault();

    const post_title = document.querySelectorAll('#post-title').value.trim();
    const post_content = document.querySelectorAll('#post-content').value.trim();

    if (post_title && post_content) {
        const response = await fetch(`/api/post`, {
            method: 'POST',
            body: JSON.stringify({ post_title, post_content }),
            headers: {
                'ContentType': 'application/json',
            },
        });

        if(response.ok) {
            document.location.replace('post');
        } else {
            alert('failed to create post');
        }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);