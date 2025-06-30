# Docker
### why?
- makes it very easy to setup project locally.
- dockerize your own apps
- learn to deploy via docker

### what is containerisation?
- often the dependencies are difficult to install , difficult clone the env 
- everyone has different OS.Installation takes a lot of time
- steps also differ in different OS
- whole project congif can be described in a single file
- also this code / external project in an isolated environment
- makes a hell lot easier to install auxiliart services / DB
- can run different versions of dependencies parallely causing no issue.

therefore

_Containerization_ - _containerization involves building self sufficient software packages that perform consistently,regardless the machine they are using_

_Docker_ -  _makes easy to deploy containerization and orchestration becomes easy._

_docker_ -> _orchestraion_ -> aws/gcp/azure

-----

#### inside docker
3 parts
- cli
- engine
- registry


*cli* =>  lets you to run command - command line interface

*engine* => main part of docker ,  cli is a pathway to talk to dockerdaemon

- docker earns money via dockerhub -> similar to github
- docker hub ->  people keep there project images

### containers vs images

- container image is like a template from which consistent containers can be created.
- differs from VM
- image defines intial filesystem state of new containers
- have dependencies packaged into self-contained package thats ready to use with container runtime
- within the image the filesystem content is represented as multiple indepedent layers

### making a container
- docker build or have a preconfig image
- this commad creates a image which has a  filesystem, exposed routes ...
- this image can be sent 
- image is created once , containers can be many =>  why need more containers  ->  autoscalling ...
- if you put this image on internet , your friend can take that image by docker pull and can create container from docker run

### creating simple fullstack app - Dockerfile
### containerizing the backend
