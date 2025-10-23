-- CreateTable
CREATE TABLE "stations" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "lastSeen" TIMESTAMP(3),
    "firmwareVersion" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensors" (
    "id" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT,
    "metric" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "sensors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "readings" (
    "time" TIMESTAMP(3) NOT NULL,
    "stationId" TEXT NOT NULL,
    "sensorId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "readings_pkey" PRIMARY KEY ("time","sensorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "sensors_stationId_type_address_key" ON "sensors"("stationId", "type", "address");

-- CreateIndex
CREATE INDEX "readings_stationId_time_idx" ON "readings"("stationId", "time");

-- CreateIndex
CREATE INDEX "readings_sensorId_time_idx" ON "readings"("sensorId", "time");

-- AddForeignKey
ALTER TABLE "sensors" ADD CONSTRAINT "sensors_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "sensors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Make readings a hypertable (time-series optimized)
SELECT create_hypertable('readings', 'time');

-- Add compression after 7 days
ALTER TABLE readings SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'sensor_id'
    );

SELECT add_compression_policy('readings', INTERVAL '7 days');