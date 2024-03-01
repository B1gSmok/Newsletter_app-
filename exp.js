const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the signup form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

// Handle form submission
app.post('/', (req, res) => {
    const firstName = req.body.Fname;
    const email = req.body.Email;
    const password = req.body.password;

    // Mailchimp API data
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: password
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    // Mailchimp API endpoint
    const apiKey = 'YOUR_MAILCHIMP_API_KEY';
    const listId = 'YOUR_AUDIENCE_LIST_ID';
    const url = `https://us14.api.mailchimp.com/3.0/lists/${listId}`;

    const options = {
        method: 'POST',
        auth: `anystring:${apiKey}`
    };

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.send('Successfully subscribed to the newsletter!');
        } else {
            res.send('Error subscribing. Please try again later.');
        }
    });

    request.write(jsonData);
    request.end();
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
