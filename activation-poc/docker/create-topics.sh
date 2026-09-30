#!/bin/bash
# Esperar a que Kafka esté listo
sleep 5

# Crear los topics con 3 particiones
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic activation.requested
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic billing.events
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic provisioning.events
/opt/kafka/bin/kafka-topics.sh --create --if-not-exists --bootstrap-server kafka:9092 --partitions 3 --topic activation.events

echo "Topics creados exitosamente."