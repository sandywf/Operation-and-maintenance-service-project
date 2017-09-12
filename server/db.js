'use strict';

let Mock=require('mockjs');
let Random=Mock.Random;

module.exports=()=>{
    const data={user:[],dmc:[],login:[]}
    for(let i=0;i<1000;i++){
        data.user.push(Mock.mock({
            key:i,
            username:Random.first(6,18),
            name: Random.cname(2,6),
            email:Random.email(),
            phonenum:/^1[0-9]{10}$/,
            'func|1':['user','server'],
            password:/\d{6}/
        }))
        data.dmc.push(Mock.mock({
            key:i,
            'active|1':['活跃','不活跃'],
            name: Random.cname(2,6),
            'dmsNum|1-100': 100,
            'atvnum|1-100': 100,
            'upflow|1-100': 100,
            "uparea|1": ["上海市", "江苏省","浙江省","安徽省"],
            client:/\d{6}/,
            ip:/\d{5,10}/,
            dflow:/\d{6}/,
            "darea|1": ["上海市", "江苏省","浙江省","安徽省"],
            packet:/\d{6}/,
            graph:/\d{6}/
        }))
        data.login.push(Mock.mock({
            id:i,
            username:Random.first(6,18),
            password:/\d{6}/
        }))
    }
    return data
};