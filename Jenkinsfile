node {
	stage('SCM Checkout'){
		git branch: 'master', credentialsId: 'c5c5a04a-bd3a-483a-b84a-40fe2c599d5a', url: 'https://github.com/waqifti/mpartial-frontend.git'
		
	}
	
	stage('Build'){
		
		dir("${JENKINS_HOME}/workspace/mpartial-frontend"){
		  	sh 'npm install'
        		sh 'npm run build'
		}
		
		
		
	}
	stage('Deploy') {       
        	sh 'rm -rf "/var/www/html/*"'
        	sh 'cp -R "${JENKINS_HOME}/workspace/mpartial-frontend/build/." "/var/www/html"'

        }
    
   
}
