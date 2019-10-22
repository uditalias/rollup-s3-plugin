const _ = require("lodash");
const path = require("path");
const readDir = require("recursive-readdir");

const UPLOAD_IGNORES = exports.UPLOAD_IGNORES = [
  '.DS_Store'
]

const DEFAULT_UPLOAD_OPTIONS = exports.DEFAULT_UPLOAD_OPTIONS = {
  ACL: 'public-read'
}


const REQUIRED_S3_UP_OPTS = exports.REQUIRED_S3_UP_OPTS = ['Bucket']
const PATH_SEP = exports.PATH_SEP = path.sep
const S3_PATH_SEP = exports.S3_PATH_SEP = '/'
const DEFAULT_TRANSFORM = exports.DEFAULT_TRANSFORM = (item) => Promise.resolve(item)

const addTrailingS3Sep = exports.addTrailingS3Sep = fPath => {
  return fPath ? fPath.replace(/\/?(\?|#|$)/, '/$1') : fPath
}

const addSeperatorToPath = exports.addSeperatorToPath = (fPath) => {
  if (!fPath)
    return fPath

  return _.endsWith(fPath, PATH_SEP) ? fPath : fPath + PATH_SEP
}

const translatePathFromFiles = exports.translatePathFromFiles = (rootPath) => {
  return files => {
    return _.map(files, file => {
      return {
        path: file,
        name: file
          .replace(rootPath, '')
          .split(PATH_SEP)
          .join(S3_PATH_SEP)
      }
    })
  }
}

const getDirectoryFilesRecursive = exports.getDirectoryFilesRecursive = (dir, ignores = []) => {
  return new Promise((resolve, reject) => {
    readDir(dir, ignores, (err, files) => err ? reject(err) : resolve(files))
  })
    .then(translatePathFromFiles(dir))
}

const testRule = exports.testRule = (rule, subject) => {
  if (_.isRegExp(rule)) {
    return rule.test(subject)
  } else if (_.isFunction(rule)) {
    return !!rule(subject)
  } else if (_.isArray(rule)) {
    return _.every(rule, (condition) => testRule(condition, subject))
  } else if (_.isString(rule)) {
    return new RegExp(rule).test(subject)
  } else {
    throw new Error('Invalid include / exclude rule')
  }
}
