var expressKuch = require("express");
var app = expressKuch();
var path = require("path");
var fileuploader = require("express-fileupload");
var mysql = require("mysql");
app.use(expressKuch.static("public"));
app.use(expressKuch.urlencoded('extended:true'));
app.use(fileuploader());
//var FileReader=require("file-reader");
app.listen("1999", function () {
    console.log("Your server is started");
})
app.get("/", function (req, resp) {
    // var puraPath = process.cwd()+"/index.html";
    var puraPath = path.join(__dirname, "public", "index.html");
    resp.sendFile(puraPath);
})
var connect = {
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
}
app.use(expressKuch.urlencoded({ extended: true }));
var con = mysql.createConnection(connect);
con.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Database Connected Successfully");
    }
})

app.get("/savethedata", function (req, resp) {
    var arr = [req.query.signupemail, req.query.signuppassword, req.query.type];
    //YAHA PR BHI UPAR WALI LINE MEIN SBHI NAME HAI COLUMNS KE ...
    con.query("insert into users values(?,?,?)", arr, function (err) {
        if (err) {
            resp.send(err.toString());
            // TOSTRING USE HOTI HAI TAAN KI AGAR KOI ERROR AA RHA HO TOH USKO SIMPLE AONE WALI LANGUAGE MEIN SHOW HO SKE....
            // console.log(err);
        }
        else {
            resp.send("Record Saved Successfully");
        }
    })
})
app.get("/jsonlogin", function (req, resp) {
    var xyz = [req.query.loginemail, req.query.loginpassword];
    con.query("select * from users where email=? and password=?", xyz, function (err, result) {
        if (err) {
            resp.send(err.toString());
        }
        else {

            // resp.send("Logged In Successfully...");
            resp.send(result);    //WO JOH JSON NIKALTA HAI USME ARRAY MEIN ELEMENT 1 HI HOTA HAI JISKA INDEX 0 HOTA HAI TOH HUMNE WO LIKH KE USKE SAATH DOT LGAKE TYPE LIKHDIA...
        }
    });
})
/*
app.get("/saveprofiledata",function(req,resp){
    console.log("yoyoyoyoyoyo");
    var email = req.query.email;
    var name=req.query.name;
    var contact =req.query.contact;
    var address=req.query.address;
    var city=req.query.city;
    var company = req.query.company;
    var site=req.query.site;
    var idproof=null;
    var profile=null;
    var textarea=req.query.textarea;
    var arr = [email,name,contact,address,city,company,site,idproof,profile,textarea];
    console.log(arr);
    con.query("insert into profile-pitcher values(?,?,?,?,?,?,?,?,?,?)",arr,function(err,result){
        if(err){
            resp.send(err.toString());
        }
        else{
            resp.send("Data Saved Successfully");
        }
    })
})*/
/*app.get("/jsoncheckpass",function(req,resp){
    console.log("hi");
    var p=[req.query.cpass];
    con.query("select * from users where password=?",p,function(err,result){
        if(err){
            resp.send(err.toString());
        }
        else{
            resp.send(result);
        }
    });
})*/
app.get("/jsoncheckpass", function (req, resp) {
    var xyz = [req.query.cpass];
    con.query("select * from users where password=?", xyz, function (err) {
        if (err) {
            resp.send(err.toString());
        }
        else {

            resp.send("saved");
        }
    });
})
app.get("/jsonupdatepass", function (req, resp) {
    var xyz = [req.query.npass, req.query.cpass];
    con.query("update users set password=? where password=?", xyz, function (err, result) {
        if (err) {
            resp.send(err.toString());
        }
        else {
            resp.send("Password Changed");
        }
    });
})
app.get("/investorsave", function (req, resp) {
    // console.log("ehbuebfuwebfuw");
    var email = req.query.email;
    var name = req.query.name;
    var city = req.query.city;
    var category = req.query.category;
    var address = req.query.address;
    var contact = req.query.contact;
    var bussiness = req.query.bussiness;
    var turnover = req.query.turnover;
    var investment = req.query.investment;

    var arr = [email, name, city, category, address, contact, bussiness, turnover, investment];
    //ETHE JEHDE AOPN UPAR EMAIL NAME CITY VGERA DEFINE KITE HAI OHO USE HUNDE HAI....
    con.query("insert into profile_investor values(?,?,?,?,?,?,?,?,?)", arr, function (err) {
        if (err) {
            console.log(err);
            resp.send(err.toString());

        }
        else {
            resp.send("Saved Successfully");
        }
    })
})

app.get("/searchinvestor",function(req,resp){
    var email = req.query.email;
    // var name = req.query.name;
    
    // var arr = [email];
    con.query("select * from profile_investor where email=?",email,function(err,result){
        if(err){
            console.log(err);
            resp.send(err.toString());
        }
        else{
            console.log(result);
            resp.send(result);
        }
    })
})

