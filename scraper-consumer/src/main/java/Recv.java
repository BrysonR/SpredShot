/**
 * Created by bmills on 5/10/15.
 */

import java.io.IOException;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.QueueingConsumer;

public class Recv {

    private static final String EXCHANGE_NAME = "scraper.ar15";

    public static void main(String[] argv)
            throws java.io.IOException,
            java.lang.InterruptedException {

        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("192.168.59.103");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.exchangeDeclare(EXCHANGE_NAME, "direct", true);
        String queueName = channel.queueDeclare().getQueue();
        channel.queueBind(queueName, EXCHANGE_NAME, "");

        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        QueueingConsumer consumer = new QueueingConsumer(channel);
        channel.basicConsume(queueName, true, consumer);

        while (true) {
            QueueingConsumer.Delivery delivery = consumer.nextDelivery();
            String message = new String(delivery.getBody());

            System.out.println(" [x] Receiveded '" + message + "'");
        }
    }
}
