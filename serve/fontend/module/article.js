import mFetch from '../ajax.js'
// 新建文章
export const add = function(title,floder_uid){
    
    let data={
        title,
        floder_uid
    }
    return mFetch('/article/add'
            ,data
            )
}
// 更新文章
export const update = function(content,title,selfuid){
    
    let data={
        content,
        title,
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
            ).then(function(obj){
                if(obj.result.content === undefined){
                    obj.result.content = ""
                }
                return obj
            })
}
// 列表
export const list = function(floder_uid){
    
    let data={
        floder_uid
    }
    return mFetch('/article/list',data)
}