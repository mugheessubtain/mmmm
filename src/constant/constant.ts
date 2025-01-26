
// export const BASE_URL=process.env.DEV_URL;
export const BASE_URL=process.env.NEXT_PUBLIC_PROD_URL;


export const apiRoutes={
    login:BASE_URL+"auth/login",
    register:BASE_URL+"auth/Signup",
    getTask:BASE_URL+"task",
    postTask:BASE_URL+"task",
    delete:BASE_URL+"task",
    update:BASE_URL+"task"


}
