
Crear el directorio theeye y ejecutar `fluentd_run.sh` con el archivo de configuración a utilizar como parámetro

```

mkdir theeye

./fluentd_run.sh fluentd_http2stdout.conf

```

En otra terminal

```
tail -F theeye/buffer.b5c3e9b741fe8cdb92caa6734b79749e3.log

```
