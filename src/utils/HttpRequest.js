
import { message } from 'antd'

import axios from 'axios';
import Qs from 'qs';
import { errorCode } from '../global/error'
import { GetBackEndRootUrl } from '../global/environment'
import { eng2chn } from './StringUtils'

class HttpRequest {
    // async get(path, params = {}) {
    //     let payload = {};
    //     await axios.get( GetBackEndRootUrl() + path )
    //     // axios.get( 'https://www.easy-mock.com/mock/59801fd8a1d30433d84f198c/example/user/all' )
    //     // await axios.get( 'http://127.0.0.1:8090/api/users/all' )
    //     .then((response) => response.data)
    //     .then((data) => {
    //         console.log('axios get data, return:');
    //         console.log(data);//输出返回的数据
    //         if (data.code !== errorCode.ERROR_OK) {
    //             message.info('请求资源错误码：' + data.code + '  错误信息：' + data.error);
    //         } else {
    //             payload = data.payload;
    //         }
    //     })
    //     .catch(error => {
    //         console.log('axios catch error:');
    //         console.log(error);
    //     })
    //     return payload;
    // }

    /**
     * 
     * @param {*} callback 回调函数
     * @param {*} path 接口相对路径
     * @param {*} params get 请求的参数
     * @param {*} onlySuccess true：只有成功(ERROR_OK) 时，通过回调函数返回 data
     *                        false: 不管成功与否，都通过回调函数返回 data
     */
    asyncGet(callback, path, params = {}, onlySuccess = true) {
        // 配合后端实现固定的 session id
        axios.defaults.withCredentials=true;

        axios.get(GetBackEndRootUrl() + path, { params: params })
            .then((response) => response.data)
            .then((data) => {
                console.log('axios asyncGet data, return:');
                console.log(data);//输出返回的数据
                if (data.code === errorCode.ERROR_OK) {
                    callback(data);
                } else if (data.code === errorCode.ERROR_NOT_DATA) {
                    message.info('请求资源码:' + data.code + '  信息:' + data.error);
                    if (!onlySuccess)
                        callback(data);
                } else {
                    message.error('请求资源错误码:' + data.code + '  错误信息:' + data.error);
                    if (!onlySuccess)
                        callback(data); 
                }
                // if (data.code !== errorCode.ERROR_OK) {
                //     message.error('请求资源错误码：' + data.code + '  错误信息：' + data.error);
                //     if (!onlySuccess)
                //         callback(data);
                // } else {
                //     callback(data);
                // }
            })
            .catch(error => {
                console.log('axios asyncGet catch error:');
                console.log(error);
                message.error(eng2chn(error.message));
            })
    }

    /**
     * 
     * @param {*} callback 回调函数
     * @param {*} path 接口相对路径
     * @param {*} params post 请求的参数
     * @param {*} onlySuccess true：只有成功(ERROR_OK) 时，通过回调函数返回 data
     *                        false: 不管成功与否，都通过回调函数返回 data
     */
    asyncPost(callback, path, params, onlySuccess = true) {
        // 配合后端实现固定的 session id
        axios.defaults.withCredentials=true;

        axios.post(GetBackEndRootUrl() + path, Qs.stringify(params))
            .then((response) => response.data)
            .then((data) => {
                console.log('axios asyncPost data, return:');
                console.log(data);//输出返回的数据
                if (data.code !== errorCode.ERROR_OK) {
                    message.error('请求资源错误码：' + data.code + '  错误信息：' + data.error);
                    if (!onlySuccess)
                        callback(data);
                } else {
                    callback(data);
                }
            })
            .catch(error => {
                console.log('axios catch error:');
                console.log(error);
                message.error(eng2chn(error.message));
            })
    }

    /**
     * 
     * @param {*} callback 回调函数
     * @param {*} specificUrl ip地址
     * @param {*} path 接口相对路径
     * @param {*} params get 请求的参数
     * @param {*} onlySuccess true：只有成功(ERROR_OK) 时，通过回调函数返回 data
     *                        false: 不管成功与否，都通过回调函数返回 data
     */
    asyncGetSpecificUrl(callback, specificUrl, path, params = {}, onlySuccess = true) {
        // 配合后端实现固定的 session id
        axios.defaults.withCredentials=true;

        axios.get(specificUrl + path, { params: params })
            .then((response) => response.data)
            .then((data) => {
                console.log('axios asyncGet data, return:');
                console.log(data);//输出返回的数据
                if (data.code === errorCode.ERROR_OK) {
                    callback(data, null);
                } else if (data.code === errorCode.ERROR_NOT_DATA) {
                    message.info('请求资源码:' + data.code + '  信息:' + data.error);
                    if (!onlySuccess)
                        callback(data, null);
                } else {
                    message.error('请求资源错误码:' + data.code + '  错误信息:' + data.error);
                    if (!onlySuccess)
                        callback(data, null); 
                }
            })
            .catch(error => {
                console.log('axios asyncGet catch error:');
                console.log(error);
                message.error(eng2chn(error.message));
                callback(null, error);
            })
    }

}

export default new HttpRequest()