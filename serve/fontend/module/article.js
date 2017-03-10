import mFetch from '../ajax.js'
// 新建文章
export const add = function(title,content){
    
    let data={
        title
    }
    return mFetch('/article/add'
            ,data
            )
}
// 列表
export const list = function(title,content){
    
    // let data={
    //     title,
    //     content
    // }
    return mFetch('/article/list',{})
}