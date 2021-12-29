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

// Pin post
const pinPost = async (postId, postContainer) => {
    const data = await httpPatch(`/posts/${postId}`, { pinned: true })
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `<span>Ghim bài...</span>`,
        showConfirmButton: false,
        timer: 800,
        background: '#15202b',
    })
  
    location.reload()
}
  
// Unpin post
const unpinPost = async (postId, postContainer) => {
    const data = await httpPatch(`/posts/${postId}`, { pinned: false })
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `<span>Bỏ ghim...</span>`,
        showConfirmButton: false,
        timer: 800,
        background: '#15202b',
    })

    // Handle button pinning
    const buttonPinning = postContainer.parentElement.querySelector(
        '.button-pinned-post.active'
    )
    buttonPinning.classList.remove('active')
    buttonPinning.setAttribute('data-bs-target', '#pinPostModal')
    postContainer.parentElement.querySelector('.pinnedText').remove()
}
  
document.addEventListener('DOMContentLoaded', () => {
    handlePost()
})
  