# Laravel Template


<!-- php -S localhost:8008 -->

## Dev
```
php artisan serve --port=XXXX
npm run watch
```


## Setup
```
composer install
npm install  --legacy-peer-deps
php artisan storage:link
php artisan passport:keys --force
php artisan passport:client --password
php artisan migrate
php artisan db:seed
```


## Set up Queue handler
#### Run Queue (for development)
```bash
nohup php artisan queue:work --daemon >> storage/logs/laravel.log &
```

#### Run Queue (for production)
1. Install supervisor
```bash
sudo apt-get install supervisor
```
2. Create supervisor config file
```bash
sudo vi /etc/supervisor/conf.d/proj-worker.conf
```
3. Put config content to the file; don't forget to change `/path/to/home/directory/`
```bash
[program:proj-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/home/directory/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=growthd
numprocs=1
redirect_stderr=true
stdout_logfile=/path/to/home/directory/storage/logs/worker.log
stopwaitsecs=3600
```

> You need to make sure /path/to/home/directory/artisan exists

4. Run supervisor (always run these commands if there are changes in `proj-worker.conf`)
```bash
sudo supervisorctl stop all
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start all
```



## Set up Scheduler
add this cron entry to your server
```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

## Test Scheduler
```bash
php artisan schedule:test
```
