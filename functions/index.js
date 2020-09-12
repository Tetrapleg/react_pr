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
console.log(email, password);

transporter. use('compile', htmlToText());

const sendOrderEmail = data => {
  console.log(data);
  console.log(data.order[0].topping);
  const options = {
    from: `MRDonald's <${email}>`,
    to: 'rufmama@yandex.ru',
    subject: `Ваш заказ из MRDonald's`,
    html:`
      <div>
        <h2>Здравствуйте ${data.nameClient}</h2>
        <h3>Заказ:</h3>
        <ul>
          ${data.order.map(({ itemName, count, price, choice, topping }) => (
            `<li>${itemName} - ${count}шт., цена ${topping !== 'no toppings' ? 
                (price + price * 0.1 * topping.lenght) * count : price * count} руб.
                <small>
                  ${choice !== 'no choices' ? choice : null} 
                  ${topping !== 'no toppings' ? topping.join(',') : null}
                </small>
            </li>`
          ))}
        </ul>
        <p>Итого: ${data.order.reduce((sum, item) =>
          sum + (item.price * item.count), 0)} руб.</p>
        <small>Ожидайте курьера.</small>
      </div>
    `,
  };

  transporter.sendMail(options);
};

exports.sendUserEmail = functions.database.ref('orders/{pushID}')
      .onCreate(order => sendOrderEmail(order.val()));
