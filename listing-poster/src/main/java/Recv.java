/**
 * Created by bmills on 5/10/15.
 */

import java.io.IOException;
import java.net.InetAddress;
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


    public static void main(String[] argv)
            throws java.io.IOException,
            java.lang.InterruptedException {

        String rabbitHost = "rabbit";
        String esHost = "elastic";
        String lsExchangeName = "app.listing.create";
        String pcExchangeName = "app.listing.percolate";
        String esIndex = "equipment";
        String esType = "listing";

        Client client = TransportClient.builder().build()
                .addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(esHost), 9300));

        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(rabbitHost);
        Connection connection = factory.newConnection();
        Channel subChannel = connection.createChannel();
        Channel pubChannel = connection.createChannel();

        subChannel.exchangeDeclare(lsExchangeName, "fanout", true);
        String queueName = subChannel.queueDeclare().getQueue();
        subChannel.queueBind(queueName, lsExchangeName, "");

        pubChannel.exchangeDeclare(pcExchangeName, "fanout", true);

        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        QueueingConsumer consumer = new QueueingConsumer(subChannel);
        subChannel.basicConsume(queueName, true, consumer);

        while (true) {
            QueueingConsumer.Delivery delivery = consumer.nextDelivery();
            String message = new String(delivery.getBody());

            IndexResponse response = client.prepareIndex(esIndex, esType)
                    .setSource(message)
                    .execute()
                    .actionGet();

            String _id = response.getId();

            pubChannel.basicPublish(pcExchangeName, "", null, message.getBytes());

            System.out.println(" [x] Receiveded '" + _id + ":  " + message + "'");
        }
    }
}
