import service from "@/utils/service";
import fileService from "@/utils/fileService";
//import fetcher from "@/utils/fetcherService";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

export function userLogin(data) {
  return service({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function userAutoLogin() {
  return service({
    url: "/user/auto_login",
    method: "get",
  });
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
  const requestUrl = `/book/${book_id}/${info_type}`;
  // 使用 SWR 钩子来获取数据
  const { data, error, isLoading } = useSWR(requestUrl, fetchInfo);

  return {
    data: data,
    isLoading,
    isError: error,
  };
}

export function getUserInfo(user_id) {
  return service({
    url: `/user/${user_id}`,
    method: "get",
  });
}

export function getCollect(method, book_id, user_id) {
  const requestUrl = `/action/collect/${method}/${book_id}/${user_id}`;
  // 使用 SWR 钩子来获取数据
  const { data, error, isLoading } = useSWR(requestUrl, fetchInfo);
  return {
    collectRecord: data,
    isLoading,
    isError: error,
  };
}

// 根据book_id获取收藏信息，用于“谁看这本书”
export function getCollectByBookId(book_id) {
  const requestUrl = `/action/collect/1/${book_id}/0`;
  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (index) => `${requestUrl}?&current_page=${index + 1}`,
      fetchInfo
    );
  return {
    data,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading,
  };
}

// 根据user_id获取收藏信息，用于“时光机-collect”
export function getCollectByUserId(user_id,page_size){
  const requestUrl = `/action/collect/2/0/${user_id}`
  const {
    data,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading
  } = useSWRInfinite(
    (index) =>
      `${requestUrl}?&current_page=${
        index + 1
      }&page_size=${page_size}`,
    fetchInfo
  );
  return {
    data,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading,
  };
}

// 根据user_id获取评论信息，用于“时光机-comment”
export function getCommentByUserId(user_id,page_size){
  const requestUrl = `/action/comment/2/0/${user_id}`
  const {
    data,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading
  } = useSWRInfinite(
    (index) =>
      `${requestUrl}?&current_page=${
        index + 1
      }&page_size=${page_size}`,
    fetchInfo
  );
  return {
    data,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading
  }
}

// 根据user_id获取评分信息，用于“时光机-rating”
export function getRatingByUserId(user_id,page_size){
  const requestUrl = `/action/rating/2/0/${user_id}`
  const {
    data,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading
  } = useSWRInfinite(
    (index) =>
      `${requestUrl}?&current_page=${
        index + 1
      }&page_size=${page_size}`,
    fetchInfo
  );
  return {
    data,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading
  }
}

export function getRating(method,book_id,user_id){
  const requestUrl = `/action/rating/${method}/${book_id}/${user_id}`
  // 使用 SWR 钩子来获取数据
  const { data, error, isLoading } = useSWR(requestUrl, fetchInfo);
  return {
    ratingRecord: data,
    isLoading,
    isError: error,
  };
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
    method: "get",
    params: {
      tag_id: tag_id,
      page: page,
      per_page: per_page,
    },
  });
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

export function addCollect(book_id, user_id, collect_type) {
  return service({
    url: `/action/add`,
    method: "post",
    data: {
      type: 1,
      book_id: book_id,
      user_id: user_id,
      content: collect_type,
    },
  });
}

export function addRating(book_id, user_id, rating) {
  return service({
    url: `/action/add`,
    method: "post",
    data: {
      type: 3,
      book_id: book_id,
      user_id: user_id,
      content: rating,
    },
  });
}

export function changePassword(origin_password, new_password) {
  return service({
    url: "/user/update_password",
    method: "post",
    data: {
      origin_password: origin_password,
      new_password: new_password,
    },
  });
}

// 封装文件上传 API
export function changeAvatar(file, info) {
  const formData = new FormData();
  formData.append("avatar", file); // 'avatar' 是后端接受文件的字段名
  formData.append("user_id", info.user_id);
  return fileService
    .post("/user/upload_avatar", formData)
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
