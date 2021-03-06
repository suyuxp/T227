'use strict';

var logger = require("tracer").colorConsole();
import _ from "underscore";

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
  init(http) {
      super.init(http);
      this._method = "_method"; //指定请求类型从 GET 参数 _method 里获取
    }
    /**
     * before magic method
     * @return {Promise} []
     */
  __before() {

  }
  async getAction() {
    let categories = this.model("categories"),
      texts = this.model("texts"),
      url = this.http.req.url,
      id = this.id;
    logger.info(this.http.req.url.split("\/")[2]);
    if (id) {
      if (think.isEmpty(this.get('texts'))) {
        id = this.http.req.url.split("\/")[2];
        let textList = await texts.query(`SELECT a.id as text_id , a.name as text_name  , a.state as text_state , c.name as level_name , d.name as category_name , d.state as category_state , * FROM texts AS a INNER JOIN levels AS c ON a.level_id = c.id INNER JOIN categories AS d ON a.category_id = d.id WHERE a.category_id = ${id}`);

        let levels = await this.model("levels").order("grade ASC").select();
        let groupBy = _.groupBy(textList, 'level_name');
        let lists = _.map(groupBy, (val, key) => {
          let level = _.find(levels, (level) => {
            return level.name == key
          });
          return {
            "level": level,
            "texts": _.map(val, (v) => {
              return {
                "id": v.text_id,
                "name": v.text_name,
                "authority": v.authority,
                "issue_date": v.issue_date,
                "execute_date": v.execute_date,
                "state": v.text_state
              }
            })
          };
        });
        return this.json(lists);
      } else {
        this.status(404);
        return this.fail({
          reason: "没有找到对应url"
        });
      }
    } else {
      try {
        let categoryList = await categories.where({
          state: "enable"
        }).order("priority DESC").select();
        // logger.debug(categoryList);
        return this.json(categoryList);
      } catch (e) {
        logger.error(e);
        return this.fail(e);
      }
    }
  }
  async postAction() {
    let categories = this.model("categories"),
      pk = await categories.getPk(),
      postData = this.post();
    delete postData[pk];
    let insertedData = await categories.thenAdd(postData, {
      "name": postData.name
    });
    logger.info(insertedData);
    if (think.isEmpty(insertedData)) {
      return this.fail({
        reason: "添加失败"
      });
    } else {
      if (insertedData.type == 'exist') {
        this.status(409);
        return this.fail({
          "reason": "name_duplicated"
        });
      } else {
        let category = await categories.where({
          [pk]: insertedData.id
        }).find();
        this.status(201);
        return this.json(category);
      }
    }
  }
  async putAction() {
    if (this.id) {
      let categories = this.model("categories"),
        pk = await categories.getPk(),
        postData = this.post();

      logger.info(postData);
      delete postData[pk];
      logger.info(postData);
      if (think.isEmpty(postData)) {
        return this.fail({
          reason: "请求数据为空"
        });
      }
      try {
        let rows = await categories.where({
          [pk]: this.id
        }).update(postData);
        logger.info(rows);
        let category = await categories.where({
          [pk]: this.id
        }).find();
        return this.json(category);
      } catch (error) {
        logger.debug(error);
        if (error.code == '23505') {
          this.status(409);
          return this.fail({
            "reason": "name_duplicated"
          });
        } else {
          return this.fail({
            "reason": "更新数据失败"
          });
        }
      }
    } else {
      return this.fail({
        reason: "请求id为空"
      });
    }
  }
  async deleteAction() {
    if (!this.id) {
      return this.fail("请求id为空");
    }
    let pk = await this.modelInstance.getPk();
    let rows = await this.modelInstance.where({
      [pk]: this.id
    }).delete();
    logger.info(rows);
    let category = await this.modelInstance.where({
      [pk]: this.id
    }).find();
    logger.info(think.isEmpty(category));
    if (think.isEmpty(category)) {
      return this.json({
        "action": "success"
      });
    } else {
      return this.fail({
        "action": "fail"
      })
    }
  }
}
