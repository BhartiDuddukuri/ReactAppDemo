const express = require("express");
const PORT = process.env.PORT || 3001;
const app=express();
const https = require("https");

app.get("/api/ipinfo",  (req,res) => {
    let ipInfoAPIUrl = `https://ipinfo.io/${req.query.ip}/geo`;
    https.get(ipInfoAPIUrl, (resp) => {

        let data = ''
        resp.on("data", (chunk) => {
            data += chunk;
        });
        resp.on("end", () => {
            let response = JSON.parse(data);
            if(response.status && response.status == 404)
                res.json({ success:false, data : null, message:JSON.parse(data)});
            else            
                res.json({ success:true, data : JSON.parse(data), message:""});
        });
    }).on("error", (err) => {
        res.json({ success:false, data : null, message : "Error occurred: " + err.message});
    });
});

app.get("/api/rates",  (req,res) => {
    let ratesAPIUrl = `https://api.coingecko.com/api/v3/exchange_rates`;
    https.get(ratesAPIUrl, (resp) => {

        let data = ''
        resp.on("data", (chunk) => {
            data += chunk;
        });
        resp.on("end", () => {
            let response = JSON.parse(data);
            if(response.error)
                res.json({ success:false, data : null, message:JSON.parse(data)});
            else            
                res.json({ success:true, data : JSON.parse(data), message:""});
        });
    }).on("error", (err) => {
        res.json({ success:false, data : null, message : "Error occurred: " + err.message});
    });
});

app.get("/api/population",  (req,res) => {
    let populationAPIUrl = `https://datausa.io/api/data?drilldowns=${req.query.filterParam}&measures=Population`;
    https.get(populationAPIUrl, (resp) => {

        let data = ''
        resp.on("data", (chunk) => {
            data += chunk;
        });
        resp.on("end", () => {
            let response = JSON.parse(data);
            if(response.error)
                res.json({ success:false, data : null, message:JSON.parse(data)});
            else            
                res.json({ success:true, data : JSON.parse(data), message:""});
        });
    }).on("error", (err) => {
        res.json({ success:false, data : null, message : "Error occurred: " + err.message});
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});