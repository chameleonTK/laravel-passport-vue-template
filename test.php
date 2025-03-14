<?php
    require __DIR__ . '/vendor/autoload.php';


    use ElephantIO\Client as ElephantIOClient;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;
    use Psr\Log\LogLevel;

    $url = 'https://online.ymtgold.com:7001';

    // if client option is omitted then it will use latest client available,
    // aka. version 4.x

    $logfile = __DIR__ . '/socket.log';
    $logger = new Logger('elephant.io');
    $logger->pushHandler(new StreamHandler($logfile, LogLevel::DEBUG)); // set LogLevel::INFO for brief logging

    $options = [
        // "transport" => "websocket",
        'client' => ElephantIOClient::CLIENT_4X, 
        'logger' => $logger
    ];
    $client = ElephantIOClient::create($url, $options);
    $client->connect();

    $gp = null;
    
    if ($packet = $client->wait(null)) {
        // an event has been received, the result will be a \ElephantIO\Engine\Packet class
        // data property contains the first argument
        // args property contains array of arguments, [$data, ...]
        $data = $packet->data;
        $args = $packet->args;

        // access data
        $gp = $data;
    }

    // end session
    $client->disconnect();

?>