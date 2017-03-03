var STATUSCODE_START = 100
module.exports = {
    DAY:86399500,
    CODE:{
        USERNAME_REPTER:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'用户名重复'
        },
        USERNAME_INVALID:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'账号格式不符合要求'
        },
        USERNAME_ERROR:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'账号或密码错误'
        },
        USERNAME_NO_FIND:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'没有找到此用户'
        },
        WORD_NOT_FIND:{
            STATUSCODE:STATUSCODE_START++,
            MSG:'未查询到：'
        }
    }
}
