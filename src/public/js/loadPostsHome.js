// Load posts
const loadPostsHome = async () => {
    const { posts } = await httpGet(`/posts/`)
    if (posts.length > 0) return posts.forEach(post => outputPost(post))
    Swal.fire({
        title: `Xin chào bạn <span class="text-primary"> ${userLoggedIn.fullName}</span>`,
        text: 'Bạn có muốn tìm kiếm bạn bè quanh đây không?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Để sau',
        confirmButtonText: 'Có 😀',
        background: '#15202b',
    }).then(result => {
        if (result.isConfirmed) return (window.location.href = '/search')
  
        
    })
}
  
loadPostsHome()
  