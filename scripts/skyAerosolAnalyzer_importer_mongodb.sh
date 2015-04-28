#!/bin/bash

# this script arranges and import the data from  ERONET [AEROSOL ROBOTIC NETWORK] http://aeronet.gsfc.nasa.gov/cgi-bin/combined_data_access_inv
# in dubovik extension (is nothing else than a csv) into a mongoDB
# by carvilsi

# tested only with Level 2.0 Almucantar Inversion Products version 2 Daily Average dubovikday extension 
# I do not know if it works with All Points or Monthly Average files
 

# name of database in mongo db
DB="skyAerosol"

# name of collection for data
COLL="days"


# Usage message
usage_script()
{
cat << EOF
	usage: ./skyAerosolAnalyzer_importer_mongodb.sh directory/with/data/from/aeronet/*
		
		In order to run, the script $0 must have execute permission
		$ sudo chmod a+x skyAerosolAnalyzer_importer_mongodb.sh 
EOF
}


echo $#

if [ "$#" -eq 0 ]; then
    echo "Illegal number of parameters"
    usage_script
fi



if [ -e t1.csv ]
then
	rm t1.csv t0.csv th0.csv tf0.csv tf1.csv o.csv
fi
for f in $@
do
	echo "Processing $f file..."
	tail -n +4 $f >> t0.csv
	linea=$(head -n 1 $f |  awk 'BEGIN {FS=","} {print $2,$3,$4,$5,$6,$7,$8}' | awk 'BEGIN {FS="="} {print $1,$2,$3,$4,$5,$6,$7,$8}')
	IFS=' ' read -a array <<< "$linea"
	sed "1 s/^/${array[0]},${array[2]},${array[4]},${array[6]},${array[8]},${array[10]},${array[12]},/" t0.csv >> t1.csv
	head -n 1 t1.csv >> th0.csv
	tail -n +2 t1.csv >> tf0.csv
	sed -e "s/^/${array[1]},${array[3]},${array[5]},${array[7]},${array[9]},${array[11]},${array[13]},/" tf0.csv >> tf1.csv
	cat th0.csv >> o.csv
	cat tf1.csv >> o.csv 
	echo "Importing $f to mongo..."
	mongoimport -d $DB -c $COLL --type csv --file o.csv --headerline
	rm t1.csv t0.csv th0.csv tf0.csv tf1.csv o.csv

done

