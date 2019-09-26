FROM python:3.7-slim
ENV http_proxy=http://proxyout.inist.fr:8080/ \
    HTTP_PROXY=http://proxyout.inist.fr:8080/ \
    https_proxy=http://proxyout.inist.fr:8080/ \
    HTTPS_PROXY=http://proxyout.inist.fr:8080/ \
    no_proxy=localhost,127.0.0.0/8,*.local,172.16.0.0/16 \
    NO_PROXY=localhost,127.0.0.0/8,*.local,172.16.0.0/16 \
    FLASK_APP=galaxy
COPY . /app
WORKDIR /app
RUN mkdir -p /app/galaxy/uploaded \
    mkdir -p /app/galaxy/outputs
RUN apt-get update && apt-get install -y \
    perl \
    libssl-dev \
    libnet-ssleay-perl \
    libcrypt-ssleay-perl \
    liblwp-protocol-https-perl \
    cpanminus \
    build-essential
RUN cpanm --notest ExtUtils::MakeMaker \
          IO::Socket::SSL \
          LWP::UserAgent \
          LWP::Protocol::https \
          Test::Requires \
          HTTP::CookieJar \
          JSON \
          URI::Encode
RUN pip3 install -r requirements.txt
CMD ["flask", "run", "--host=0.0.0.0"]
