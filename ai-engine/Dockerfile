FROM python:3.11-slim
WORKDIR /app
COPY api/ ./api/
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 6000
CMD ["python","api/server.py"]
