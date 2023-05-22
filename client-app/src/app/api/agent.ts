import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { error } from "console";
import { toast } from "react-toastify";
import { store } from "../stores/store";
import { router } from "../router/Routes";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}


axios.defaults.baseURL = "http://localhost:5000/api";


const responseBody =<T> (response: AxiosResponse<T>) => response.data;


axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch(status){
        case 400:
            if (config.method === "get" && data.errors.hasOwnProperty("id")){
                router.navigate("/not-found");
            }
            if(typeof data === "string"){
                console.log(data);
            }
            if(config.method === "get" && data.errors.hasOwnProperty("id")){
                window.location.href = "/not-found";
            }
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }else{
                toast.error(data);
            }
            break;
        case 401:
            console.log("unauthorized");
            break;
        case 404:
            window.location.href = "/not-found";
            break;
        case 500:
            store.commonStore.setServerErorr(data);
            router.navigate("/server-error");
            break;
    }
    return Promise.reject(error);
})

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post:  <T> (url: string, body: {}) => axios.post <T>(url,body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put <T>(url,body).then(responseBody),
    del:  <T>(url: string) => axios.delete <T> (url).then(responseBody),
}

const Activities = { // this is the object that contains the methods
    list: () => request.get<Activity[]>("/activities"),
    details: (id: string) => request.get<Activity>(`/activities/${id}`), 
    create: (activity: Activity) => request.post<void>("/activities", activity),
    update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.del<void>(`/activities/${id}`)
}

const agent = { // this is the object that we will use to call the methods
    Activities
}

export default agent;