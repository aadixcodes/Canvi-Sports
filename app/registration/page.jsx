"use client";
import { useState, useRef, useEffect } from "react";
import {
  Loader2,
  CreditCard,
  CheckCircle,
  X,
} from "lucide-react";
import Script from "next/script";

const RegistrationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  // Remove QR code related states
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [paymentMade, setPaymentMade] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    email: "",
    mobile: "",
    state: "",
    district: "",
    aadharFile: null,
    terms: false,
  });

  // OTP states
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  // Send OTP to email
  const handleSendOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch("/api/registration/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");
      setOtpSent(true);
    } catch (err) {
      setOtpError(err.message || "Failed to send OTP");
    }
    setOtpLoading(false);
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch("/api/registration/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid OTP");
      setOtpVerified(true);
    } catch (err) {
      setOtpError(err.message || "OTP verification failed");
    }
    setOtpLoading(false);
  };

  // Use ref to track if we've redirected to app
  const hasRedirected = useRef(false);

  // Detect mobile device on component mount and resize
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };

    // Check initially
    checkDevice();

    // Add event listener for resize
    window.addEventListener("resize", checkDevice);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = e.target.files?.[0] || null;
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validate form before payment
  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "fatherName",
      "email",
      "mobile",
      "state",
      "district",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }
    if (!formData.terms) {
      alert("Please accept the Terms and Conditions");
      return false;
    }
    if (!formData.aadharFile) {
      alert("Please upload your Aadhar card");
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    // Basic mobile validation
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return false;
    }
    // OTP must be verified
    if (!otpVerified) {
      alert("Please verify your email with OTP before submitting.");
      return false;
    }
    return true;
  };

  // Check if device is mobile
  const isMobileDevice = () => {
    return isMobile;
  };

  // Razorpay payment handler
  const handlePayment = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 135000 }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.message || "Failed to create order");

      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: "Canvi Premier Kabaddi League",
        description: "Registration Fee",
        order_id: order.order.id,
        handler: function (response) {
          // Call verify API
          fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setPaymentMade(true);
                alert("Payment successful!");
              } else {
                alert("Payment verification failed");
              }
              setIsLoading(false);
            })
            .catch(() => {
              alert("Payment verification failed");
              setIsLoading(false);
            });
        },
        prefill: {
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#29066d",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.message || "Payment failed");
      setIsLoading(false);
    }
  };

  // Handle direct payment (redirect to UPI app)
  // const handleDirectPayment = () => {
  //   if (!validateForm()) return;

  //   setIsLoading(true);
  //   hasRedirected.current = false;

  //   // Replace with your actual UPI ID
  //   const upiId = "8696143069@ybl";
  //   const businessName = "Canvi Premier Kabaddi League";
  //   const amount = "1350";

  //   // Simple UPI URL for direct payment
  //   const upiLinkData = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
  //     businessName
  //   )}&am=${amount}&cu=INR`;

  //   // Check if it's a mobile device
  //   if (isMobileDevice()) {
  //     // On mobile, redirect immediately
  //     hasRedirected.current = true;
  //     window.location.href = upiLinkData;

  //     // Set a timeout to show payment success after 3 seconds
  //     setTimeout(() => {
  //       if (!paymentMade && hasRedirected.current) {
  //         setPaymentMade(true);
  //         setIsLoading(false);
  //         hasRedirected.current = false;
  //       }
  //     }, 3000);
  //   }
  // };

  // Handle payment completion from QR code
  // const handleQRPaymentComplete = () => {
  //   setShowQRPopup(false);
  //   setPaymentMade(true);
  // };

  // Submit final registration after payment
  const handleSubmitRegistration = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Create FormData to send file
      const submitFormData = new FormData();
      submitFormData.append("firstName", formData.firstName);
      submitFormData.append("lastName", formData.lastName);
      submitFormData.append("fatherName", formData.fatherName);
      submitFormData.append("email", formData.email);
      submitFormData.append("mobile", formData.mobile);
      submitFormData.append("state", formData.state);
      submitFormData.append("district", formData.district);
      submitFormData.append("aadharFile", formData.aadharFile);
      submitFormData.append("terms", formData.terms);

      const response = await fetch("/api/registration", {
        method: "POST",
        body: submitFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      // Show success popup
      setShowSuccessPopup(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error.message || "Failed to submit registration. Please try again."
      );
      setIsLoading(false);
    }
  };

  // Close QR popup
  // const closeQRPopup = () => {
  //   setShowQRPopup(false);
  //   setQrCodeUrl("");
  //   setIsQRLoading(false);
  // };

  // Close success popup and reset everything
  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    // Reset everything to initial state
    resetForm();
  };

  // Reset form and all states to initial values
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      fatherName: "",
      email: "",
      mobile: "",
      state: "",
      district: "",
      aadharFile: null,
      terms: false,
    });
    setPaymentMade(false);
    setQrCodeUrl("");
    setUpiLink("");
    setIsLoading(false);
    setIsQRLoading(false);
    hasRedirected.current = false;

    // Reset file input
    const fileInput = document.getElementById("aadharFile");
    if (fileInput) {
      fileInput.value = "";
    }

    // Reset OTP states
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setOtpError("");
  };

  

  

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
      <section className="relative w-full bg-white">
        <div className="relative w-full h-[20vh] md:h-[60vh]">
          <div
            className="absolute inset-0 bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/allpb.png')",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Content with left positioning */}
          <div className="absolute inset-0 z-10 flex items-center transform -translate-y-4 md:-translate-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-8xl text-primary font-bold font-galantic absolute left-[12%] md:left-[19%]">
              Registration
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-4 pb-20">
        <div className="w-full mx-auto">
          {/* Heading Section */}
          <div className="text-center pt-8 md:pt-16 mb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-main text-black mb-3">
              Your Chance to Join the Big Stage.
            </h1>
            <p className="text-black text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-sub">
              The Canvi Premier Kabaddi League offers every athlete — from rural
              villages to city gyms — a chance to step up.
            </p>
          </div>

          {/* How to Register Section */}
          <div className="text-center mb-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-main text-black mb-4">
              How to Register:
            </h2>
            <div className="bg-gray-50 flex justify-center items-center rounded-lg">
              <ul className="text-left space-y-3 font-sub text-gray-700 text-sm md:text-base">
                <li className="flex justify-center items-center">
                  <span className="text-black font-bold mr-3 mt-1">•</span>
                  <span>Fill out the online form with personal details.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-black font-bold mr-3 mt-1">•</span>
                  <span>Upload fitness & kabaddi credentials.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-black font-bold mr-3 mt-1">•</span>
                  <span>Attend state-level trials.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-black font-bold mr-3 mt-1">•</span>
                  <span>Get shortlisted for franchise selections.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Registration Container - Full Width Background */}
          <div
            className="w-full min-h-[85vh] bg-cover bg-center flex items-center justify-center p-4 pt-5"
            style={{ backgroundImage: "url('/assets/coach.png')" }}
          >
            <div className="w-full max-w-[90vw] mx-auto py-8">
              {/* White Container with Button Inside */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Left Side - Registration Form */}
                    <div className="flex flex-col pt-6 pb-4">
                      <h2 className="text-xl md:text-2xl font-main text-[#29066d] mb-4 pb-2 border-b-2 border-gray-200">
                        Registration Form
                      </h2>

                      <form className="space-y-3">
                        {/* First Name & Last Name - Side by Side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 font-sub">
                              First Name *
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all text-xs font-sub"
                              placeholder="Enter first name"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 font-sub">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all text-xs font-sub"
                              placeholder="Enter last name"
                              required
                            />
                          </div>
                        </div>

                        {/* Father's Name - Full Width */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-sub">
                            Father's Name *
                          </label>
                          <input
                            type="text"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all text-xs font-sub"
                            placeholder="Enter father's name"
                            required
                          />
                        </div>

                        {/* Email & Mobile - Side by Side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 font-sub">
                              Email Address *
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all text-xs font-sub"
                                placeholder="Enter email address"
                                required
                                disabled={otpSent || otpVerified}
                              />
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={
                                  otpLoading ||
                                  !formData.email ||
                                  otpSent ||
                                  otpVerified
                                }
                                className="bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-sub disabled:bg-blue-300"
                              >
                                {otpLoading
                                  ? "Sending..."
                                  : otpVerified
                                  ? "Verified"
                                  : otpSent
                                  ? "Sent"
                                  : "Send OTP"}
                              </button>
                            </div>
                            {/* OTP input and verify */}
                            {otpSent && !otpVerified && (
                              <div className="mt-2 flex gap-2">
                                <input
                                  type="text"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                  className="w-32 px-2 py-1 border border-gray-300 rounded-lg text-xs font-sub"
                                  placeholder="Enter OTP"
                                />
                                <button
                                  type="button"
                                  onClick={handleVerifyOtp}
                                  disabled={otpLoading || !otp}
                                  className="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-sub disabled:bg-green-300"
                                >
                                  {otpLoading ? "Verifying..." : "Verify OTP"}
                                </button>
                              </div>
                            )}
                            {otpError && (
                              <div className="text-xs text-red-600 mt-1">
                                {otpError}
                              </div>
                            )}
                            {otpVerified && (
                              <div className="text-xs text-green-600 mt-1">
                                Email verified!
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block  text-sm font-medium text-gray-700 mb-1 font-sub">
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all text-xs font-sub"
                              placeholder="Enter mobile number"
                              required
                            />
                          </div>
                        </div>

                        {/* Select State */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-sub">
                            Select State *
                          </label>
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all text-xs font-sub"
                            required
                          >
                            <option value="">Choose your state</option>
                            <option value="Andhra Pradesh">
                              Andhra Pradesh
                            </option>
                            <option value="Arunachal Pradesh">
                              Arunachal Pradesh
                            </option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">
                              Himachal Pradesh
                            </option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">
                              Madhya Pradesh
                            </option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Maipur">Maipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                          </select>
                        </div>

                        {/* Select District */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-sub">
                            District *
                          </label>
                          <input
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all text-xs font-sub"
                            placeholder="Enter district"
                            required
                          />
                        </div>

                        {/* Aadhar Card Upload */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 font-sub">
                            Attach Aadhar Card *
                          </label>
                          <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-[#29066d] transition-colors cursor-pointer"
                            onClick={() =>
                              document.getElementById("aadharFile")?.click()
                            }
                          >
                            <div className="flex flex-col items-center justify-center">
                              <svg
                                className="w-6 h-6 text-gray-400 mb-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                              <p className="text-xs text-gray-600 font-sub">
                                <span className="font-semibold text-[#29066d]">
                                  Click to upload
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 font-sub">
                                {formData.aadharFile
                                  ? formData.aadharFile.name
                                  : "Aadhar Card (MAX. 5MB)"}
                              </p>
                            </div>
                            <input
                              type="file"
                              id="aadharFile"
                              name="aadharFile"
                              onChange={handleInputChange}
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                              required
                            />
                          </div>
                          <p className='text-xs md:text-sm mt-3 text-gray-700 italic'>"आधार कार्ड की फोटो दोनों साइड की एक फोटो बनाकर अपलोड करे और पेमेंट प्रोसेस पूरा करे अगर आप अपना पेमेंट नहीं करते है अथवा आपके फॉर्म किसी प्रकार की कमी पाई गई तो आपका पंजीकरण स्वीकार नहीं किया जाएगा धन्यवाद।"</p>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start space-x-2">
                          <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleInputChange}
                            className="mt-0.5 w-3 h-3 text-[#29066d] border-gray-300 rounded focus:ring-[#29066d]"
                            required
                          />
                          <label
                            htmlFor="terms"
                            className="text-xs text-gray-700 font-sub"
                          >
                            I agree to the{" "}
                            <span className="text-[#29066d] font-semibold cursor-pointer hover:underline">
                              Terms and Conditions
                            </span>
                          </label>
                        </div>
                      </form>
                    </div>

                    {/* Right Side - Full Height Image */}
                    <div className="hidden lg:flex flex-col pt-6 pb-4">
                      <div
                        className="flex-1 bg-cover bg-center rounded-xl shadow-lg"
                        style={{ backgroundImage: "url('/assets/reg.png')" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Payment Section - Inside White Div at Bottom Center */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="text-center space-y-4">
                    {/* Payment Amount Display */}
                    <div className="mb-4">
                      <p className="text-lg font-semibold text-gray-800 font-sub">
                        Registration Fee:{" "}
                        <span className="text-[#29066d]">₹1350</span>
                      </p>
                    </div>

                    {/* Payment Section - Only Razorpay */}
                    {!paymentMade ? (
                      <div className="flex justify-center">
                        <button
                          onClick={handlePayment}
                          disabled={isLoading}
                          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 duration-300 text-sm md:text-base shadow-lg transform hover:scale-105 flex items-center gap-2 font-sub disabled:bg-green-400 disabled:cursor-not-allowed"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Redirecting to Payment...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4" />
                              Make Payment
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold font-sub">
                            Payment Successful!
                          </span>
                        </div>
                        <div className="flex justify-center">
                          <button
                            onClick={handleSubmitRegistration}
                            disabled={isLoading}
                            className="bg-[#29066d] text-white py-3 px-8 rounded-lg hover:bg-[#180444] duration-300 text-sm md:text-base shadow-lg transform hover:scale-105 font-sub disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              "Submit Registration"
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Popup Modal */}
     

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={closeSuccessPopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success Content */}
            <div className="text-center space-y-6">
              <div className="inline-block p-3 bg-green-50 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 font-main">
                Registration Successful!
              </h3>

              <div className="space-y-3">
                <p className="text-gray-600 font-sub">
                  Thank you for registering for the Canvi Premier Kabaddi
                  League.
                </p>
                <p className="text-sm text-gray-500 font-sub leading-relaxed">
                  You'll receive a confirmation email about your successful
                  registration after verification of your details. Our team will
                  review your application and contact you shortly.
                </p>
                <p className="text-sm text-gray-500 font-sub">
                  Keep an eye on your email for further updates about trials and
                  selection process.
                </p>
              </div>

              <button
                onClick={closeSuccessPopup}
                className="w-full bg-[#29066d] text-white py-3 rounded-lg font-medium hover:bg-[#180444] transition-colors font-sub"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationPage;
