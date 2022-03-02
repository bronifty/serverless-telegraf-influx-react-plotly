from datetime import datetime
import os

from influxdb_client import InfluxDBClient


# You can generate an API token from the "API Tokens Tab" in the UI
token = os.getenv("INFLUX_TOKEN")
org = "bronifty@gmail.com"
bucket = "fargate_mem"


from http.server import BaseHTTPRequestHandler
from urllib import parse
class handler(BaseHTTPRequestHandler):
  def do_GET(self):

    with InfluxDBClient(url="https://us-east-1-1.aws.cloud2.influxdata.com", token=token, org=org) as client:

      query = """from(bucket: "fargate_mem") |> range(start: -1h)"""
      tables = client.query_api().query(query, org=org)
      for table in tables:
          for record in table.records:
              print(record)
      client.close()
        # s = self.path
        # dic = dict(parse.parse_qsl(parse.urlsplit(s).query))
    self.send_response(200)
    self.send_header('Content-type','text/plain')
    self.end_headers()
    # if "name" in dic:
    #     message = "Hello, " + dic["name"] + "!"
    # else:
    message = "Hello, stranger!"
    self.wfile.write(message.encode())
    return