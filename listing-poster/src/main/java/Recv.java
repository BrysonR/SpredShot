/**
 * Created by bmills on 5/10/15.
 */

import java.io.IOException;
import java.util.Date;

import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.QueueingConsumer;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;

public class Recv {

    private static final String EXCHANGE_NAME = "app.listing-post";

    public static void main(String[] argv)
            throws java.io.IOException,
            java.lang.InterruptedException {

        String hostName = "rabbit";

        Client client = new TransportClient()
                .addTransportAddress(new InetSocketTransportAddress(hostName, 9300));

        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(hostName);
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.exchangeDeclare(EXCHANGE_NAME, "fanout", true);
        String queueName = channel.queueDeclare().getQueue();
        channel.queueBind(queueName, EXCHANGE_NAME, "");

        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        QueueingConsumer consumer = new QueueingConsumer(channel);
        channel.basicConsume(queueName, true, consumer);

        while (true) {
            QueueingConsumer.Delivery delivery = consumer.nextDelivery();
            String message = new String(delivery.getBody());

            IndexResponse response = client.prepareIndex("equipment", "listing")
                    .setSource(message)
                    .execute()
                    .actionGet();

            String _id = response.getId();

            System.out.println(" [x] Receiveded '" + _id + ":  " + message + "'");
        }
    }
}
