"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";
import { useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineCheck,
  HiOutlineCreditCard,
  HiOutlineQrcode,
  HiOutlineGlobeAlt,
} from "react-icons/hi";

export default function CheckoutPage() {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const totalPrice = cartTotal;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      addToast("Please fill in all required fields", "error");
      return;
    }

    if (cartItems.length === 0) {
      addToast("Your cart is empty", "error");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      addToast("Payment successful! Your enrollment is confirmed.", "success");
      
      // Clear cart and redirect
      cartItems.forEach((item) => removeFromCart(item.id));
      window.location.href = "/my-learning";
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-base-200/30 py-12">
        <div className="container-custom">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-lg opacity-70 mb-8">
              Add courses to your cart to proceed with checkout
            </p>
            <Link href="/courses" className="btn btn-primary">
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/30 py-12">
      <div className="container-custom">
        <Link
          href="/cart"
          className="btn btn-ghost btn-sm gap-2 mb-8"
        >
          <HiOutlineChevronLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 border border-base-300 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-6">Checkout</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Billing Information */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Billing Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">
                          <span className="label-text font-medium">First Name *</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="label">
                          <span className="label-text font-medium">Last Name *</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="label">
                        <span className="label-text font-medium">Email *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <label className="label">
                        <span className="label-text font-medium">Phone</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="divider"></div>

                  {/* Payment Method Selection */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Select Payment Method</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`card border-2 cursor-pointer transition-all ${
                        paymentMethod === "card" ? "border-primary bg-primary/5" : "border-base-300"
                      }`}>
                        <div className="card-body p-4 flex flex-row items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="radio radio-primary"
                          />
                          <div className="flex-1">
                            <p className="font-medium flex items-center gap-2">
                              <HiOutlineCreditCard className="w-5 h-5" />
                              Credit/Debit Card
                            </p>
                            <p className="text-xs opacity-60">Visa, Mastercard, Amex</p>
                          </div>
                        </div>
                      </label>

                      <label className={`card border-2 cursor-pointer transition-all ${
                        paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-base-300"
                      }`}>
                        <div className="card-body p-4 flex flex-row items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value="upi"
                            checked={paymentMethod === "upi"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="radio radio-primary"
                          />
                          <div className="flex-1">
                            <p className="font-medium flex items-center gap-2">
                              <HiOutlineGlobeAlt className="w-5 h-5" />
                              UPI
                            </p>
                            <p className="text-xs opacity-60">Google Pay, PhonePe, Paytm</p>
                          </div>
                        </div>
                      </label>

                      <label className={`card border-2 cursor-pointer transition-all ${
                        paymentMethod === "qr" ? "border-primary bg-primary/5" : "border-base-300"
                      }`}>
                        <div className="card-body p-4 flex flex-row items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value="qr"
                            checked={paymentMethod === "qr"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="radio radio-primary"
                          />
                          <div className="flex-1">
                            <p className="font-medium flex items-center gap-2">
                              <HiOutlineQrcode className="w-5 h-5" />
                              QR Code
                            </p>
                            <p className="text-xs opacity-60">Scan to pay instantly</p>
                          </div>
                        </div>
                      </label>

                      <label className={`card border-2 cursor-pointer transition-all ${
                        paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-base-300"
                      }`}>
                        <div className="card-body p-4 flex flex-row items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            value="wallet"
                            checked={paymentMethod === "wallet"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="radio radio-primary"
                          />
                          <div className="flex-1">
                            <p className="font-medium flex items-center gap-2">
                              <HiOutlineCreditCard className="w-5 h-5" />
                              Digital Wallet
                            </p>
                            <p className="text-xs opacity-60">Apple Pay, Google Wallet</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="divider"></div>

                  {/* Payment Information */}
                  {paymentMethod === "card" && (
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <HiOutlineCreditCard className="w-5 h-5" />
                        Card Details
                      </h3>
                      <div>
                        <label className="label">
                          <span className="label-text font-medium">Cardholder Name *</span>
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="input input-bordered w-full"
                          required={paymentMethod === "card"}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="label">
                          <span className="label-text font-medium">Card Number *</span>
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className="input input-bordered w-full"
                          required={paymentMethod === "card"}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="label">
                            <span className="label-text font-medium">Expiry Date *</span>
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className="input input-bordered w-full"
                            required={paymentMethod === "card"}
                          />
                        </div>
                        <div>
                          <label className="label">
                            <span className="label-text font-medium">CVV *</span>
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="3"
                            className="input input-bordered w-full"
                            required={paymentMethod === "card"}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <HiOutlineGlobeAlt className="w-5 h-5" />
                        UPI Payment
                      </h3>
                      <div className="alert alert-info mb-4">
                        <p>You'll be redirected to your UPI app to complete the payment securely.</p>
                      </div>
                      <label className="label">
                        <span className="label-text font-medium">UPI ID *</span>
                      </label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        className="input input-bordered w-full"
                        required={paymentMethod === "upi"}
                      />
                    </div>
                  )}

                  {paymentMethod === "qr" && (
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <HiOutlineQrcode className="w-5 h-5" />
                        QR Code Payment
                      </h3>
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-48 h-48 bg-base-300 rounded-lg flex items-center justify-center border-2 border-dashed">
                          <div className="text-center">
                            <HiOutlineQrcode className="w-16 h-16 mx-auto opacity-50 mb-2" />
                            <p className="text-sm opacity-60">Scan QR Code to Pay</p>
                          </div>
                        </div>
                        <p className="text-sm opacity-60 text-center">
                          Amount: <span className="font-bold">${(totalPrice * 1.1).toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "wallet" && (
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Digital Wallet</h3>
                      <div className="alert alert-info">
                        <p>Select your digital wallet app to complete payment. You'll be redirected securely.</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn btn-primary w-full gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <HiOutlineCreditCard className="w-5 h-5" />
                          Complete Purchase
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="card bg-base-100 border border-base-300 shadow-xl sticky top-28">
              <div className="card-body">
                <h2 className="card-title text-xl mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2">{item.title}</p>
                        <p className="text-xs opacity-60 mt-1">${item.discountPrice}</p>
                      </div>
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          addToast("Removed from cart", "info");
                        }}
                        className="text-error text-xs font-medium hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="divider my-0"></div>

                <div className="space-y-3 mt-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-success/10 rounded-lg border border-success/30">
                  <p className="text-sm flex items-center gap-2 text-success font-medium">
                    <HiOutlineCheck className="w-4 h-4" />
                    30-Day Money-Back Guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
