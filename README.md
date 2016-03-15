## everblog-adaptor-hexo

Hexo adaptor for [everblog](https://github.com/everblogjs/everblog).

### How to use

1. cd your_hexo_blog_dir
2. npm i everblog-adaptor-hexo --save
3. vim index.js, add:

    module.exports = require('everblog-adaptor-hexo')

4. everblog build (see [everblog](https://github.com/everblogjs/everblog))
5. hexo server
6. open http://localhost:4000/