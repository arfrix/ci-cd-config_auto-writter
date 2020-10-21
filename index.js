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
  
  {tamplateName: 'docker.template', whereToWrite: 'docker-deploy/Dockerfile'},
  {tamplateName: 'gitlab-ci.template', whereToWrite: 'docker-deploy/.gitlab-ci.yml'},
]

prompt.start();
prompt.get(['what_is_stack_id_of_production_config',
 'what_is_project_name_in_image_url_in_production_docker_compose',
 'what_is_production_env_domain', 'what_is_stack_id_of_staging_config',
 'what_is_project_name_in_image_url_in_staging_docker_compose',
 'what_is_staging_env_domain',
'what_is_project_name_in_staging_image_url',
'what_is_project_name_in_production_image_url',
'staging_docker_compose_service_name',
'production_docker_compose_service_name'],
  function (err, userInput) {
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
          fs.writeFile( file.whereToWrite, dataWeWantToWrite(source, userInput, file), function (err) {
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
function dataWeWantToWrite(source, userInput, file) {
    var template = Handlebars.compile(source);
    switch (file.tamplateName) {
      case 'production-config.template':
        return template({what_is_stack_id_of_production_config: userInput.what_is_stack_id_of_production_config});
        
      case 'production-docker-compose.template':
        return template({what_is_project_name_in_image_url_in_production_docker_compose: userInput.what_is_project_name_in_image_url_in_production_docker_compose, production_docker_compose_service_name: userInput.production_docker_compose_service_name});
        
      case 'production-env.template':
        return template({what_is_production_env_domain: userInput.what_is_production_env_domain});
        
      case 'staging-config.template':
        return template({what_is_stack_id_of_staging_config: userInput.what_is_stack_id_of_staging_config});
        
      case 'staging-docker-compose.template':
        return template({what_is_project_name_in_image_url_in_staging_docker_compose: userInput.what_is_project_name_in_image_url_in_staging_docker_compose, staging_docker_compose_service_name: userInput.staging_docker_compose_service_name});
        
      case 'staging-env.template':
        return template({what_is_staging_env_domain: userInput.what_is_staging_env_domain});

      case 'staging-env.template':
        return template({what_is_staging_env_domain: userInput.what_is_staging_env_domain});
        
      case 'gitlab-ci.template':
        return template({what_is_project_name_in_staging_image_url: userInput.what_is_project_name_in_staging_image_url, what_is_project_name_in_production_image_url: userInput.what_is_project_name_in_production_image_url});
        
      case 'docker.template':
        return template();
    
      default:
        break;
    }
     
    return null;
}
    
