const { InfluxDB } = require('@influxdata/influxdb-client');
const org = process.env.INFLUX_ORG;
const client = new InfluxDB({
  url: process.env.INFLUX_URL,
  token: process.env.INFLUX_TOKEN,
});
const queryApi = client.getQueryApi(org);
const query = `
from(bucket: "fargate_mem")
  |> range(start: -30m, stop: now())
  |> filter(fn: (r) => r["_measurement"] == "mem")
  |> filter(fn: (r) => r["_field"] == "available" or r["_field"] == "used")
  |> aggregateWindow(every: 1m,  period: 1m, fn: mean, createEmpty: false)
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
      let used = [];
      let available = [];
      let availableTime = [];
      let usedTime = [];
      // let time = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i]['_field'] == 'used') {
          used.push(data[i]['_value']);
          usedTime.push(data[i]['_time']);
        } else if (data[i]['_field'] == 'available') {
          available.push(data[i]['_value']);
          availableTime.push(data[i]['_time']);
        }
      }
      console.log({ used, usedTime, available, availableTime });
      res
        .status(200)
        .json({ data: { used, usedTime, available, availableTime } });
    },
    error(error) {
      res.status(500).json({ error: error.message });
      console.log('query failed- ', error);
    },
  });
};
