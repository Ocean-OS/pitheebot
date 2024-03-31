# pitheebot
A simple script that lets you run a [Pithee](https://pithee.com) bot. 
## How to use
### Importing
First, import the module. You can do this by downloading `pitheebot.js` to your program's directory and using the following script: 
```js
import pitheebot from  './pitheebot.js';
```
### Dependencies
Pitheebot requires node-fetch to run. You can install it with npm by running: 
```shell
npm i node-fetch
```
### Using pitheebot
To initiate your bot, you will need to login. Here's how: 
<ol>
<li>Login to the Pithee account you want the bot to use, in your browser. This is only confirmed to work if your account is Discord-based. (Twitch login has not been tested yet)</li>
<li>Open Devtools and go to the Network tab.</li>
<li>Send a message in Pithee. You will see two POST requests pop up, both named "insert_post". Click the second request.</li>
<li>In the Headers section of the request, you will scroll down until you see a parameter titled Apikey. Copy its contents.</li>
<li>Scrolling down a bit further, you will find a parameter titled Authorization. Copy its contents.</li>
<li>In your program, you will enter the script <code>pitheebot.login("your Apikey here","your Authorization here");</code></li>
<li>When you run this code, it will create a file called <code>auth.json</code> with your authorization and token.</li>
</ol>

> Remember, if you ever log into Pithee with that account again, the authorization will expire, and you will need to update both parameters in your code.

To send a message, you can use the following syntax: 
```js
pitheebot.send(message,attempts,returnStatus);
```
***message*** (string) - The message you want to send.   
***attempts*** (int) - If the message failed to send, it will try again for that many times until it succeeds.   
***returnStatus*** (boolean) - If it is `true`, it will return a boolean for if the message successfully sent. 

## Notes
**DISCLAIMER**: I am not responsible for anything done with this module that is against Pithee's rules. 
<br>
*I am unsure of how permanent Pithee's source code and API is. The bot code may break at some point in the future.*
<br>
What I know about the API
<ul>
<li>Your token and authorization expires as soon as a new session on the account is made</li>
<li>The API uses <a href="https://supabase.com/">Supabase</a>.</li>
<li>If you attempt to use the API with an invalid or expired authorization/token, it returns a 401 HTTP code and some JSON saying the code expired or is invalid.</li>
<li>If you attempt to use the API with valid authorizations and keys, it returns an empty page and a 204 HTTP code.</li>
<li>The authorization appears to be three parts, split by periods. The first two parts are Base64 encoded JSON. The second part is account information, such as the user email, username, profile picture. The first part in the authorization key matches the first part in the API key, which has a similar format. The second part in the API key lists some information about when the token was made.</li>
<li>The API sets the character limit on messages, so you cannot go over the character limit using the API.</li>
</ul>
What I don't know about the API
<ul>
<li>What sort of rate limiting is set</li>
<li>If your authorization/key expires when you logout</li>
<li>If the authorization/keys expires after a certain amount of time</li>
</ul>
