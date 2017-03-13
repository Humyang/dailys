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
// 更新文章
export const update = function(content,selfuid){
    
    let data={
        content,
        selfuid
    }
    return mFetch('/article/update'
            ,data
            )
}
// 查询文章
export const content = function(selfuid){
    
    let data={
        selfuid
    }
    return mFetch('/article/content'
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