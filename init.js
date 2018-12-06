var fs = require('fs');
let mongoose = require('mongoose');
let Execution = require('./executionMutantModel');
const exec = require('child_process').exec;
const USER_MONGO_DB = process.env.MONGODB_USER;
const PASSWORD_MONGO_DB = process.env.MONGODB_PASSWORD;

var walk = function(dir, done) {
  var results = [];
  var folders = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, folders);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          folders.push(file);
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://'+USER_MONGO_DB+':'+PASSWORD_MONGO_DB+'@ds161146.mlab.com:61146/parcialfinal');
var db = mongoose.connection;

walk("/home/SIS/jwsanabriad/Desktop/miso4208-parcialFinal/parcial2", function(err, results) {
    if (err) throw err;
    results.forEach(folder => {
        exec("cd " +  folder 
        + " && " + "apktool d com.evancharlton.mileage_3110.apk"
        + " && " + "cd " +  folder +"/com.evancharlton.mileage_3110" 
        + " && " + "sed '3i<uses-permission android:name=\"android.permission.INTERNET\"/>' AndroidManifest.xml > temporal.xml"
        + " && " + "rm AndroidManifest.xml"
        + " && " + "mv temporal.xml AndroidManifest.xml"
        + " && " + "cd " +  folder
        + " && " + "apktool b com.evancharlton.mileage_3110"
        + " && " + "cd " +  folder+"/com.evancharlton.mileage_3110/dist"
        + " && " + "mv com.evancharlton.mileage_3110.apk ../../app.apk"
        + " && " + "rm -rf " +  folder+"/com.evancharlton.mileage_3110"
        + " && " + "cd /home/SIS/jwsanabriad/Desktop/miso4208-parcialFinal/docker/docker-android-bdt"
        + " && " + "sudo cp " + folder + "/app.apk /home/SIS/jwsanabriad/Desktop/miso4208-parcialFinal/docker/docker-android-bdt/app.apk"
        + " && " + "sudo rm -rf /home/SIS/jwsanabriad/Desktop/miso4208-parcialFinal/docker/docker-android-bdt/features"
        + " && " + "sudo rm -rf /home/SIS/jwsanabriad/Desktop/miso4208-parcialFinal/docker/docker-android-bdt/reports"
        + " && " + "sudo cp /home/SIS/jwsanabriad/Desktop/miso4208-parcialFinal/features /home/SIS/jwsanabriad/Desktop/miso4208-parcialFinal/docker/docker-android-bdt/features -r"
        + " && " + "sudo docker-compose build"
        + " && " + "sudo docker-compose run alpine"
        + " && " + "sudo cp /home/SIS/jwsanabriad/Desktop/miso4208-parcialFinal/docker/docker-android-bdt/reports " + folder + "/reports -r"
        + " && " + "sudo rm -rf /home/SIS/jwsanabriad/Desktop/miso4208-parcialFinal/docker/docker-android-bdt/reports"
      );
        
        const execution = new Execution({name: folder, state: 'R'});
        execution.save().then(()=>console.log(folder));
    });
    
  });