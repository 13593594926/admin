import axios from '@/plugins/axios.js'
// @/plugins/axios.js
// get
export function gets(url, data) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: data
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
// post
export function posts(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
// 登录
export let login = data => posts('/login', data)
// 左侧菜单
export let menus = () => gets('/menus')
// 用户数据列表
export let users = data => gets('/users', data)
// 添加用户
export let adUser = data => posts('/users', data)
// 修改用户状态
export let upState = (id, flag) => axios.put(`/users/${id}/state/${flag}`)
// 删除用户
export let remove = data => axios.delete('/users/' + data)
// 读取修改数据
export let upDa = data => gets('/users/' + data)
// 提交修改数据
export let addUpdate = (id, data) => axios.put('/users/' + id, data)
// 角色列表
export let getRoles = data => gets('/roles')
// 添加角色
export let addRoles = data => posts('/roles', data)
// 删除角色指定权限
export let delRoles = (user, id) => axios.delete(`/roles/${user}/rights/${id}`)
// 删除角色
export let delRole = data => axios.delete(`/roles/${data}`)
// 查询角色id
export let queryList = data => gets(data)
// 修改当前角色
export let isEditLiseEd = data => axios.put(`/roles/${data.roleId}`, data)