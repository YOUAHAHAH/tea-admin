import requests from "./request";

// 查询所有的用户
export const selectUser = () => {
    return requests({
        url: "/api/selectUser",
        method: "post"
    })
}

// 查询所有商品
export const selectGoodsList = () => {
    return requests({
        url: "/api/selectGoodsList",
        method: "get"
    })
}

// 编辑商品
export const editGoodsList = (data) => {
    return requests({
        url: "/api/editGoodsList",
        method: "post",
        data
    })
}

// 添加商品
export const addGoodsList = (data) => {
    return requests({
        url: '/api/addGoodsList',
        method: 'post',
        data
    })
}

// 删除商品
export const deleteGoodsList = (id) => {
    return requests({
        url: '/api/deleteGoodsList',
        method: 'post',
        data: { id }
    })
}

// 查询订单
export const selectOrder = () => {
    return requests({
        url: '/api/selectOrder',
        method: 'get'
    })
}

// 查询订单用户
export const selectOrderUser = (uid) => {
    return requests({
        url: '/api/selectOrderUser',
        method: 'get',
        params: { uid }
    })
}

// 查询订单地址
export const selectOrderAddress = (uid) => {
    return requests({
        url: '/api/selectOrderAddress',
        method: 'get',
        params: { uid }
    })
}

// 用户注册
export const EnrollUser = (data) => {
    return requests({
        url: '/api/EnrollUser',
        method: 'post',
        data
    })
}

// 登录查询
export const LoginUser = (data) => {
    return requests({
        url: '/api/LoginUser',
        methos: 'get',
        params: data
    })
}

// 发布消息
export const publishMessage = (data) => {
    return requests({
        url: '/api/publishMessage',
        method: 'post',
        data
    })
}

// 查询消息
export const selectMessage = (data) => {
    return requests({
        url: '/api/selectMessage',
        method: 'get',
        params: data
    })
}

// 标记已读(单个)
export const readMessage = (id) => {
    return requests({
        url: '/api/readMessage',
        method: 'post',
        data: { id }
    })
}

// 标记已读(全部)
export const readAllMessage = () => {
    return requests({
        url: '/api/readAllMessage',
        method: 'post'
    })
}

// 标记删除(单个)
export const deleteMessage = (id) => {
    return requests({
        url: '/api/deleteMessage',
        method: 'post',
        data: { id }
    })
}

// 标记删除(全部)
export const deleteAllMessage = () => {
    return requests({
        url: '/api/deleteAllMessage',
        method: 'post'
    })
}

// 清空消息
export const clearMessage = () => {
    return requests({
        url: '/api/clearMessage',
        method: 'post'
    })
}
