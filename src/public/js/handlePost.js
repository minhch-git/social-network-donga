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

  
document.addEventListener('DOMContentLoaded', () => {
    handlePost()
})
  