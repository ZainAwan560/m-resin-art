// Provider-neutral payment boundary. No fake success is returned here.
export async function createPaymentIntent({amount,currency='PKR',metadata={}}){
  if(!process.env.PAYMENT_PROVIDER)return {configured:false,required:true,amount,currency,metadata};
  throw new Error('Payment provider adapter not configured yet');
}
