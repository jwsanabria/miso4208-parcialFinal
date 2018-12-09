#!/bin/bash
echo "Waiting for localhost:5555 to become available ..."
while ! nc -z localhost 5555; do
  sleep 2
done
echo "Done"

adb connect localhost:5555
adb kill-server
timeout 20 adb wait-for-device


A=$(adb shell getprop sys.boot_completed | tr -d '\r')

while [ "$A" != "1" ]; do
        sleep 1
        A=$(adb shell getprop sys.boot_completed | tr -d '\r')
done

adb start-server
calabash-android run app.apk --format html --out reports/reports.html