app.get("/pitcherideasave", function (req, resp) {
    var email = req.query.email;
    var category = req.query.category;
    var idea = req.query.ideatitle;
    var how = req.query.howitworks;
    var invest = req.query.investment;
    var income = req.query.income;
    var started = req.query.started;
    var fund = req.query.fund;
    var share = req.query.shareholders;
    var info = req.query.info;

    var arr = [email, category, idea, how, invest, income, started, fund, share, info];
    con.query("insert into ideas values(?,?,?,?,?,?,?,?,?,?)", arr, function (err) {
        if (err) {
            resp.send(err.toString());
        }
        else {
            resp.send("Data Saved Successfully");
        }
    })
})
app.get("/srchpitcher", function (req, resp) {
    var xyz = [req.query.email];
    con.query("select * from profile_pitcher where emailid=?", xyz, function (err, result) {
        if (err)
            console.log(err);
        else {
            console.log(result);
            resp.send(result);
        }
    })
})
app.post("/pitcher-save", function (req, resp) {
    var email = req.body.email;
    var name = req.body.name;
    var contact = req.body.contact;
    var address = req.body.address;
    var city = req.body.city;
    var company = req.body.company;
    var site = req.body.site;
    var textarea = req.body.textarea;
    var f2 = req.body.name + "-" + req.files.profile.name;
    var f1 = req.body.name + "-" + req.files.idproof.name;
    var des1 = process.cwd() + "/public/uploads/" + f1;
    var des2 = process.cwd() + "/public/uploads/" + f2;
    req.files.idproof.mv(des1, function (err) {
        if (err)
            console.log(err);
        else
            console.log("SAVED IDPROOF");
    })
    req.files.profile.mv(des2, function (err) {
        if (err)
            console.log(err);
        else
            console.log("saved proof");
    })
    var arr = [email, name, contact, address, city, company, site, f1, f2, textarea];
    console.log(arr);
    con.query("INSERT into profile_pitcher values(?,?,?,?,?,?,?,?,?,?)", arr, function (err) {
        if (err) {
            resp.send(err.toString());
        }
        else {
            resp.send("Data Saved Successfully");
        }
    })
})
app.post("/pitcher-update", function (req,resp) {
    console.log("yoyo");
    var email = req.body.email;
    var name = req.body.name;
    var contact = req.body.contact;
    var address = req.body.address;
    var city = req.body.city;
    var company = req.body.company;
    var site = req.body.site;
    var textarea = req.body.textarea;
    var f1, f2;
    if (req.files == null) {
        f1 = req.body.idhidden;
        f2 = req.body.profilehidden;
    }
    else {
        if (req.files.idproof != null && req.files.profile != null) {
            f2 = req.body.name + "-" + req.files.profile.name;
            f1 = req.body.name + "-" + req.files.idproof.name;
            var des1 = process.cwd() + "/public/uploads/" + f1;
            var des2 = process.cwd() + "/public/uploads/" + f2;
            req.files.idproof.mv(des1, function (err) {
                if (err)
                    console.log(err);
                else
                    console.log("SAVED IDPROOF");
            })
            req.files.profile.mv(des2, function (err) {
                if (err)
                    console.log(err);
                else
                    console.log("saved profile");
            })
        }
        if (req.files.idproof != null && req.files.profile == null) {
            f2 = req.body.profilehidden;
            f1 = req.body.name + "-" + req.files.idproof.name;
            var des1 = process.cwd() + "/public/uploads/" + f1;
            req.files.idproof.mv(des1, function (err) {
                if (err)
                    console.log(err);
                else
                    console.log("SAVED IDPROOF");
            })
        }
        if (req.files.idproof == null && req.files.profile != null) {
            f1 = req.body.idhidden;
             f2 = req.body.name + "-" + req.files.profile.name;
            var des2 = process.cwd() + "/public/uploads/" + f2;
            req.files.profile.mv(des2, function (err) {
                if (err)
                    console.log(err);
                else
                    console.log("SAVED profile");
            })
        }
    }

    var arr = [name, contact, address, city, company, site, f1, f2, textarea,email];
    con.query("update profile_pitcher set name=?,contact=?,address=?,city=?,company=?,site=?,idpic=?,profilepic=?,info=? where emailid=?",arr,function(err){

        if(err)
            console.log(err);
        else
            resp.send("updated successfully");
    })
})
app.get("/getcat",function(req,resp){
    con.query("select category from ideas",function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
            resp.send(result);
    })
})
app.get("/gettitle",function(req,resp){
    con.query("select title from ideas ",req.query.category,function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
            resp.send(result);
    })
})