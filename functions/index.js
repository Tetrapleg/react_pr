const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;
const { email, password } = require('./config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password,
  }
});

transporter. use('compile', htmlToText());

const sendOrderEmail = data => {

  const options = {
    from: `MRDonald's <${email}>`,
    to: data.email,
    subject: `Ваш заказ из MRDonald's`,
    html:`
      <div>
        <h2>Здравствуйте ${data.nameClient}</h2>
        <h3>Заказ:</h3>
        <ul>
          ${data.order.map(({ itemName, count, price, choice, topping }) => (
            `<li>${itemName} - ${count}шт., цена ${(topping !== 'no toppings' ? 
                price * (1 + 0.1 * topping.length) * count :
                price * count).toFixed(2)} руб.
                <br>
                <small>
                  ${choice !== 'no choices' ? choice.toLowerCase() : ''} 
                  ${topping !== 'no toppings' ? topping.join(',').toLowerCase() : ''}
                </small>
            </li>`
          ))}
        </ul>
        <p>Итого: ${data.order.reduce((sum, item) =>
          sum + (item.topping !== 'no toppings' ? 
            item.price * (1 + 0.1 * item.topping.length) * item.count :
            item.price * item.count), 0).toFixed(2)} руб.</p>
        <small>Ожидайте курьера.</small>
      </div>
    `,
  };

  transporter.sendMail(options);
};

exports.sendUserEmail = functions.database.ref('orders/{pushID}')
      .onCreate(order => sendOrderEmail(order.val()));
