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
    let texts = this.model("texts"),
      pk = await texts.getPk(),
      word = this.param("word"),
      id = this.id;
    logger.info(word);
    if (id) {
      let textList = await texts.where({
        [pk]: id
      }).find();
      return this.json(textList);
    } else {
      //return this.join("think_cate ON think_group.cate_id=think_cate.id").select();
      // let textList = await texts.alias("a").join({
      //   levels: {
      //     join: "inner", // 有 left,right,inner 3 个值
      //     as: "c",
      //     on: ["level_id", "id"]
      //   },
      //   categories: {
      //     join: "inner",
      //     as: "d",
      //     on: ["category_id", "id"]
      //   }
      // }).where({
      //   "a.name|a.content": ["like", `% ${word} %`]
      // }).find();
      // let textList = await texts.query(`SELECT a.id as text_id , c.name as level_name , d.name as category_name , d.state as category_state , * FROM texts AS a INNER JOIN levels AS c ON a.level_id = c.id INNER JOIN categories AS d ON a.category_id = d.id WHERE ( (a.name LIKE '%${word}%') OR (a.content LIKE '%${word}%') )`);
      let levels = await this.model("levels").order("grade ASC").select();
      let groupBy = _.groupBy(textList, 'level_name');
      let lists = _.map(groupBy, (val, key) => {
        let level = _.find(levels, (level) => {
          return level.name == key
        });
        return {
          "level": level,
          "texts": val
        };
      });
      return this.json(lists);
    }
  }
  async postAction() {
    let texts = this.model("texts"),
      pk = await texts.getPk(),
      postData = this.post();
    delete postData[pk];
    let insertedData = await texts.thenAdd(postData, {
      "name": postData.name
    });
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
        let lists = await texts.query(`SELECT a.id as text_id , a.name as text_name  , a.state as text_state , c.name as level_name , d.name as category_name , d.state as category_state , * FROM texts AS a INNER JOIN levels AS c ON a.level_id = c.id INNER JOIN categories AS d ON a.category_id = d.id WHERE ( (a.name = '${postData.name}') OR (a.content = '${postData.name}') ) LIMIT 1`);

        if (!think.isEmpty(lists)) {
          let text = lists[0];
          let ret = {
            "id": text.text_id,
            "level": {
              "id": text.level_id,
              "name": text.level_name
            },
            "category": {
              "id": text.category_id,
              "name": text.category_name
            },
            "name": text.text_name,
            "authority": text.authority,
            "issue_date": text.issue_date,
            "execute_date": text.execute_date,
            "state": text.text_state,
            "content": text.content
          };
          this.status(201);
          return this.json(ret);
        } else {
          this.json({});
        }
      }
    }
  }
  async putAction() {
    if (this.id) {
      let texts = this.model("texts"),
        pk = await texts.getPk(),
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
        let rows = await texts.where({
          [pk]: this.id
        }).update(postData);
        logger.info(rows);
        let lists = await texts.query(`SELECT a.id as text_id , a.name as text_name  , a.state as text_state , c.name as level_name , d.name as category_name , d.state as category_state , * FROM texts AS a INNER JOIN levels AS c ON a.level_id = c.id INNER JOIN categories AS d ON a.category_id = d.id WHERE a.id = ${this.id}`);

        if (!think.isEmpty(lists)) {
          let text = lists[0];
          let ret = {
            "id": text.text_id,
            "level": {
              "id": text.level_id,
              "name": text.level_name
            },
            "category": {
              "id": text.category_id,
              "name": text.category_name
            },
            "name": text.text_name,
            "authority": text.authority,
            "issue_date": text.issue_date,
            "execute_date": text.execute_date,
            "state": text.text_state,
            "content": text.content
          };
          return this.json(ret);
        } else {
          this.json({});
        }
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