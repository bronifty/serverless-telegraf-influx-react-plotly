FROM telegraf:latest
RUN rm -rf /etc/telegraf/telegraf.conf 
COPY telegraf.conf /etc/telegraf/telegraf.conf