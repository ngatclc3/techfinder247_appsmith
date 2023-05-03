export default {
	onOpen: async () => {
		
		const hasVisited = localStorage.getItem('hasVisited');
		// Check if the "hasVisited" key has a truthy value (i.e., not null, undefined, false, 0, etc.)
		if (!hasVisited) {
			await storeValue('userID', "");
			await storeValue('userUsername', "");
			await storeValue('userPassword', "");
			await storeValue('userName', "");
			await storeValue('userEmail', "");
			await storeValue('userPhone', "");
			await storeValue('userAddress', "");
			await storeValue('userDOB', "");
			await storeValue('userGender', "");

			localStorage.setItem('hasVisited', 'true');
		}

		await storeValue('cart', appsmith.store?.cart || [])
		await storeValue('search', appsmith.store?.search || '')
		await storeValue('filter', appsmith.store?.filter || '')
		
		closeModal('mdl_confirm');
		closeModal('mdl_productDetail');
		closeModal('mdl_cart');
	},

	resetCart: () => {
		storeValue('cart',[]);
		resetWidget('lst_cart');
	},
	
	addToCart: async () => {
    await closeModal('mod_productDetail');
    const existingProduct = appsmith.store.cart.find(product => product.productID === lst_productList.selectedItem.productID);
    if (existingProduct) {
        existingProduct.qty += 1;
    } else {
        appsmith.store.cart.push({
					productID: lst_productList.selectedItem.productID,
					productName: lst_productList.selectedItem.productName,
					model: lst_productList.selectedItem.model,
					qty: 1,
					retailPrice: lst_productList.selectedItem.retailPrice,
					image: lst_productList.selectedItem.image
        });
    }
    await storeValue('cart', appsmith.store.cart);
    // await showAlert(`${lst_productList.selectedItem.model} added to cart`, 'info');
		await showAlert(`${lst_productList.selectedItem.productLine} đã thêm vào giỏ hàng`, 'info');
	},

	saveQty: async (_qty, itemId) => {
		let cart = appsmith.store.cart; 
		let cartRow = cart.findIndex(item => item.productID === itemId);
		if (cartRow >= 0) { // as a null-check here
			cart[cartRow].qty = _qty;
			await storeValue('cart', cart);
			// await resetWidget('lst_cart'); // this causes bug: infinite list and disappear items in list (???)
		}
	},

	showConfirm: async (title, message, icon) => {
		await storeValue('confirm',{message:message, title:title, icon:icon});
		await resetWidget('mdl_confirm');
		await showModal('mdl_confirm');
	},

	isConfirmed: () => {
		let confirm = appsmith.store.confirm;
		if (confirm.response != undefined) {
			confirm.response = true;
		}
		storeValue('confirm', confirm);
		closeModal('mdl_confirm');
		//showAlert(JSON.stringify(confirm));

		let title = confirm.title;
		switch(title){
			// case 'Clear Cart'://Xoá giỏ hàng
			case 'XOÁ GIỎ HÀNG':
				utils.resetCart()
				break;
			// case 'CHECKOUT':
			case 'THANH TOÁN':
				storeValue('order', appsmith.store.cart)
				utils.createOrder();
				navigateTo('Checkout','SAME_WINDOW');
				utils.resetCart()
				break;
			// case 'RESET FILTERS':
			case 'ĐẶT LẠI BỘ LỌC':
				//showAlert('case = reset filters');
				storeValue('search','')
				storeValue('filter','')
				resetWidget('sel_productTypeFilter')
				break;
			default:
				//showAlert('default case');
		}
		return confirm

	},

	getSelectOptions: (data, labelKey, valueKey = 'productID') => {  
		// creates a deduplicated array of SelectOptions from data 
		let dupValues = data?.map(row => {return {'label':row[labelKey], 'value':row[valueKey]}});
		let output = {};
		dupValues?.forEach(option => {output[option.label] = option});
		let outputProps = Object.getOwnPropertyNames(output);
		return outputProps.map(prop => output[prop])
	},
	
	createOrder: async () => {
		const orderID = BigInt(Date.now().toString() + Math.floor(Math.random() * 1000000).toString()).toString().substr(0, 10);
		const paymentID = BigInt(Date.now().toString() + Math.floor(Math.random() * 1000000).toString()).toString().substr(0, 8);
		// showAlert(`orderID: ${orderID}`, 'info');
		// showAlert(`paymentID: ${paymentID}`, 'info');

		if (orderID > 0 && paymentID > 0) {
				storeValue('orderID', orderID);
				storeValue('paymentID', paymentID);

				await addOrder.run();
				await addPayment.run();

				 /*
					* This code below is to add each product of order into orderdetails table 
					*/
				let lineNumber = 1;
				for (let order of appsmith.store.order) { // SHIT BUG: SYNTAX IS "OF", NOT "IN"

					storeValue('orderdetailsProductID', order.productID);
					storeValue('orderdetailsQuantityOrdered', order.qty);
					storeValue('orderdetailsPriceEach', order.retailPrice);
					storeValue('orderdetailsOrderLineNumber', lineNumber);
					
					// showAlert(`orderdetails productID: ${order.productID}`, 'info');

					addOrderDetails.run();
					lineNumber++;
				}
		}
		
	},
	
		
	showMyOrdersHistory: async () => {

	},

	
	// getSortOptions: (data, labelKey, valueKey = 'id', sortOptions = []) => {
		// // creates a deduplicated array of SelectOptions from data
		// let dupValues = data?.map(row => {
			// return {
				// 'label': row[labelKey],
				// 'value': row[valueKey]
			// }
		// });
		// let output = {};
		// dupValues?.forEach(option => {
			// output[option.label] = option
		// });
		// let outputProps = Object.getOwnPropertyNames(output);
// 
		// if (sortOptions.length > 0) {
			// dupValues.sort((a, b) => {
				// let result = 0;
				// for (let i = 0; i < sortOptions.length; i++) {
					// const sortOption = sortOptions[i];
					// if (a.label === sortOption.attribute) {
						// result = a.value.localeCompare(b.value) * (sortOption.order === 'asc' ? 1 : -1);
						// break;
					// }
				// }
				// return result;
			// });
		// }
// 
		// return dupValues.map(option => output[option.label]);
	// },

	

}