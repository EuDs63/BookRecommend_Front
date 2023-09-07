import service from "@/utils/service";
// import { func } from "prop-types";

export function userLogin(data) {
  return service({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function userAutoLogin() {
  return service({
    url: '/user/auto_login',
    method: 'get'
  })
}

export function userRegister(userData) {
  return service({
    url: "/user/register",
    method: "post",
    data: {
      password: userData.password,
      username: userData.username,
      register_time: userData.register_time,
    },
  });
}

export function userResetPassword(oldPassword, newPassword, email) {
  return service({
    url: "/resetpassword",
    method: "post",
    params: {
      oldPassword,
      newPassword,
      email,
    },
  });
}

export function userResetName(email, name) {
  return service({
    url: "/resetname",
    method: "post",
    params: {
      email,
      name,
    },
  });
}

export function userInfo(email) {
  return service({
    url: "/userinfo",
    method: "get",
    params: {
      email,
    },
  });
}
//info_type 为1 ：对应bookDetailsData
//info_type 为0 ,对应recommendedBooksData
export function bookInfo(book_id, info_type) {
  return service({
    url: `/book/${book_id}/${info_type}`,
    method: "get",
  });
}

export function getcategorybookInfo(category_id, page, per_page, order = 0) {
  return service({
    url: `/book/category`,
    method: "get",
    params: {
      category_id: category_id,
      page: page,
      per_page: per_page,
      order: order,
    },
  });
}

export function booksearch(keyword, page, per_page, method) {
  return service({
    url: `/book/search`,
    method: "get",
    params: {
      keyword: keyword,
      page: page,
      per_page: per_page,
      method: method,
    },
  });
}
  export function gettagbookInfo(tag_id, page, per_page) {
    return service({
      url: `/book/tag`,
      method: 'get',
      params: {
        tag_id: tag_id,
        page: page,
        per_page: per_page,
      }
    })
  }

  export function getAction(type, method, book_id, user_id) {
    return service({
      url: `/action/get`,
      method: "post",
      data: {
        type: type,
        method: method,
        book_id: book_id,
        user_id: user_id,
      },
    });
  }

  export function commentInfo() {
    return service(
      {}
    );
  }
