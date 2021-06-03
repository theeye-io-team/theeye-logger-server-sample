task="5fabff79e2a0433d4c86feb5"
secret="9e8e66c79ba6d2f961e2ebb276d1a8fc7df106f8b1b2f177cf4b6aed51812f6b"
customer="facugon"

curl -i -sS -X POST "http://127.0.0.1:60080/${customer}/task/${task}/secret/${secret}/job" \
  --header 'Content-Type: application/json' \
  --data '{"task_arguments":["5b5b4e8db8a35d1200055257","facugon","unattended",8000,"2018-07-27T13:34:42.237Z"]}'
