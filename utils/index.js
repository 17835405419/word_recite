/* 
	涉及到数据库的共用函数
 */

const db = uniCloud.database()

export const activationkey = async (key) => {	

	 	const {result} = await db.collection("secret").where({
	 		"secret_key":key
	 	} ).get()
	 	
	if(result.data.length != 0){
		return true
	}
	return false
}


export const saveWordListToDB = async (secret_key,wordList) => {
	if(!secret_key){
		return uni.showToast({
			title:"抱歉您未登录",
			icon:"none" 
		})
	}
	let obj = {}
	obj = {
		secret_key:secret_key,
		english_list:wordList 
	}
	await db.collection("word").add(obj)
	return true
}