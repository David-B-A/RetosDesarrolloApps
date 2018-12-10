package com.example.hp.reto10;

import android.os.AsyncTask;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.JsonReader;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;


/*
* https://www.datos.gov.co/resource/saqf-wjui.json?$$app_token=WaNnRjrZXvcATkehnURcILY8j
* */

public class MainActivity extends AppCompatActivity {
    ListView list;
    ArrayList<String> arrayList = new ArrayList<>();
    ArrayList<Data> arrayData = new ArrayList<Data>();
    ArrayAdapter arrayAdapter;
    AdapterData adapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //arrayAdapter = new ArrayAdapter(this,android.R.layout.simple_list_item_1,arrayList);
        //list = findViewById(R.id.list);
        //list.setAdapter(arrayAdapter);
        getData();
        ListView lv = (ListView) findViewById(R.id.list);
        adapter = new AdapterData(this, arrayData);
        lv.setAdapter(adapter);
    }
    public void getData() {
        // Create URL
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        try {
            URL urlDatos = new URL("https://www.datos.gov.co/resource/saqf-wjui.json?$$app_token=WaNnRjrZXvcATkehnURcILY8j");
            HttpsURLConnection myConnection = (HttpsURLConnection) urlDatos.openConnection();
            myConnection.setRequestProperty("User-Agent", "dabelloa");
            myConnection.setRequestMethod("GET");
            myConnection.connect();
            BufferedReader in = new BufferedReader(new InputStreamReader(myConnection.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            String json = "";
            while((inputLine = in.readLine()) != null){
                response.append(inputLine);
            }
            json = response.toString();
            JSONArray jsonArr = null;
            jsonArr = new JSONArray(json);

            for(int i = 0;i<jsonArr.length();i++){
                JSONObject jsonObject = jsonArr.getJSONObject(i);
                Log.d("Status","OK");
                Data data = new Data(jsonObject.optString("departamento")+" - "+jsonObject.optString("estacion"),"Teléfono: "+jsonObject.optString("numerodecontacto") + ", Cuadrante: "+jsonObject.optString("cuadrante"));
                arrayData.add(data);
                //arrayList.add(jsonObject.optString("estacion"));
            }
            //arrayAdapter.notifyDataSetChanged();

        } catch (IOException e) {
            e.printStackTrace();
            Log.d("Status","FAIL");
        } catch (JSONException e) {
            e.printStackTrace();
            Log.d("Status","FAIL");
        }
    }

}

