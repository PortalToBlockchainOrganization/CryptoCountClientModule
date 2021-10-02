import React from "react";
import "./Button.css";
import axios from 'axios'
import { useQuery } from 'react-query'
import classes from "./Button.css";
import { QueryClient, QueryClientProvider } from 'react-query'
import { jsPDF } from 'jspdf';





const queryClient = new QueryClient()

export default function Button() {
	return (
	  <QueryClientProvider client={queryClient}>
		<Fetcher />
	  </QueryClientProvider>
	)
  }

const Fetcher = ({realizingValue, setRealizingValue, ...props}) => {

	const address = 'tz1cgrzpsB43pBppH6mJzrHnFqxU8RUce991'
  	const fiat = 'USD'
	const firstName = "John"
	const lastName = "Doh"
	const email= "johnDoh@gmail.com"
	const form = React.createRef()
	//var quantityRealizing = 0

	const quantityRealize = React.createRef();
	const { status, data, error } = useQuery('todos', async () => {
		const { data } = await axios.get(`http://api.portaltoblockchain.org/Analysis/Tezos/Auto?address=${address}&fiat=${fiat}`)
		return (data)
		})

	const handleMax = (e /** DOM event, click */) => {
		// prevent page from refreshing
		e.preventDefault();

		// quantityRealize is Ref
		quantityRealize.current.value =
		data.unrealizedRewardAgg.toFixed(0);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(event.target.elements.quantityRealizing.value)
		event.target.style.opacity = "0.2";
		query2(event.target.elements.quantityRealizing.value) // from elements property
	  }

	const query2 =  async (quantityRealizing) => {
		console.log("here")
		axios.get(`http://api.portaltoblockchain.org/Analysis/Tezos/AutoRealize
		?address=${address}&fiat=${fiat}&realizingQuantity=${quantityRealizing}`).then((data2)=>{
			console.log(data2)
			var doc = new jsPDF()
			
			doc.setFontSize(18);
			//doc.addImage(myImage, 'JPEG', 20, 25, 23, 23, 'PTBO Logo');
			doc.text("STATEMENT OF TEZOS BLOCK REWARD INCOME", 50, 35)
			doc.setFontSize(12);
			doc.text("PORTAL TO BLOCKCHAIN ORGANIZATION", 50, 40)
			doc.setFontSize(10)
			doc.text("CALCULATED BY CRYPTOCOUNT", 50, 45)
			//doc.addImage(tezLogo, 'JPEG', 20, 25, 23, 23, 'Tezos Logo');
			doc.text("HOST BLOCKCHAIN: TEZOS " , 25, 60)
			doc.text("TEZOS DELEGATOR ADDRESS: " + data2.data.address, 25, 67)
			doc.text("FIAT: " + data2.data.fiat, 25, 74)
			doc.text("QUANTITY OF REWARDS SOLD: " + data2.data.realizingRewardAgg.toFixed(2) + " XTZ", 25, 81)
			doc.text("AVERAGE BASIS COST: " + data2.data.basisPrice.toFixed(2) + " " + data2.data.fiat, 25, 88)
			doc.text("TRUE REWARD INCOME: "+ data2.data.realizingRewardBasisAgg.toFixed(2) + " " + data2.data.fiat, 25, 95)
			//var doc = [props][pdfDocument]
			//doc.setFontSize(12)
			doc.text("CALCULATED ON BEHALF OF", 25, 109)
			doc.text("NAME: " + firstName + " " + lastName, 25, 116)
			doc.text("EMAIL: " + email, 25, 123)
		
			doc.save("TezosRewardIncomeStatement.pdf")
		}).catch((err) => {
			console.log(err);
		});
		  
	}
	

	//let isSubmitted = quantityRealizing > 0 
	//const {status2, data2, error2, isLoading} = useQuery(['realize', quantityRealizing], query2, {enabled: isSubmitted});



	
	
	return(
		<div className={classes.RegisterWrapper}>
		{status === 'loading' ? (
			'Loading...'
		) : status === 'error' ? (
			error.message
		) : (

							<form onSubmit={handleSubmit} className={classes.Form}>
								<input
									id="actionForm"
									name="quantityRealizing"
									type="text"
									//defaultValue={quantityRealizing}
									ref={quantityRealize}
									placeholder='XTZ Rewards' />
								<button
									onClick={handleMax}
								>
									Fill With Max
								</button>
								<button type="submit">

									Generate Statement
								</button>
							</form>
						)}
					</div>
	)

}