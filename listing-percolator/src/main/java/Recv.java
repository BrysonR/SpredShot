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
import org.elasticsearch.action.percolate.PercolateResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentFactory;

public class Recv {


    public static void main(String[] argv)
            throws java.io.IOException,
            java.lang.InterruptedException {

        String rabbitHost = "192.168.59.103";
        String esHost = "192.168.59.103";
        String ntExchangeName = "app.alert.notify";
        String pcExchangeName = "app.listing.percolate";
        String esIndex = "equipment";
        String esType = "listings";

        Client client = new TransportClient()
                .addTransportAddress(new InetSocketTransportAddress(esHost, 9300));

        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(rabbitHost);
        Connection connection = factory.newConnection();
        Channel subChannel = connection.createChannel();
        Channel pubChannel = connection.createChannel();

        subChannel.exchangeDeclare(pcExchangeName, "fanout", true);
        String queueName = subChannel.queueDeclare().getQueue();
        subChannel.queueBind(queueName, pcExchangeName, "");

        pubChannel.exchangeDeclare(ntExchangeName, "fanout", true);

        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        QueueingConsumer consumer = new QueueingConsumer(subChannel);
        subChannel.basicConsume(queueName, true, consumer);

        while (true) {
            QueueingConsumer.Delivery delivery = consumer.nextDelivery();
            String message = new String(delivery.getBody());
            message = "{\"doc\": " + message + "}";


            PercolateResponse response = client.preparePercolate()
                    .setIndices("equipment")
                    .setDocumentType("listings")
                    .setSource(message).execute().actionGet();

            System.out.println("match count: " + response.getCount());

            for(PercolateResponse.Match match : response) {
                pubChannel.basicPublish(ntExchangeName, "", null, match.getId().toString().getBytes());

                System.out.println(" [x] Receiveded '" + match.getId().toString() + ":  " + message + "'");
            }

        }
    }
}
