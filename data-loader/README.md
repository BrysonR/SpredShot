Container will run the shell script and load what's in the sample.json file into the fig instance

cd data-loader/

Local Build Instructions (FIRST):

docker build -t data-loader .

Run Local Instructions (SECOND):

docker run --link gunsnfun_elastic_1:elastic data-loader

TODO: move connection strings to env variable
