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


export default {
  createPost,
  queryPosts,
  
}
