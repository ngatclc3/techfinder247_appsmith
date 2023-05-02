export default {
	myVar1: [],
	myVar2: {},
	
	terminateSession: async () => {
		
		await storeValue('userUsername', "");
		await storeValue('userPassword', "");
		await storeValue('userName', "");
		await storeValue('userEmail', "");
		await storeValue('userPhone', "");
		await storeValue('userAddress', "");
		await storeValue('userDOB', "");
		await storeValue('userGender', "");
		
		await storeValue('cart',[]);
		await storeValue('search','');
		await storeValue('filter','');
		
		resetWidget('lst_cart');
		resetWidget('lst_cart');
		resetWidget('sel_productTypeFilter');
		
		navigateTo('RegisterLogin');
	},
	
	
	creation_time: () => {
		var myDate = moment().format();
		return(moment(myDate).format("HH:mm:ss")); 
	},

	
	verifyPhoneNumber: async () => {
		const phoneNumber = '';

	},

}
