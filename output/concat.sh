#!/bin/bash -e 

rm *.csv

for file in $(ls | grep log); do
    cat $file | sed 's/[^0-9]//g' > $file.csv 
done

ls | grep log | grep -v .csv | tr "\n" "," > concat.csv
paste -d ',' $(ls | grep -v concat | grep .csv) >> concat.csv
