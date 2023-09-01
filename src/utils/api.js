import service from "@/utils/service";

export function userLogin(data) {
    return service({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function userRegister(userData) {
    return service({
        url: '/user/register',
        method: 'post',
        data: {
            password: userData.password,
            username: userData.username,
            register_time: userData.register_time
        }
    })
}

export function userResetPassword(oldPassword, newPassword, email) {
    return service({
        url: '/resetpassword',
        method: 'post',
        params: {
            oldPassword,
            newPassword,
            email
        }
    })
}

export function userResetName(email, name) {
    return service({
        url: '/resetname',
        method: 'post',
        params: {
            email,
            name
        }
    });
}

export function userInfo(email) {
    return service({
        url: '/userinfo',
        method: 'get',
        params: {
            email
        }
    })
}
//info_type 为1 ：对应bookDetailsData
//info_type 为0 ,对应recommendedBooksData
export function bookInfo(book_id, info_type){
    return service({
        url:`/book/${book_id}/${info_type}`,
        method: 'get',
    })
}

export function commentInfo(){
    return service({

    })
}

