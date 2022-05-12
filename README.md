
### Build
```console
docker build -t raffsimms-web .
```

### Run
```console
docker run -d -v $(pwd)/config.json:/usr/src/app/config.json \
    -v $(pwd)/views:/usr/src/app/views \
    -v $(pwd)/public:/usr/src/app/public \
    --network app_net \
    --ip 172.18.0.2 \
    --restart unless-stopped \
    --name raffsimms-web \
    raffsimms-web:latest
```