'use strict';

const _ = require('lodash')
const fse = require('fs-extra')
const moment = require('moment')
const fm = require('front-matter')
const entities = require('entities')
const enml2text = require('enml2text')
const debug = require('debug')('everblog-adaptor-spa')

module.exports = function* (data) {
  const dist = process.cwd() + '/source/_posts/'
  fse.emptyDirSync(dist)

  data.posts.forEach(post => {
    const defaultFrontMatter = {
      title: post.title,
      date: formatDate(post.created),
      updated: formatDate(post.updated),
      tags: post.tags
    }
    debug('content -> %j', post.content)

    let contentMarkdown = entities.decodeHTML(enml2text(post.content))
    debug('contentMarkdown -> %j', contentMarkdown)

    let data = fm.parse(contentMarkdown)
    _.merge(data.attributes, defaultFrontMatter)
    contentMarkdown = fm.stringify(data)

    const filename = dist + data.attributes.title + '.md'
    fse.outputFileSync(filename, contentMarkdown)
    debug('title -> %s, body -> %j', data.attributes.title, contentMarkdown)
  })
  debug('build success!')
}

function formatDate(timestamp) {
  return moment(timestamp).format('YYYY/M/DD HH:mm:ss')
}