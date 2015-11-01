#! /bin/sh
# /etc/init.d/skyAerosol_service.sh


### BEGIN INIT INFO
# Provides:          skyAerosol_API
# Required-Start:    $syslog
# Required-Stop:     $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: sky aerosol analyzer API
# Description:
#
### END INIT INFO


# The following part carries out specific functions depending on arguments.
case "$1" in
  start)
    echo "Starting skyAerosol API"
    exec forever start --sourceDir=/home/aerosolanalyzer/SkyAerosolAnalyzer/backend -p /home/aerosolanalyzer/SkyAerosolAnalyzer/backend -s --append -l skyAA.log -e skAA_error.log --minUptime=2000 --spinSleepTime=3000  app.js --prod &
    echo "skyAerosol API started"
    ;;
  stop)
    echo "Stoping skyAerosol API"
    exec forever stop --sourceDir=/home/aerosolanalyzer/SkyAerosolAnalyzer/backend -p /home/aerosolanalyzer/SkyAerosolAnalyzer/backend -s -l skyAA.log -e skyAA_error.log --minUptime=2000 --spinSleepTime=3000  app.js
    echo "skyAerosol API stoped"
    ;;
  *)
    echo "Usage: /etc/init.d/skyAerosol_service.sh {start|stop}"
    exit 1
    ;;
esac

exit 0
