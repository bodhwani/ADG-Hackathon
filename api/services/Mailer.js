

module.exports.sendWelcomeMail = function(obj) {

  console.log("Successfully reached");

  console.log(obj.email);

  sails.hooks.email.send(
    "welcomeEmail",
    {
      long: obj.longitude,
      lat : obj.latitude
    },
    {
      to: obj.email,
      subject: "Hi there"
    },

    function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("It worked!");
        console.log(obj.email);
      }
    }
  )
};

