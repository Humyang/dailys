import mFetch from '../ajax.js'
// 新建文章
export const add = function(name){
    let data={
        name
    }
    return mFetch('/floder/add'
            ,data
            )
}
// 列表
export const list = function(){
    return mFetch('/floder/list',{})
}