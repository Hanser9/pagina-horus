var model = require('../models/home')

module.exports.doSome = function (d) {
  return new Promise( async function(resolve, reject) {
    let aw = await model.doSome()
    aw = aw.err ? aw : {err:false, data: aw}
    resolve(aw)
  })
}
