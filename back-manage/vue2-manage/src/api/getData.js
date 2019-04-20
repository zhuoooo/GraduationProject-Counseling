import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/user/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/admin/signout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

/**
 * 添加用户
 */

export const addUser = data => fetch('/backend/userinfo', data, 'POST');

/**
 * 修改用户
 */

export const updateUser = (userid, data) => fetch('/backend/userinfo' + userid, data, 'PUT');

/**
 * 修改帖子
 */

export const updatePost = (postid, data) => fetch('/backend/article' + postid, data, 'PUT');

/**
 * 获取帖子信息
 */

export const getPostInfo = (data) => fetch('/article/all', data);

/**
 * 添加帖子
 */

export const addPost = data => fetch('/article', data, 'POST');

/**
 * 删除帖子
 */

export const deletePost = postid => fetch('/backend/article'+ postid, 'DELETE');

/**
 * 获取案例信息
 */

export const getCaseInfo = (data) => fetch('/case/all', data);

/**
 * 删除案例
 */

export const deleteCaseInfo = (caseid, data) => fetch('/backend/case/' + caseid, data, 'DELETE');

/**
 * 修改案例信息
 */

export const updateCaseInfo = (caseid,data) => fetch('/backend/case/'+ caseid, data, 'PUT');
