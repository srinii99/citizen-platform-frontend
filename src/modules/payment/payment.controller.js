import crypto from "crypto";

import { razorpay }
from "../../config/razorpay.js";

import { Payment }
from "./payment.model.js";

import { Application }
from "../application/application.model.js";


// Create Razorpay Order
export const createPaymentOrder =
  async (req, res, next) => {

    try {

      const {
        application_id,
        amount,
      } = req.body;

      // Validation
      if (!application_id) {

        throw new Error(
          "application_id is required"
        );
      }

      if (!amount) {

        throw new Error(
          "amount is required"
        );
      }

      // Save payment entry
      const payment =
        await Payment.create({

          user_id:
            req.user.user_id,

          application_id,

          amount,

          type:
            "SERVICE_FEE",

          status:
            "PENDING",
        });

      // Create Razorpay order
      const order =
        await razorpay.orders.create({

          amount:
            amount * 100,

          currency:
            "INR",

          receipt:
            payment._id.toString(),
        });

      return res.status(200).json({

        success: true,

        order,

        payment,
      });

    } catch (err) {

      next(err);
    }
  };


// Verify Razorpay Payment
export const verifyPayment =
  async (req, res, next) => {

    try {

      const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,

        payment_id,

      } = req.body;

      // Generate signature
      const generatedSignature =
        crypto

          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )

          .update(
            razorpay_order_id +
            "|" +
            razorpay_payment_id
          )

          .digest("hex");

      // Invalid signature
      if (
        generatedSignature !==
        razorpay_signature
      ) {

        throw new Error(
          "Invalid payment signature"
        );
      }

      // Update payment
      const payment =
        await Payment.findByIdAndUpdate(

          payment_id,

          {

            status:
              "SUCCESS",

            razorpay_order_id,

            razorpay_payment_id,
          },

          { new: true }
        );

      // Update application
      await Application.findByIdAndUpdate(
        payment.application_id,
        {
          payment_status:
            "PAID",
        }
      );

      return res.status(200).json({

        success: true,

        message:
          "Payment verified successfully",

        payment,
      });

    } catch (err) {

      next(err);
    }
  };