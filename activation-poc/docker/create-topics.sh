#!/bin/bash
# Esperar a que Kafka esté listo
sleep 5

# Crear los topics con 3 particiones
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic activation.requested
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic billing.events
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic provisioning.events
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic activation.events

# Crear los DLQ topics
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic activation.requested.dlq
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic billing.events.dlq
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic provisioning.events.dlq
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic activation.events.dlq

echo "Topics creados exitosamente."
