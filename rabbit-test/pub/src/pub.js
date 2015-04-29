var amqp = require('amqplib');
var when = require('when');

amqp.connect('amqp://rabbit').then(function(conn) {
    return when(conn.createChannel().then(function(ch) {
        var ex = 'scraper.ar15';
        var ok = ch.assertExchange(ex, 'direct', {
            durable: false
        })

        var message = process.argv.slice(2).join(' ') ||
            'info: Hello World!';

        return ok.then(function() {
            ch.publish(ex, '', new Buffer(message));
            console.log(" [x] Sent '%s'", message);
            return ch.close();
        });
    })).ensure(function() {
        conn.close();
    });
}).then(null, console.warn);