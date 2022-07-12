var express = require('express');
var router = express.Router();
const connection = require("../db/sql.js");
// const UserLogin = require("../db/User.js");
// let jwt = require("jsonwebtoken"); // token

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

// 清空消息
router.post('/api/clearMessage', function (req, res, next) {
	connection.query(`update messages set status = replace(status, 3, 4)`, function (err, result) {
		if (err) return res.send({
			code: -1,
			success: false,
			msg: '全部清空失败！'
		})
		res.send({
			code: 200,
			success: true,
			msg: '全部清空成功！'
		})
	})
});

// 标记删除(全部)
router.post('/api/deleteAllMessage', function (req, res, next) {
	connection.query(`update messages set status = replace(status, 2, 3)`, function (err, result) {
		if (err) return res.send({
			code: -1,
			success: false,
			msg: '全部删除失败！'
		})
		res.send({
			code: 200,
			success: true,
			msg: '全部删除成功！'
		})
	})
})

// 标记删除(单个)
router.post('/api/deleteMessage', function (req, res, next) {
	let id = req.body.id;
	connection.query(`update messages set status = 3 where id = ${id}`, (err, result) => {
		if (err) return res.send({
			code: -1,
			success: false,
			msg: '删除失败！'
		})
		res.send({
			code: 200,
			success: true,
			msg: '删除成功！'
		})
	})
})

// 标记已读(全部)
router.post('/api/readAllMessage', function (req, res, next) {
	connection.query(`update messages set status= replace(status, 1, 2)`, function (err, result) {
		if (err) {
			res.send({
				code: -1,
				success: false,
				msg: "全部标记已读失败！"
			})
		} else {
			res.send({
				code: 200,
				success: true,
				msg: "全部标记已读成功！"
			})
		}
	});
})

// 标记已读(单个)
router.post('/api/readMessage', function (req, res, next) {
	let id = req.body.id;
	connection.query(`update messages set status = 2 where id = ${id}`, function (err, result) {
		if (err) {
			res.send({
				code: -1,
				success: false,
				msg: "标记已读失败！"
			})
		} else {
			res.send({
				code: 200,
				success: true,
				msg: "标记已读成功！"
			})
		}
	});
})

// 查询消息
router.get('/api/selectMessage', function (req, res, next) {
	connection.query(`select * from messages`, (err, result) => {
		if (err) {
			res.send({
				code: -1,
				success: false,
				msg: '查询失败！'
			})
		} else {
			res.send({
				code: 200,
				success: true,
				msg: '查询成功！',
				data: result
			})
		}
	})
})

// 发布消息
router.post('/api/publishMessage', function (req, res, next) {
	let params = req.body;
	connection.query(`insert into messages (title,content,status,type,time) values ('${params.name}','${params.desc}','1','${params.resource}','${params.date}' )`, (err, result) => {
		if (err) {
			res.send({
				code: -1,
				success: false,
				msg: "发布失败！"
			})
		} else {
			res.send({
				code: 200,
				success: true,
				msg: "发布成功！"
			})
		}
	})
})

// 登录查询
router.get('/api/LoginUser', function (req, res, next) {
	let params = {
		phone: req.query.phone,
		password: req.query.password
	};
	connection.query(`select * from user where phone='${params.phone}' and password='${params.password}'`, (err, result) => {
		if (err) throw err;
		else if (result.length > 0) {
			res.send({
				code: 200,
				success: true,
				msg: "登录成功！",
				data: result
			});
		} else {
			res.send({
				code: -1,
				success: false,
				msg: "账号或密码错误！"
			});
		}
	});
})

