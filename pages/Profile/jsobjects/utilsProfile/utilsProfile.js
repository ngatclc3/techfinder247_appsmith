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

	
	submitPhone: async () => {
		// verifyPhoneNumber.run();

		const accountSid = 'AC94cf586af34c42d5b3026be7c77c6525';
		const authToken = '7ed7ac0e0cc1ee44f2fa4b353405c7ef';
		// const phoneNumber = userPhone.value;
		// 
		// const client = require('twilio')(accountSid, authToken);
// 
		// client.verify.services.create({friendlyName: 'techfinder247'})
					// .then(service => {
          // return client.verify.services(service.sid)
              // .verifications
              // .create({to: '+${phoneNumber}', channel: 'sms'});
      // })
      // .then(verification => console.log(verification.status))
      // .catch(error => console.log(error));
		
		
		
		// fetch("https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/Messages.json", {
    // method: 'POST',
    // headers: {
        // 'Authorization': 'Basic ' + btoa(accountSid + ':' + authToken),
        // 'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // body: new URLSearchParams({
        // 'From': '+84373104274',
        // 'To': '+84368892821',
        // 'Body': 'Ma xac thuc: 6189'
    // })
// }).then(response => response.json())
  // .then(data => console.log(data));



	},
	
	submitOTP: async () => {
		// input_otp.text === '4189' ? btn_profileSave.isDisabled = false : btn_profileSave.isDisabled = true;
		const accountSid = 'AC94cf586af34c42d5b3026be7c77c6525'; //'YOUR_ACCOUNT_SID';
		const authToken = '7ed7ac0e0cc1ee44f2fa4b353405c7ef'; //YOUR_AUTH_TOKEN';
		
		const phoneNumber = userPhone.value;
		const otp = input_otp.value;

		const client = require('twilio')(accountSid, authToken);
	
		client.verify.services.create({friendlyName: 'techfinder247'})
					.then(service => {
							return client.verify.services(service.sid)
									.verificationChecks
									.create({to: '+${phoneNumber}', code: '123456'});
					})
					.then(verification_check => {
							showAlert('Xác nhận thành công!','success');
							console.log(verification_check.status);
					})
					.catch(error => console.log(error));


	},
	 

}
