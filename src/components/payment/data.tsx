import { Currency, PaymentMethod } from "./interface";

export const data: any[] = [
  {
    method: PaymentMethod.CARD,
    paymentType: "Pay with Naira",
    logo: "/images/payment/payStack.svg",
    motto: "Secured by Paystack",
    active: false,
    currency: Currency.NGN,
    isDefault: true,
  },
  // {
  //   method: PaymentMethod.CARD,
  //   paymentType: "Pay with Naira",
  //   logo: "/images/payment/payStack.svg",
  //   motto: "Secured by Flutterwave",
  //   active: false,
  //   currency: Currency.NGN,
  //   isDefault: true,
  // },
  {
    method: PaymentMethod.CARD,
    paymentType: "Pay with Dollar",
    logo: "/images/payment/stripe.svg",
    motto: "Secured by Stripe",
    active: false,
    currency: Currency.USD,
    isDefault: true,
  },
  {
    method: PaymentMethod.WALLET,
    paymentType: "Pay with Wallet",
    logo: "/images/logo.png",
    motto: "Secured by Edtify",
    active: false,
    link: "https://checkout.flutterwave.com/v3/hosted/pay",
    currency: "*",
    isDefault: false,
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
  // {
  //   value: "WALLET",
  //   label: "Pay From Wallet",
  // },
  // {
  //     value: 'TRANSFER',
  //     label: 'Pay by Transfer',
  // },
];
