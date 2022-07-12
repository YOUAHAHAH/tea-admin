import { USER_LOGIN, INIT_USER } from './mutationsType.js';
export default {
    state: {
        loginStatus: false, // 登录状态
        token: null,
        userInfo: {}
    },
    getters: {

    },
    mutations: {
        [USER_LOGIN](state, user) {
            state.loginStatus = true;
            state.token = user.token;
            state.userInfo = user;
            localStorage.setItem('loginUserInfo', JSON.stringify(user));
        },
        // 存储信息
        [INIT_USER](state) {
            let userInfo = JSON.parse(localStorage.getItem('loginUserInfo'));
            if (userInfo) {
                state.loginStatus = true;
                state.token = userInfo.token;
                state.userInfo = userInfo
            }
        },
        // 退出登录
        loginOut(state) {
            state.loginStatus = false;
            state.token = null;
            state.userInfo = {};
            localStorage.removeItem('loginUserInfo');
        }
    },
    actions: {

    }
}