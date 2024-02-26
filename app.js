const parser = require("body-parser")
const exp = require("express")
const app = exp()
app.use(exp.static("public"))
app.use(parser.urlencoded({ extended: true }))
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})
const port = 3000
app.listen(port, function() {
    console.log("server strated ")
})

app.post("/", function(req, res) {
    var fnam = req.body.fname
    var lnam = req.body.lname
    var email = req.body.eml
    console.log(fnam, lnam, email)
    res.redirect("/success")
})


app.get("/success", function(req, res) {
    res.sendFile(__dirname + "/success.html")
})

// api 
// f8cc5a519d8b215346c19e8e227a3968-us21


//user id
//77fc775adb.

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "f8cc5a519d8b215346c19e8e227a3968-us21",
    server: "us21",
});

async function run() {
    const response = await mailchimp.ping.get();
    console.log(response);
}

run();