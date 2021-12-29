import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { postService, userService } from '../services'
import { tranSuccess } from '../../lang/en'
import User from '../models/user.model'

/**
 * Create a post
 * @POST posts/
 * @access private
 */
const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost({
    ...req.body,
    postedBy: req.user.id,
  })
  res.status(201).json({ post, message: tranSuccess.created_success('post') })
})

/**
 * Get all posts
 * @GET posts/
 * @access private
 */
const getPosts = catchAsync(async (req, res) => {
  let searchObj = req.query
  let filter = pick(searchObj, ['postedBy'])

  const searchContent = { $regex: new RegExp(searchObj.search, 'i') }
  if (searchObj.search) {
    filter = {
      ...filter,
      content: searchContent,
    }
  }

  let options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  options.populate = 'postedBy,retweetData,retweetData.postedBy'
  const result = await postService.queryPosts(filter, options)

  res.send(result)
})

/**
 * Get a post by post id
 * @GET posts/:postId
 * @access public
 */
const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId)
  if (!post) {
    throw createError.NotFound()
  }
  res.status(200).json({ post })
})

/**
 * Update a post by postId
 * @PATCH posts/:postId
 * @access private
 */
const updatePost = catchAsync(async (req, res) => {
  if (req.body.pinned) {
    await postService.updatePosts(
      { postedBy: req.user._id, pinned: true },
      { pinned: false }
    )
  }

  const postUpdated = await postService.updatePostById(
    req.params.postId,
    req.body
  )
  res.status(200).json({ postUpdated, message: tranSuccess.updated_success })
})

/**
 * Delete post by postId
 * @DELETE posts/:postId
 * @access private
 */
const deletePost = catchAsync(async (req, res) => {
  let filter = {
    postedBy: req.user._id,
    _id: req.params.postId,
  }
  const post = await postService.deletePost(filter)
  if (!post) throw createError.NotFound('Not found post')
  return res
    .status(200)
    .json({ post, message: tranSuccess.deleted_success('post') })
})

export default {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  retweetPost,
}
