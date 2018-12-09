var fs = require('fs');
let mongoose = require('mongoose');
let Execution = require('./executionMutantModel');
const exec = require('child_process').exec;
const execsync = require('sync-exec');
const USER_MONGO_DB = process.env.MONGODB_USER;
const PASSWORD_MONGO_DB = process.env.MONGODB_PASSWORD;

var walk = function(dir, done) {
  var results = [];
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


let folders = [];
let cantidadInicial = 0;
let folderOld = "";
const workdir = "/home/miso4208/Desktop/parcialFinal/";

// Connect to Mongoose and set connection variable
//mongoose.connect('mongodb://'+USER_MONGO_DB+':'+PASSWORD_MONGO_DB+'@ds161146.mlab.com:61146/parcialfinal');
//mongoose.connect('mongodb://localhost:27017/parcialfinal');
//var db = mongoose.connection;

walk(workdir+"parcial2", function(err, results) {
    if (err) throw err;
    
      
    cantidadInicial = folders.length;    
    executionCommand(()=>{
      console.log("Termino todo el proceso");
    });
    
  });




  function executionCommand(doneCallBack){
    if(folders.length <= 0) {
      doneCallBack();
      return;
    }

    let folder = folders.shift();
    console.log("Inicia proceso con el folder (" +  folders.length + "/"+ cantidadInicial + "): " + folder);
    let execCallback = (error, stdout, stderr) => {
      if (error) console.log("Hubo un error ejecutando el comando: " + error);
      if (stdout) {
            console.log("Termina la ejecución.");
            //const execution = new Execution({name: folder, state: 'R'});
            //execution.save().then(()=>console.log(folder));
            folderOld = folder;
            executionCommand(doneCallBack);
      }
    };

    let comando = "cd " +  folder 
    + " && " + "apktool d com.evancharlton.mileage_3110.apk -p ."
    + " && " + "cd " +  folder +"/com.evancharlton.mileage_3110" 
    + " && " + "sed '3i<uses-permission android:name=\"android.permission.INTERNET\"/>' AndroidManifest.xml > temporal.xml"
    + " && " + "rm AndroidManifest.xml"
    + " && " + "mv temporal.xml AndroidManifest.xml"
    + " && " + "cd " +  folder
    + " && " + "apktool b com.evancharlton.mileage_3110 -p ."
    + " && " + "cd " +  folder+"/com.evancharlton.mileage_3110/dist"
    + " && " + "mv com.evancharlton.mileage_3110.apk ../../app.apk"
    + " && " + "rm -rf " +  folder+"/com.evancharlton.mileage_3110"
    + " && " + "cd "+ workdir + "docker/docker-android-bdt"
    + " && " + "sudo cp " + folder + "/app.apk " + workdir + "docker/docker-android-bdt/app.apk";
    if(folderOld!= ""){
      comando += " && " + "sudo cp " + workdir + "docker/docker-android-bdt/reports " + folderOld + "/reports -r";
    }
    comando += " && " + "sudo rm -rf " + workdir + "docker/docker-android-bdt/features"
    + " && " + "sudo rm -rf " + workdir + "docker/docker-android-bdt/reports"
    + " && " + "sudo mkdir " + workdir + "docker/docker-android-bdt/reports"
    + " && " + "sudo cp " + workdir + "features " + workdir + "docker/docker-android-bdt/features -r"
    + " && " + "sudo docker-compose build"
    + " && " + "sudo docker-compose run alpine";

    exec(comando, execCallback);
  }