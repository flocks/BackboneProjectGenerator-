BackboneProjectGenerator-
=========================


I realized that everytime I want to start a new project, I was doing the same things again and again to setup the project.
So I gathered the components in a folder and wrote script to copy all thoses files and the architecture in a new folder.

It is including :


- BackboneJS
- RequireJS
- jQuery
- lodash
- Parse

It automatically creates a private github repo

Installation
`````javascript
git clone https://github.com/flocks/BackboneProjectGenerator-.git
npm install
`````
You can set your path 
`````javascript
var pathBase = '/Users/flocks';
`````
Running 
`````javascript
node app.js projectName
`````
Todo :

- add "git init, git remote add origin, and first commit/push"
