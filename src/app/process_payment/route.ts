import { NextRequest } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import mercadopago from "mercadopago"



export async function POST(request: NextRequest) {
  try {
    const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
    if (!process.env.ACCESSTOKEN_MERCADOPAGO) {
      throw new Error("Access Token missing")
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.ACCESSTOKEN_MERCADOPAGO, options: { timeout: 5000, } });

    const payment = new Payment(client);

    const formData = await request.json()
    console.log(formData)

    // PSE payment
    if (formData.payment_method_id === 'pse') {
      const response = await payment.create({
        body: {
          transaction_amount: formData.transaction_amount,
          description: '<DESCRIPTION>',
          payment_method_id: formData.payment_method_id,
          payer: {
            email: formData.payer.email,
            entity_type: formData.payer.entity_type,
            identification: { type: formData.payer.identification.type, number: formData.payer.identification.number }
          },
          transaction_details: { financial_institution: formData.transaction_details.financial_institution },
          additional_info: {
            ip_address: ip
          },
          callback_url: 'https://google.com'
        },
        requestOptions: {
          idempotencyKey: 'edf'
        }
      })

      return new Response(JSON.stringify({ response }), { status: 200 })
    }

    // Card payment
    const response = await payment.create({
      body: {
        token: formData.token,
        transaction_amount: formData.transaction_amount,
        description: '<DESCRIPTION>',
        payment_method_id: formData.payment_method_id,
        payer: {
          email: formData.payer.email
        },
        installments: formData.installments
      }
    })
    // .then(console.log).catch(console.log);

    console.log(response)

    return new Response(JSON.stringify({response}), { status: 200 })
  } catch (error) {
    console.error('Error creating payment:', error)
    return new Response(JSON.stringify({ error: 'Error creating payment' }), { status: 500 })
  }
}