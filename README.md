# SkyAerosolAnalyzer

## Overview
The sky can give us much information , it  will be analyzed usig the images that are sent from a mobile device and the result will be stored in a database. This database will be accesible through a web application.

## Description
A colaborative Application to measure the aerosol particles in the air by images taken with a mobile device. Those  images will be process and store into a server. The data extracted from images will be compared with the nearest AERONET Station (AEROSOL ROBOTIC NETWORK). Both, data and images, will be available to public on a web.

## Demo

The demo online of [SkyAerosol_API](http://aerosolskyanalyzer.tk/) with the Daily Average of AERONET


## The parts of software

This are the parts of the whole project:

* Backend based on [SailsJS](http://sailsjs.org/#!/getStarted) and serving [AERONET data](http://aeronet.gsfc.nasa.gov/cgi-bin/combined_data_access_new) with a [mongoDB](https://www.mongodb.org/)
* Frontend is a web page [Bootstrap](http://getbootstrap.com/) + [D3js](http://d3js.org/) + [DataMaps](http://datamaps.github.io/)
* (work in progress) Image processing
* (work in progress) App for Android

## Install on your own server

In order to install the backend and serve your own data. You must install the back end, based on SailsJS. This is located at GItHub repository as backend

### Install NodeJS and SailsJS

In *Debian*:

```$ sudo apt-get install curl```

```$ curl -sL https://deb.nodesource.com/setup | bash -```

```$ sudo apt-get install nodejs```
```$ sudo npm -g install sails```


For other distros follow this link http://sailsjs.org/#!/getStarted


### Install MongoDB

In *Debian*:

```$ sudo  apt-get install mongodb```

In order to have an install granulated  follow the instructions of this link http://docs.mongodb.org/manual/tutorial/install-mongodb-on-debian/
In the other hand is highly recomended to run a 64bits version of mongoDB to have a good performance on import operations and run a production server

### Install Forever

In *Debian*:

```$ sudo npm install forever -g```

### Install SkyAerosolAnalyzer backend

```$ git clone https://github.com/davidgt/SkyAerosolAnalyzer.git```

```$ cd SkyAerosolAnalyzer/backend```

```$ sudo npm install```


### Populate database with AERONET data

First of all go to AERONET web page and download de Level 2.0 AOD Daily Average http://aeronet.gsfc.nasa.gov/cgi-bin/combined_data_access_new

Second unpackage the file downloaded.

```$ tar -xzvf INV_Level2_Daily_V2.tar.gz```

Go to the scripts directory, and there do:

```$ ./skyAerosolAnalyzer_importer_mongodb.sh INV_Level2_Daily_V2/INV/DUBOV/DAILY/*```

In order to execute the above script, skyAerosolAnalyzer_importer_mongodb.sh must have execute permission, to do that:

```$ sudo chmod a+x skyAerosolAnalyzer_importer_mongodb.sh```

### Start SkyAnalyzer server

```$ cd backend/```

```$ sails lift```


Or to run the server non stop use [forever](https://github.com/foreverjs/forever):

`$ forever start backend/app.js`

In Debian case, if you want to add a service to start and stop the server, copy the script skyAerosol_service.sh located at scripts/ directory on this repository to /etc/init.d/ on your Debian, give it executions permission (command above). And if you wish to start on boot (to get more info about this subject of [booting](https://www.debian-administration.org/article/28/Making_scripts_run_at_boot_time_with_Debian) on Debian):

`$ sudo update-rc.d skyAerosol_service.sh defaults`

## API to consume data

You can retrieve data in json:

* Retrieve all records from Location called Burjassot

`http://[serverIP]:[PORT]/days/find?Locations=Burjassot`

* Retrieve all data from Location called Burjassot certain day

`http://[serverIP]:[PORT]/days/find?Locations=Burjassot&Date(dd-mm-yyyy)=15:07:2003`


* Retrieve all data from all location to certain day

`http://[serverIP]:[PORT]/days/find?Date(dd-mm-yyyy)=15:07:2003`

* Retrieve all data from points with elevation >= 1000 meters

`http://[serverIP]:[PORT]/days?where={"elev":{">=":1000}}`

* Retrieve all data from points with elevation >= 1000 meters and certain day

`http://[serverIP]:[PORT]/days?where={"Date(dd-mm-yyyy)":"04:07:2003","elev":{">=":1000}}`

* Retrieve all data Water(cm) variable is equal or greater than 2.5 cm

`http://[serverIP]:[PORT]/days?where={"Water(cm)":{">=":2.5}}`
