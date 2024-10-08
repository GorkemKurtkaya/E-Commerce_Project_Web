// import StripeCheckout,{Token} from 'react-stripe-checkout';
// import { useState,useEffect } from 'react';
// import axios from 'axios';









// function Pay(){
//     // const [stripeToken, setStripeToken] = useState(null);

//     // const onToken = (token) => {
//     //     setStripeToken(token);
//     //   };

//     // useEffect(()=>{
//     //     const makeRequest= async()=>{
//     //         try{
//     //             const res =await axios.post("http://localhost:3000/checkout/payment",{
//     //                 tokenId:stripeToken.id,
//     //                 amount:2000,
//     //             })
//     //             console.log(res.data);
//     //         }catch(err){
//     //             console.log(err)
//     //         }
//     //     };
//     //     stripeToken && makeRequest
//     // },[stripeToken])  

//     return(
//         <div style={{
//             height:"100vh",
//             display:"flex",
//             alignItems:"center",
//             justifyContent:"center"
//         }}
//         >
//             <StripeCheckout name='Gorkem Shop' image='https://avatars.githubusercontent.com/u/115563271?v=4' billingAddress shippingAddress
//             description='Your Total is 20TL'
//             amount={2000}
//             token={onToken}
//             stripeKey={KEY}>

            
//             </StripeCheckout>
//         </div>
//     )
    

// }
// export default Pay;