/**
 * Created by bmills on 5/27/15.
 */

import com.fasterxml.jackson.databind.ObjectMapper;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.search.SearchHit;

public class test {
    public static void main(String[] argv)
            throws java.io.IOException,
            java.lang.InterruptedException {


        String esHost = "192.168.59.103";
        String esIndex = "equipment";
        String esType = "listings";

        Client client = new TransportClient()
                .addTransportAddress(new InetSocketTransportAddress(esHost, 9300));

        SearchRequestBuilder mySearch = client.prepareSearch(esIndex)
                .setTypes(esType)
                .setQuery(QueryBuilders.termQuery("description", "sig"))             // Query
                .setFrom(0).setSize(60).setExplain(true);
        SearchResponse response = mySearch
                .execute()
                .actionGet();

        String esQuery = mySearch.toString();

        ObjectMapper mapper = new ObjectMapper();
        Object myObj = mapper.readValue(esQuery, Object.class);

        System.out.println(myObj);

        System.out.println(" [*] total hits: " + response.getHits().getTotalHits());

        for (SearchHit hit : response.getHits().getHits()) {
            System.out.println(" [*] search matched: " + hit.id());
        }
    }
}
