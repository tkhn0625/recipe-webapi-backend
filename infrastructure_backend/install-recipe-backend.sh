#!/bin/bash
# ---------------------------------
# Install recipe-backend.service
# ---------------------------------
APP_NAME="recipe-backend"
APP_SERVICE="/etc/systemd/system/${APP_NAME}.service"

# Install application service
rm -rf "${APP_SERVICE}"
cp "${APP_SERVICE##*/}" "${APP_SERVICE}"
chmod +x "${APP_SERVICE}"
systemctl daemon-reload
