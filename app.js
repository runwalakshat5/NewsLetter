//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+ "/signup.html");
});
app.post("/",function(req,res){
  var firstName=req.body.fname;
    var lastName=req.body.lname;
      var email=req.body.email;
      var data={
        members:[
          {email_address: email,
           status:"subscribed",
           merge_fields:
           {
             FNAME:firstName,
             LNAME:lastName
           }
          }
        ]
      };
      var jsonData=JSON.stringify(data);
      var options={
        url:"https://us19.api.mailchimp.com/3.0/lists/183eeb9816",
        method:"POST",
        headers:{
          "Authorization":"akshat1 6e64ed05ff4ecad736948741a34b9100-us19"
        },
        body : jsonData
      };

      request(options, function(error,response,body){
        if(error)
        {
          res.sendFile(__dirname+ "/failure.html");
        }
        else{
        if(response.statusCode=== 200)
        {
            res.sendFile(__dirname+ "/success.html");
        }
        else{
          res.sendFile(__dirname+ "/failure.html");
        }
        }

      });
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

//API KEY
//6e64ed05ff4ecad736948741a34b9100-us19

//List ID-183eeb9816
