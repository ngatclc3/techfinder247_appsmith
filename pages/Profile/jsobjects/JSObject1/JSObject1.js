export default {
	myVar1: [],
	myVar2: {},
	creation_time: () => {
		var myDate = moment().format();
		return(moment(myDate).format("HH:mm:ss")); 
	},
	form_fields: () => {
		  let	name = (checkbox_receiveViaEmail.isChecked),
					pod = (Checkbox2.isChecked),
					months_known= (Checkbox3.isChecked),
					rating = (Checkbox4.isChecked),
					well= (Checkbox5.isChecked),
					improve=(Checkbox6.isChecked),
					doing= (Checkbox7.isChecked),
					feedback= (Checkbox8.isChecked),
					linkedin_recomm= (Checkbox9.isChecked),
					employee_name= (userEmail.text),
					creation_time= (Input2.text),
					linkedin_link_1=(!Input3.text.length==0),
					email_id = (userAddress.text);
  return {
					'name':name,
					'pod':pod,
					'months_known':months_known,
					'rating':rating,
					'well':well,
					'improve':improve,
					'doing':doing,
					'feedback':feedback,
					'linkedin_recomm':linkedin_recomm,
					'employee_name':employee_name,
					'creation_time':creation_time,
					'email_id':email_id,
					'linkedin_link_1':linkedin_link_1
  };
	},
form_id: (len = 12) => {
		return [...Array(len)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
	}
}
