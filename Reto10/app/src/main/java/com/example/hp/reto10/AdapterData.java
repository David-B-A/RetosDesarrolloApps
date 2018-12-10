package com.example.hp.reto10;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.ArrayList;

public class AdapterData extends BaseAdapter {
    protected Activity activity;
    protected ArrayList<Data> items;

    public AdapterData(Activity activity, ArrayList<Data> items) {
        this.activity = activity;
        this.items = items;
    }

    @Override
    public int getCount() {
        return items.size();
    }

    public void clear() {
        items.clear();
    }

    public void addAll(ArrayList<Data> data) {
        for (int i = 0; i < data.size(); i++) {
            items.add(data.get(i));
        }
    }

    @Override
    public Object getItem(int arg0) {
        return items.get(arg0);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View v = convertView;

        if (convertView == null) {
            LayoutInflater inf = (LayoutInflater) activity.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            v = inf.inflate(R.layout.item_category, null);
        }

        Data dir = items.get(position);

        TextView title = (TextView) v.findViewById(R.id.category);
        title.setText(dir.name);

        TextView description = (TextView) v.findViewById(R.id.texto);
        description.setText(dir.description);

        return v;
    }
}
