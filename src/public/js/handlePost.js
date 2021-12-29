const likePost = async (postId, likeButton) => {
    await httpPatch(`/posts/${postId}/like`, {})
    const isLiked = likeButton.parentElement.classList.toggle('active')
    const numberLikesBtn =
        likeButton.parentElement.querySelector('span.number-likes')
    // displike
    if (!isLiked) {
        numberLikesBtn.innerHTML = +numberLikesBtn.innerHTML - 1
        return
    }
  
    // like
    numberLikesBtn.innerHTML = +numberLikesBtn.innerHTML + 1
}

// Delete post
const deletePost = async (postId, postContainer) => {
    const data = await httpDelete(`/posts/${postId}`)
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `<span>${data.message}</span>`,
        showConfirmButton: false,
        timer: 1200,
        background: '#15202b',
    })
    postContainer.remove()
}
  
document.addEventListener('DOMContentLoaded', () => {
    handlePost()
})
  