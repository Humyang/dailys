// import mFetch from './ajax.js'
// 添加单词
// export const articleUpdate = function(title,content){
    
//     let data={
//         title,
//         content
//     }
//     return mFetch('/article/update'
//             ,data
//             )
// }
import * as ARTICLE from './module/article.js'
import * as FLODER from './module/floder.js'
import * as LOGIN from './module/login.js'

export {
    ARTICLE,
    FLODER,
    LOGIN
}