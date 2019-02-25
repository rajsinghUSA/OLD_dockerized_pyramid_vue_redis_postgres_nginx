FROM ubuntu:18.04
MAINTAINER Raj &amp;lt;raj@fake.email&amp;gt;

#ENTRYPOINT ["sh", "bin/start.sh"]
# ENV VENV=/app
ENV PYTHONUNBUFFERED 1

RUN apt-get -yqq update \
  && apt-get install -yqq python3 python3-dev python3-pip python3-venv
  # && pip install --upgrade pip setuptools

RUN ls -a
