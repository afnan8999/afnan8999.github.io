var typed = new Typed('#benner-prefix1', {
      strings: ['Your Favorite Place for Free<br>Bootstrap Themes'],
      typeSpeed: 50,
      loop: true,
      backSpeed: 40,
    });

AOS.init();

function sendEmail() {
  let fullnameElement = document.getElementById('my-name');
  let emailaddressElement = document.getElementById('my-email-address');
  let PhonenumberElement = document.getElementById('my-number');
  let MessageElement = document.getElementById('my-massage');

  emailjs.init({
    publicKey: "m8s6M5rKCqdAePA46",
  });

  var templateParams = {
    title: fullnameElement.value + ' Contact you',
    name: fullnameElement.value,
    message: MessageElement.value,
    email: emailaddressElement.value,
    tel: PhonenumberElement.value,
};

emailjs.send('service_5ifhibc', 'template_994gnbm', templateParams).then(
  (response) => {
    console.log('SUCCESS!', response.status, response.text);
  },
  (error) => {
    console.log('FAILED...', error);
  },
);
  /*Email.send({
              Host: "smtp.gmail.com",
              Username: "afnan51.waedorloh@gmail.com",
              Password: "kmmfcztcijwhjvem",
              To: 'aungkoon_pw37@hotmail.com',
              From: "afnan51.waedorloh@gmail.com",
              Subject: fullnameElement.value + "Let's Get In Touch!",
              Body: fullnameElement.value + emailaddressElement.value + PhonenumberElement.value + MessageElement.value,
          })
  .then(function (message) {
      alert("mail sent successfully")
  })
  .catch(function(error) {
    console.log('error = '+error);
  });*/
  
}