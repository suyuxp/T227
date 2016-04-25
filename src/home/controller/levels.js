'use strict';

var logger = require('tracer').colorConsole();

/**
 * rest controller
 * @type {Class}
 */
export default class extends think.controller.rest {
  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  init(http){
    super.init(http);
    this._method = "_method"; //指定请求类型从 GET 参数 _method 里获取
  }
  /**
   * before magic method
   * @return {Promise} []
   */
  __before(){
    logger.info("__before");
  }
  async getAction(){
    logger.info("getAction");
    let levels = this.model("levels");
    let levelList = await levels.order("grade ASC").select();
    return this.json(levelList);
  }
}