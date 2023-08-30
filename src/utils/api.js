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
        url: '/register',
        method: 'post',
        data: {
            password: userData.password,
            name: userData.name,
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


