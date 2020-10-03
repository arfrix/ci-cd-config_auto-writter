const Handlebars = require("handlebars");
var fs = require('fs');
const prompt = require('prompt');


const files = [
  {tamplateName: 'production-config.template', whereToWrite: 'docker-deploy/production/config.json'},
  {tamplateName: 'production-docker-compose.template', whereToWrite: 'docker-deploy/production/docker-compose.yml'},
  {tamplateName: 'production-env.template', whereToWrite: 'docker-deploy/production/env.json'},
  {tamplateName: 'staging-config.template', whereToWrite: 'docker-deploy/staging/config.json'},
  {tamplateName: 'staging-docker-compose.template', whereToWrite: 'docker-deploy/staging/docker-compose.yml'},
  {tamplateName: 'staging-env.template', whereToWrite: 'docker-deploy/staging/env.json'},
  
  {tamplateName: 'docker.template', whereToWrite: 'Dockerfile'},
]

prompt.start();
prompt.get(['version', 'file'], function (err, userInput) {
    if (err) { return onErr(err); }
    writter(userInput)
});

function writter(userInput){

  files.forEach(file => {

    fs.readFile( file.tamplateName, function(err, data){
        if (!err) {
          // make the buffer into a string
          var source = data.toString();
          version = console.read
          
          // create and write file
          fs.writeFile( file.whereToWrite, renderToString(source, { version: userInput.version, file:userInput.file }), function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
          }); 
  
        } else {
          // handle file read error
          console.log("Error")
        }
      });

  })
    
}
function dataWeWantToWrite(source, data) {
    var template = Handlebars.compile(source);
    var outputString = template(data);
    return outputString;
}
    
