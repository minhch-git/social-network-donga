import * as yup from 'yup'
import { transValidations } from '../../lang/en'
import config from './config.validation'
const createPost = {
  content: yup.string(),
  postImage: yup.string(),
  retweetData: yup.string(),
  replyTo: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  checkbox_selection: yup.string().when(['content', 'retweetData', 'replyTo'], {
    is: (content, retweetData, replyTo) => !content && !retweetData && !replyTo,
    then: yup.string().required('Vui lòng nhập nội dung bài post.'),
  }),
}

const getPosts = {
  content: yup.string(),
  search: yup.string(),
  postedBy: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  replyTo: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  retweetData: yup.string(),
  followingOnly: yup.string(),
  isReply: yup.boolean().default(false),
  skip: yup.number(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getPost = {
  postId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}



export default {
  createPost,
  getPosts,
  getPost,

}
