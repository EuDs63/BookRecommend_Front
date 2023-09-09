import service from "@/utils/service";
import fileService from "@/utils/fileService";
//import fetcher from "@/utils/fetcherService";
import useSWR from "swr";
import { func } from "prop-types";

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

async function fetchInfo(requestUrl) {
  try {
    const response = await service.get(requestUrl); // 发出 Axios 请求
    return response.data; // 返回从后端获取的数据
  } catch (error) {
    throw error; // 抛出错误以供 SWR 处理
  }
}

//info_type 为1 ：对应bookDetailsData
//info_type 为0 ,对应recommendedBooksData
export function getBookInfomation(book_id, info_type) {
  const requestUrl = `/book/${book_id}/${info_type}`
  // 使用 SWR 钩子来获取数据
  const { data, error, isLoading } = useSWR(requestUrl, fetchInfo);

  return {
    data: data,
    isLoading,
    isError: error,
  }
}

export function getCollect(method,book_id,user_id){
  const requestUrl = `/action/collect/${method}/${book_id}/${user_id}`
  // 使用 SWR 钩子来获取数据
  const { data, error, isLoading } = useSWR(requestUrl, fetchInfo);
  return {
    collect : data,
    isLoading,
    isError: error,
  }
}

export function getRating(method,book_id,user_id){
  const requestUrl = `/action/rating/${method}/${book_id}/${user_id}`
  // 使用 SWR 钩子来获取数据
  const { data, error, isLoading } = useSWR(requestUrl, fetchInfo);
  return {
    rating : data,
    isLoading,
    isError: error,
  }
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

// async function fetchUserAction(requestUrl, postData) {
//   try {
//     const response = await service.post(requestUrl, postData); // 发出 Axios 请求
//     return response.data; // 返回从后端获取的数据
//   } catch (error) {
//     throw error; // 抛出错误以供 SWR 处理
//   }
// }

// export function getUserAction(type, method, book_id, user_id) {
//   const requestUrl = `/action/get`
//   const postData = {
//     type: type,
//     method: method,
//     book_id: book_id,
//     user_id: user_id,
//   }
//   // 使用 SWR 钩子来获取数据
//   const { data, error, isLoading } = useSWR(['/action/get', postData], fetchUserAction);

//   return {
//     data: data,
//     isLoading,
//     isError: error,
//   }
// }

export function addComment(book_id, user_id, content) {
  return service({
    url: `/action/add`,
    method: "post",
    data: {
      type: 2,
      book_id: book_id,
      user_id: user_id,
      content: content,
    },
  });
}


export function changePassword(origin_password, new_password) {
  return service(
    {
      url: "/user/update_password",
      method: "post",
      data: {
        "origin_password": origin_password,
        "new_password": new_password
      },
    }
  );
}

// 封装文件上传 API
export function changeAvatar(file, info) {
  const formData = new FormData();
  formData.append("avatar", file); // 'avatar' 是后端接受文件的字段名
  formData.append("user_id", info.user_id);
  return fileService.post("/user/upload_avatar", formData)
    .then((response) => {
      // 处理上传成功后的响应
      console.log("上传成功", response.data);
      return response; // 可以返回响应数据供上层调用使用
    })
    .catch((error) => {
      // 处理上传失败时的错误
      console.error("上传失败", error);
      throw error; // 可以抛出错误供上层调用处理
    });
}