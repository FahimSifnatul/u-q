FROM python:3.8-slim-buster
WORKDIR /u-q
COPY requirements.txt requirements.txt
RUN apt install -y  python3-dev default-libmysqlclient-dev build-essential
RUN pip install -r requirements.txt
COPY . .