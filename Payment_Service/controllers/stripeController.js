import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createStripeSession = async (req, res) => {
//   const { orderId, amount } = req.body;
//   const { email } = req.user;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'Food Order',
//           },
//           unit_amount: amount * 100, // in cents
//         },
//         quantity: 1
//       }],
//       mode: 'payment',
//       customer_email: email,
//       success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
//       metadata: {
//         order_id: orderId
//       }
//     });

//     res.status(200).json({ url: session.url });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };


export const createStripeSession = async (req, res) => {
  const { orderId, amount } = req.body;
  const email = req.user?.email || "testuser@example.com"; // Safe fallback

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Food Order',
          },
          unit_amount: amount * 100,
        },
        quantity: 1
      }],
      mode: 'payment',
      customer_email: email,
       success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
       cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      // success_url: `https://httpstat.us/200?s=Payment+Success`,
      // cancel_url: `https://httpstat.us/400?s=Payment+Cancelled`,

      metadata: {
        order_id: orderId
      }
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



export const handleStripeWebhook = async (req, res) => {
    let event;
    const endpointSecret = ''; // Optional: add endpoint secret if verifying
  
    try {
      event = JSON.parse(req.body);
    } catch (err) {
      console.error('Webhook error:', err.message);
      return res.sendStatus(400);
    }
  
    // Handle event types
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('✅ Payment successful for order:', session.metadata.order_id);
  
      // OPTIONAL: notify Notification Service here
      // await sendNotification(...)
  
      // TODO: update Order Service that payment succeeded
    }
  
    res.status(200).send('Webhook received');
  };
  