
const state={

};


const actions={
	// 登录操作
	login({commit},params){
		commit('login',params);
	},
	// 注册操作
	register({commit},params){
		commit('register',params);
	}
};


const mutations={
	// 登录操作
	login(state,params){
		// 记录登录的状态
		sessionStorage.setItem('loginStatus',0); // 0:表示登录失败
		// 获取本地的所有数据
		let data=JSON.parse(localStorage.getItem('data'));
		for(let i=0;i<data.length;i++){
			if(data[i].name==params.name&&data[i].pwd==params.pwd){
				// 说明登录成功
				sessionStorage.setItem('loginStatus',1);  // 1:表示登录成功
				break
			}
		}
	},
	// 注册操作
	register(state,params){
		// 获取本地的所有数据
		let data=JSON.parse(localStorage.getItem('data'))||[];
		// 添加一条数据
		data.push(params);
		// 存储最新的数据
		localStorage.setItem('data',JSON.stringify(data));
	}
};

export default{
	state,
	actions,
	mutations
}