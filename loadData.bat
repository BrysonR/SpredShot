@ECHO OFF

cd data-loader && docker build -t data-loader . && docker run --link spredshot_elastic_1:elastic data-loader