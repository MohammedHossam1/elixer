# Deployment Guide for elixirbeautys.com

This document describes how the **elixirbeautys.com** site is deployed on this VPS.

It covers:

- Cloning and building the project
- Nginx configuration
- DNS configuration (linking the domain to the VPS)
- Enabling HTTPS with Lets Encrypt (Certbot)

---

## 1. Clone the repository

Project repository:

- GitHub: `https://github.com/MohammedHossam1/elixer.git`

On the server, the project lives at:

- `/var/www/elixirbeautys.com`

To clone it (fresh setup):

```bash
cd /var/www
sudo git clone https://github.com/MohammedHossam1/elixer.git elixirbeautys.com
cd /var/www/elixirbeautys.com
```

> Note: In this deployment, the folder was originally cloned as `/var/www/elixer-pi.qadi-tech.com` and then renamed to `/var/www/elixirbeautys.com`.

---

## 2. Install dependencies & build the app

This is a Vite + React + TypeScript SPA.

From inside the project folder:

```bash
cd /var/www/elixirbeautys.com
npm install
npm run build
```

This produces a production-ready static build in:

- `/var/www/elixirbeautys.com/dist`

---

## 3. Nginx configuration

The site is served by **nginx** directly from the built `dist` directory.

### 3.1 Server block

Nginx config file:

- `/etc/nginx/sites-available/elixirbeautys.com`

Contents:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name elixirbeautys.com;

    root /var/www/elixirbeautys.com/dist;
    index index.html;

    client_max_body_size 20m;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 3.2 Enable the site and reload nginx

Create a symlink into `sites-enabled`, test the configuration, and reload nginx:

```bash
sudo ln -s /etc/nginx/sites-available/elixirbeautys.com \
           /etc/nginx/sites-enabled/elixirbeautys.com

sudo nginx -t
sudo systemctl reload nginx
```

At this point, HTTP (port 80) should serve the app from `dist/` once the domain DNS points to this VPS.

---

## 4. DNS: Link elixirbeautys.com to this VPS

To link the domain `elixirbeautys.com` to this server, configure DNS **A records** at your domain/DNS provider.

### VPS IP address

- Server IP: `147.93.56.130`

### Recommended records

In your DNS management panel (where `elixirbeautys.com` is registered), add or edit these records:

1. **Root domain**
   - Type: `A`
   - Name/Host: `@` (or leave blank, depending on provider)
   - Value: `147.93.56.130`
   - TTL: default (e.g. 300 or 600 seconds)

2. **www subdomain (optional but recommended)**
   - Option A (CNAME):
     - Type: `CNAME`
     - Name/Host: `www`
     - Value: `elixirbeautys.com`
   - Option B (A Record):
     - Type: `A`
     - Name/Host: `www`
     - Value: `147.93.56.130`

Once DNS changes propagate (can take a few minutes to a few hours), visiting `http://elixirbeautys.com` should hit this VPS and serve the site via nginx.

---

## 5. Enable HTTPS (SSL) with Lets Encrypt / Certbot

We use **Certbot** with the nginx plugin to issue and configure SSL certificates.

### 5.1 Install Certbot (if not already installed)

On Ubuntu, Certbot is usually installed via `snap`. If it is not installed yet, use:

```bash
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

(Skip this step if Certbot is already installed and working for other sites.)

### 5.2 Issue the certificate for elixirbeautys.com

Run the following (replace with the real email you want to use for expiry notifications):

```bash
sudo certbot --nginx \
  -d elixirbeautys.com \
  -m you@example.com \
  --agree-tos \
  --redirect
```

What this does:

- Obtains a Lets Encrypt SSL certificate for `elixirbeautys.com`.
- Automatically updates the nginx config to:
  - Add `listen 443 ssl;` and SSL certificate paths.
  - Redirect HTTP (`http://`) to HTTPS (`https://`).
- Reloads nginx to apply the new configuration.

### 5.3 Renewal

Certbot sets up automatic certificate renewal.

You can test renewal with:

```bash
sudo certbot renew --dry-run
```

---

## 6. Updating the app in the future

When you make changes to the app and want to deploy them:

```bash
cd /var/www/elixirbeautys.com
sudo git pull origin main
npm install          # if dependencies changed
npm run build

sudo nginx -t
sudo systemctl reload nginx
```

As long as DNS and SSL are already set up, the new build will be served immediately.

