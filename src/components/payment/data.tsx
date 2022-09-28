export const data = [
  {
    type: "CARD",
    paymentType: "Pay with Naira",
    logo: "/images/payment/payStack.svg",
    motto: "Secured by Paystack",
    active: true,
    width: 150,
    currency: "NGN",
  },
  {
    type: "CARD",
    paymentType: "Pay with Dollar",
    logo: "/images/payment/stripe.svg",
    motto: "Secured by Stripe",
    active: false,
    currency: "USD",
    width: 80,
  },
  {
    type: "WALLET",
    paymentType: "Pay with Wallet",
    logo: "/images/payment/logo.svg",
    motto: "Secured by Contentionary",
    active: false,
    link: "https://checkout.flutterwave.com/v3/hosted/pay",
    currency: "NGN",
    width: 200,
  },
];

export const currencies = [
  {
    value: "USD",
    label: "Pay in Dollar",
  },
  {
    value: "NGN",
    label: "Pay in Naira",
  },
  {
    value: "WALLET",
    label: "Pay From Wallet",
  },
  // {
  //     value: 'TRANSFER',
  //     label: 'Pay by Transfer',
  // },
];
