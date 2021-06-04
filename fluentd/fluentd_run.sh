#!/bin/bash

docker rm fluentd

docker run --name fluentd \
  -p 9880:9880 \
  -v ${PWD}:/fluentd/etc \
  -e FLUENTD_CONF=$1 fluent/fluentd
