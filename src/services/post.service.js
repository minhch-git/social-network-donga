import createError from 'http-errors'
import { Post, User } from '../models'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

/**
 * Create post
 * @param {Object} body
 * @returns {Promise<post>}
 */
const createPost = async postBody => {
  const newPost = new Post(postBody)
  await newPost.save()
  await Post.populate(newPost, ['postedBy', 'retweetData', 'replyTo'])
  return newPost
}

/**
 * Get posts by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<posts>}
 */
const queryPosts = async (filter, options) => {
  const customLabels = {
    docs: 'posts',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalPosts',
  }
  options = { ...options, customLabels }
  const posts = await Post.paginate(filter, options)
  return posts
}

/**
 * Find post by id
 * @param {Object} filter
 * @returns {Promise<posts>}
 */
 const getPosts = async filter => {
  const posts = await Post.find(filter)
  return posts
}
/**
 * Find post by id
 * @param {Object} filter
 * @returns {Promise<post>}
 */
const getPost = async filter => {
  return Post.findOne(filter)
}

/**
 * Find post by id
 * @param {ObjectId} postId
 * @returns {Promise<post>}
 */
const getPostById = async postId => {
  const post = await Post.findById(postId)
  return post
}

/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {Object} body
 * @returns {Promise<post>}
 */
 const updatePostById = async (postId, postBody) => {
  const postUpdated = await Post.findByIdAndUpdate(postId, postBody, {
    new: true,
  }).populate('postedBy')
  if (!postUpdated) {
    throw createError.NotFound()
  }
  return postUpdated
}

/**
 * Update post by id
 * @param {Object} filter
 * @param {Object} postBody
 * @returns {Promise<posts>}
 */
const updatePosts = async (filter, postBody) => {
  const posts = await Post.updateMany(filter, postBody, { new: true })
  return posts
}

/**
 * Delte post by id
 * @param {ObjectId} postId
 * @returns {Promise<post>}
 */
 const deletePostById = async postId => {
  const post = await getPostById(postId)
  if (!post) {
    throw createError.NotFound()
  }
  const result = await post.remove()
  return result
}

/**
 * Delte post by id
 * @param {Object} filter
 * @returns {Promise<post>}
 */
const deletePost = async filter => {
  const post = await Post.findOneAndDelete(filter)
  return post
}
/**
 * Delte post by id
 * @param {Object} filter
 * @returns {Promise<post>}
 */
const deleteManyPost = async filter => {
  const posts = await Post.deleteMany(filter)
  return posts
}

export default {
  createPost,
  queryPosts,
  getPosts,
  getPost,
  getPostById,
  updatePostById,
  updatePosts,
  deletePostById,
  deletePost,
  deleteManyPost,
}
