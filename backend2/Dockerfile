FROM python:3.6.7-slim-stretch
WORKDIR /src/app
COPY requirements.txt .
RUN pip install \
    --no-cache-dir \
    --disable-pip-version-check \
    -r requirements.txt
ENV FLASK_RUN_PORT 3030
COPY . .
CMD ["sh", "run.sh"]
