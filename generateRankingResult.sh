#!/bin/sh

jobID=$1
industry=$2
cd ./ranking/$2
pwd
Rscript applying.R job-$1.csv
echo "done"