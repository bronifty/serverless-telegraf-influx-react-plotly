const { InfluxDB } = require('@influxdata/influxdb-client');
const token =
  'J3RZ9wD7uuu_uzJKQRZsYgReaA2pLcymjWC5mYD_vRPzwFHM2KqP36eI4Yy-LKPKuDd4mcDp6m8ER-W3INSjig==';
const org = 'bronifty@gmail.com';
const client = new InfluxDB({
  url: 'https://us-east-1-1.aws.cloud2.influxdata.com',
  token: token,
});

const queryApi = client.getQueryApi(org);
const query = `
from(bucket: "fargate_mem")
  |> range(start: -15m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "mem")
  |> filter(fn: (r) => r["_field"] == "available")
  |> aggregateWindow(every: 10s,  period: 1m, fn: mean, createEmpty: false)
  |> yield(name: "mean")
`;
let data = [];
export default async (req, res) => {
  await queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      data.push(o);
    },
    error(error) {
      console.error(error);
      console.log('Finished ERROR');
    },
    complete() {
      res.status(200).json(data);
      // let finalData = [];
      // var exists = false;
      // for (let i = 0; i < res.length; i++) {
      //   for (let j = 0; j < finalData.length; j++) {
      //     if (res[i]['sensor_id'] === finalData[j]['id']) {
      //       exists = true;
      //       let point = {};
      //       point['x'] = res[i]['_time'];
      //       point['y'] = res[i]['_value'];
      //       finalData[j]['data'].push(point);
      //     }
      //   }

      //   if (!exists) {
      //     let d = {};
      //     d['id'] = res[i]['sensor_id'];
      //     d['data'] = [];
      //     let point = {};
      //     point['x'] = res[i]['_time'];
      //     point['y'] = res[i]['_value'];
      //     d['data'].push(point);
      //     finalData.push(d);
      //   }
      //   exists = false;
      // }
      // res.status(200).json(finalData);
    },
    error(error) {
      res.status(500).json({ error: error.message });
      console.log('query failed- ', error);
    },
  });
};
