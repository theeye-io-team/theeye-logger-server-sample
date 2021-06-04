docker run -d --name elasticsearch --net theeye -p 9200:9200 -e "discovery.type=single-node" elasticsearch:6.8.8
