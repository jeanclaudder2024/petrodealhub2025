#!/bin/bash

# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install required packages
sudo apt-get install -y \
    nginx \
    certbot \
    python3-certbot-nginx \
    nodejs \
    npm \
    sqlite3 \
    git \
    build-essential

# Install PM2 globally
sudo npm install -g pm2

# Clone your repository (replace with your actual repository URL)
# git clone https://your-repository-url.git
# cd OilVesselTracker-2

# Install dependencies
cd client
npm install
npm run build
cd ..

# Install server dependencies
npm install

# Set up environment variables
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "\nPlease edit the .env file with your configuration and then run this script again."
    exit 1
fi

# Build the application
npm run build

# Set up PM2 to start the application
pm2 start dist/index.js --name "oil-vessel-tracker"

# Configure Nginx
sudo rm /etc/nginx/sites-enabled/default
sudo cp nginx.conf /etc/nginx/sites-available/oil-vessel-tracker
sudo ln -s /etc/nginx/sites-available/oil-vessel-tracker /etc/nginx/sites-enabled/

# Set up SSL with Let's Encrypt
echo "Setting up SSL certificate..."
echo "Please enter your domain name (e.g., example.com):"
read DOMAIN

sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m your-email@example.com

# Set up firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow 'OpenSSH'
sudo ufw enable

# Set up automatic PM2 startup
pm2 startup
pm2 save

# Set up automatic certificate renewal
echo "0 0,12 * * * root python3 -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | sudo tee -a /etc/crontab > /dev/null

echo "\n\nDeployment complete!"
echo "Your application should now be running at: https://$DOMAIN"
echo "\nTo check the application logs: pm2 logs oil-vessel-tracker"
echo "To restart the application: pm2 restart oil-vessel-tracker"
