const Handlebars = require("handlebars");
var fs = require('fs');
const prompt = require('prompt');

prompt.start();
prompt.get(['version', 'file'], function (err, result) {
    if (err) { return onErr(err); }
    render(result)
});

function render(results){
    
fs.readFile('gitlab-ci.yml.template', function(err, data){
    if (!err) {
      // make the buffer into a string
      var source = data.toString();
      // call the render function
      version = console.read
      renderToString(source, { version: results.version,file:results.file });
      // create and write file
      fs.writeFile('test/neewfile.txt', renderToString(source, { version: results.version,file:results.file }), function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      }); 

    } else {
      // handle file read error
      console.log("Error")
    }
  });
}
function renderToString(source, data) {
    var template = Handlebars.compile(source);
    var outputString = template(data);
    console.log(outputString)
    return outputString;
}
    
