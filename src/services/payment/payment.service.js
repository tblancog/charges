const { Types } = require("mongoose");
const createPayment = (Payment) => ({ user, event, amount, currency }) => {
  const payment = new Payment({ user, event, amount, currency });
  return payment.save();
};

const getPayments = (Payment) => (userId) => {
  const param = userId ? { user: userId } : {};
  return Payment.find(param);
};

module.exports = (Payment) => {
  return {
    createPayment: createPayment(Payment),
    getPayments: getPayments(Payment),
    // getPaymentsByUser: getPaymentsByUser(Payment),
  };
};
