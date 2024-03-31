import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const login =  function(auth, key){
    fs.writeFileSync(path.join(__dirname, "auth.json"),JSON.stringify({
        authorization: auth,
        apikey: key
    }));
    console.log("Login data saved.");
}
const send = function(message, attempts=0, re=false, prev=false){
    if(fs.existsSync(path.join(__dirname, "auth.json"))){
    var auth = JSON.parse(fs.readFileSync(path.join(__dirname, "auth.json"),"utf8"));
    let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Apikey': auth.apikey,
          'Authorization': auth.authorization
        },
        body: `{"post_text":"${message}"}`
    };
    let url = "https://oqutjaxxxzzbjtyrfoka.supabase.co/rest/v1/rpc/insert_post";
    fetch(url, options)
        .then(res => {
            var status = res.status;
            if(status == 204){
                console.log("Message successfully sent!");
                if(re == true){
                    return true;
                };
            }else{
                console.log("Attempt to send the message was unsuccessful.");
                if(attempts > 0){
                    console.log("Trying to send the message again...");
                    if(attempts-1 == 0){
                        send(message,attempts-1,re,true);
                    }else{
                        send(message,attempts-1,re);
                    }
                }else{
                    if(prev == true){
                        console.log("All attempts to send the message failed. Check your authorization information, and make sure your message follows the character limit.")
                    }
                    if(re == true){
                        return false;
                    }
                }
            }
        })
        .catch(err => console.error('error:' + err));
    }else{
        throw new Error("No authorization key found, please login with your authorization information before sending a message");
    }
}
export default {login, send};