// 用户注册
router.post('/api/EnrollUser', function (req, res, next) {
	let params = {
		userp: req.body.phone,
		userpwd: req.body.password,
		userNickName: req.body.nickName,
	};

	//引入token包
	let jwt = require('jsonwebtoken');
	//用户信息
	let payload = { tel: params.userp };
	//口令
	let secret = 'YOUAH';
	//生成token
	let token = jwt.sign(payload, secret);

	connection.query(`select * from user where phone = ${params.userp}`, (err1, result1) => {
		if (err1) {
			res.send({
				code: -1,
				success: false,
				msg: '注册失败！'
			})
		} else {
			// 如果查询到数据，说明用户已存在
			if (result1.length > 0) {
				res.send({
					code: -2,
					success: false,
					msg: '手机号已被注册！'
				})
			}
			else {
				connection.query(`insert into user (phone,password,imgUrl,nickName,token) values ('${params.userp}', '${params.userpwd}', './images/rc.png', '${params.userNickName}', '${token}')`, (err2, result2) => {
					if (err2) {
						res.send({
							code: -3,
							success: false,
							msg: '注册失败！'
						})
					} else {
						res.send({
							code: 200,
							success: true,
							msg: '注册成功！'
						})
					}
				})
			}
		}
	})

})

// 查询订单地址
router.get('/api/selectOrderAddress', function (req, res, next) {
	let uid = req.query.uid;
	connection.query(`select * from address where uid = ${uid}`, (err, result) => {
		if (err) {
			res.send({
				code: -1,
				success: false,
				mes: '查询失败！'
			})
		} else {
			res.send({
				code: 200,
				success: true,
				mes: '查询成功！',
				data: result
			})
		}
	})
})

// 查询订单用户
router.get('/api/selectOrderUser', function (req, res, next) {
	let id = req.query.uid;
	connection.query(`select * from user where id = ${id}`, (err, result) => {
		if (err) {
			res.send({
				code: -1,
				success: false,
				msg: '查询失败！'
			})
		} else {
			res.send({
				code: 200,
				success: true,
				msg: '查询成功！',
				data: {
					phone: result[0].phone,
					name: result[0].nickName,
					img: result[0].imgUrl
				}
			})
		}
	})
})

// 查询所有商品
router.get('/api/selectOrder', function (req, res, next) {
	connection.query("select * from store_order", function (err, result) {
		if (err) {
			res.send({
				code: -1,
				success: false,
				msg: '查询失败！'
			})
		} else {
			res.send({
				code: 200,
				success: true,
				msg: '查询成功！',
				data: result
			})
		}
	})
});


// 删除商品
router.post('/api/deleteGoodsList', (req, res, next) => {
	let GoodsListId = req.body.id;
	connection.query(`delete from goods_list where id = ${GoodsListId}`, (err, result) => {
		if (err) {
			res.send({
				code: -1,
				success: false,
				msg: '删除失败！'
			})
		} else {
			res.send({
				code: 200,
				success: true,
				msg: '删除成功！'
			})
		}
	})
})

// 添加商品
router.post('/api/addGoodsList', (req, res, next) => {
	let formData = req.body;
	connection.query(`insert into  goods_list(name, content, price, pprice, num, times, imgUrl) values("${formData.name}", "${formData.content}", "${formData.price}", "${formData.pprice}", "${formData.num}", "${formData.times}", "${formData.fileList[0].url}")`, (err, result) => {
		res.send({
			code: 200,
			success: true,
			meg: '添加成功',
			data: result
		})
	})
})

// 编辑商品
router.post('/api/editGoodsList', (req, res, next) => {
	let formData = req.body;
	connection.query(`select * from goods_list where id = ${formData.id}`, (err, data) => {
		connection.query(`update goods_list set name = '${formData.name}', times = '${formData.times}', content = '${formData.content}', price = '${formData.price}', num = '${formData.num}' where id = ${data[0].id}`, (err1, data1) => {
			res.send({
				code: 200,
				success: true,
				msg: "编辑成功",
			})
		})
	})
})

// 查询所有商品
router.get('/api/selectGoodsList', (req, res, next) => {
	connection.query(`select * from goods_list`, (err, result) => {
		if (err) {
			res.send({
				code: -1,
				success: false,
				msg: "查询失败"
			})
		} else {
			res.send({
				code: 200,
				success: true,
				data: result
			})
		}
	})
})

// 查询所有的用户
router.post('/api/selectUser', (req, res, next) => {
	connection.query(`select * from user`, (err, result) => {
		if (err) {
			res.send({
				code: -1,
				success: false,
				msg: "查询失败"
			})
		} else {
			res.send({
				code: 200,
				success: true,
				msg: '查询用户信息成功！',
				data: result
			})
		}
	})
})

module.exports = router;
