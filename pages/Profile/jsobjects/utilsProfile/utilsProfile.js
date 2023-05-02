export default {
	myVar1: [],
	myVar2: {},
	
	outSession: async () => {
		
		await storeValue('userUsername', "");
		await storeValue('userPassword', "");
		await storeValue('userName', "");
		await storeValue('userEmail', "");
		await storeValue('userPhone', "");
		await storeValue('userAddress', "");
		await storeValue('userDOB', "");
		await storeValue('userGender', "");
	
		navigateTo('RegisterLogin');
		resetWidget('lst_cart');

	},
	
	
	creation_time: () => {
		var myDate = moment().format();
		return(moment(myDate).format("HH:mm:ss")); 
	},

	
	verifyPhoneNumber: async () => {
		const phoneNumber = '';

	},

}
