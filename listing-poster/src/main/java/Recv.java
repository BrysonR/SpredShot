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


    public static void main(String[] argv)
            throws java.io.IOException,
            java.lang.InterruptedException {

        String rabbitHost = "rabbit";
        String esHost = "elastic";
        String exchangeName = System.getenv("RABBIT_EXCHANGE");
        String esIndex = System.getenv("ES_INDEX");
        String esType = System.getenv("ES_TYPE");

        Client client = new TransportClient()
                .addTransportAddress(new InetSocketTransportAddress(esHost, 9300));

        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(rabbitHost);
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.exchangeDeclare(exchangeName, "fanout", true);
        String queueName = channel.queueDeclare().getQueue();
        channel.queueBind(queueName, exchangeName, "");

        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        QueueingConsumer consumer = new QueueingConsumer(channel);
        channel.basicConsume(queueName, true, consumer);

        while (true) {
            QueueingConsumer.Delivery delivery = consumer.nextDelivery();
            String message = new String(delivery.getBody());

            IndexResponse response = client.prepareIndex(esIndex, esType)
                    .setSource(message)
                    .execute()
                    .actionGet();

            String _id = response.getId();

            System.out.println(" [x] Receiveded '" + _id + ":  " + message + "'");
        }
    }
}
