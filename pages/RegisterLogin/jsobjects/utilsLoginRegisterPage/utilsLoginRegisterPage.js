export default {
	countUser: async () => {
		try {
			if (input_username.text && input_password.text) {
				const result = await getThisUser.run();
				
				if (result.length > 0) {
            await storeValue('userName', result[0].customerName);
            await storeValue('userEmail', result[0].email);
            await storeValue('userPhone', result[0].phone);
            await storeValue('userAddress', result[0].addressLine1);
            await storeValue('userDOB', result[0].dob);
            await storeValue('userGender', result[0].gender);

            return result.length;
        } else {
            return 0;
        }
				
			} else {
				return -1;
			}
		} catch (e) {
			return -1;
		}
		
	},

	onSession: async (username, password) => {
		await storeValue('userUsername', username);
		await storeValue('userPassword', password);
		showAlert('Đăng nhập thành công','success');
		await navigateTo('Homepage');
	},
	
}