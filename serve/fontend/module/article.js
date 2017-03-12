import mFetch from '../ajax.js'
// 新建文章
export const add = function(title,uid){
    
    let data={
        title,
        uid
    }
    return mFetch('/article/add'
            ,data
            )
}
// 列表
export const list = function(uid){
    
    let data={
        uid
    }
    return mFetch('/article/list',data)
}