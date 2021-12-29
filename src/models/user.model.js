import mongoose, {
  Schema
} from 'mongoose'
import bcrypt from 'bcryptjs'
import {
  roles
} from '../config/roles'
import {
  transValidations
} from '../../lang/en'
import toJSON from './plugins/toJson'
import paginate from './plugins/paginate'

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/

// add plugin that converts mongoose to json
userSchema.plugin(toJSON)
userSchema.plugin(paginate)

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema)

export default User