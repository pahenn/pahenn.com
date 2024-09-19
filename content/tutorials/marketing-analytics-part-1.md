---
title: Marketing Analytics - Part 1
type: tutorial
subtitle: Level up your growth marketing operation
description: 
date: 
tags:
  - analytics
  - data
  - app-dev
  - nuxt
  - nuxt-ui
  - umami
  - metabase
  - oss
---

One thing I've come across lately in businesses in the disconnect between the marketing funnel and the rest of the business sales funnel. I've seen this not only in beginning stage start-ups (where you might imagine this would be easily occurring) but also at 7-figure solo-prenueur and SMBs, and even at late-stage unicorns. In fact, the smallest business are sometimes the best at maintaining this correlation as they manage the majority of their business in a single tool.

Once a business grows, and there is turnover in consultant relationships, or heads of departments, or simply an easier tool to manage a specific layer of your process, the marketing funnel and sales funnel begin to drift. In this multi-part tutorial, we'll walk through 

 - Installing [Umami Analytics](https://umami.is/){newTab=true}, a lightweight web analytics, for tracking your inbound traffic
 - What UTM codes are and how to use them for understanding where traffic is coming from
 - Recording custom events on your site to understand how users are interacting with your content
 - Building custom dashboards in [Metabase](https://metabase.com/){newTab=true}, and open source analytics and dashboarding tool, allowing us to walk through getting the data out of Umami when we want to correlate it to other data in your ecosystem
 - And finally, associating a visitor with their purchase to be able to know not only what drives traffic, but what drives sales

And what's better-yet, we'll do this all locally, so no new accounts need to be setup, no costs incurred, just pure and simple learning. Anything we talk about has a premium offering, and I encourage you to patronize these companies and use their cloud offerings. The fact that we're able to use the tools to teach like this is an incredible service they provide, an I applaud them for that.

Umami provides even more features if you are looking for metrics like visitor retention, user journeys, and goal tracking, that I won't get too far into besides pointing them out. I encourage you to check out their software, and reach out to [me on LinkedIn](https://www.linkedin.com/in/hennesseypatrick/){newTab=true} if you're interested in having some help getting it setup

## A starter project

In order to walk through anything, I'll need a starter project to begin with. If you have a website already that you want to track and correlate marketing and sales analytics, I encourage you to follow along with your own site. 

Since I'm a big fan of [Nuxt] and the Nuxt UI team, I'm going to use their [template for a SaaS](https://github.com/nuxt-ui-pro/saas){newTab=true} marketing site as my example. It gives us enough features already in their demo to cover our use cases. These templates are a premium feature of Nuxt UI, so you have to purchase a license to use it. I really like them, I recommend purchasing a license and supporting their work.

Let's start by generating a new project from their template

``` [add umami module]

npx nuxi init marketing-analytics-tutorial -t github:nuxt-ui-pro/saas

```

Once you follow the CLI instructions, you can navigate into that directory and test your project.

```
cd marketing-analytics-tutorial
pnpm dev
```

After navigating to `http://localhost:3000/`, you should see the the following screen (as of September 2024 at least)

::clickable-image
---

src: images/marketing-analytics-part-1/nuxt-ui-saas-starter-home.png
alt: Nuxt UI SaaS Starter home page
caption: This serves as a great starter to demonstrate some of the functionality we're going to showcase. Feel free to follow along with any site your comfortable with.
---
::

Great, now we have a professionally built site, ready to drive traffic to!

## Self-hosting and setup

This is really a side track on the point of the tutorial, but I thought I would address how much self-hosting has unlocked my own journey around testing, experimentation, and even sales. I use a free software called [Coolify](http://coolify.io){newTab=true} installed on a VPS from [Hetzner](https://www.hetzner.com/){newTab=true}, which is very inexpensive. I host all my projects here, with their backup service, for around $60 a month. You could do it for much cheaper if you had only a few instances up and running.

The reason I bring this up is that we're going to host tools locally suing Docker and Docker Compose, and becoming familiar with these tools enables you to become a self-hosting genie with a tool like Coolify. I am more than willing to help people set this up if there is a desire, but the docs Coolify provides are already great.

## Containers

A second quick side track, is that if you plan on following along with the tutorial, and don't plan on creating cloud accounts for any of the tools we're using, then you'll need a Docker client installed. I use [OrbStack](https://orbstack.dev/){newTab=true} personally, and [Docker Desktop](https://www.docker.com/products/docker-desktop/){newTab=true} is very popular too.

## Umami Analytics

Great, now that we're done with our side-tracking, let's get back on track. We have our website up and running, now we need to track our activity. Let's start up Umami.

First, create a a new directory called `external-services` in your project directory and add a `docker-compose.yml` file and a `.env` file. This isn't strictly best practice from a monorepo standpoint, but it should work for the purposes of this tutorial.

Copy the following into `docker-compose.yml`

```yml [docker-compose.yml]
services:
  umami:
    image: "ghcr.io/umami-software/umami:postgresql-latest"
    restart: always
    environment:
      - "DATABASE_URL=postgres://${SERVICE_USER_POSTGRES}:${SERVICE_PASSWORD_POSTGRES}@postgresql:5432/${POSTGRES_DB}"
      - DATABASE_TYPE=postgres
      - APP_SECRET=$SERVICE_PASSWORD_64_UMAMI
    ports:
      - "8080:3000"
    depends_on:
      postgresql:
        condition: service_healthy
    healthcheck:
      test:
        - CMD
        - curl
        - "-f"
        - "http://127.0.0.1:3000/api/heartbeat"
      interval: 5s
      timeout: 20s
      retries: 10
  postgresql:
    image: "postgres:16-alpine"
    restart: always
    volumes:
      - "postgresql-data:/var/lib/postgresql/data"
    environment:
      - POSTGRES_USER=${SERVICE_USER_POSTGRES}
      - POSTGRES_PASSWORD=${SERVICE_PASSWORD_POSTGRES}
      - "POSTGRES_DB=${POSTGRES_DB:-umami}"
    healthcheck:
      test:
        - CMD-SHELL
        - "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}"
      interval: 5s
      timeout: 20s
      retries: 10
  pg_admin:
    image: "dpage/pgadmin4"
    ports:
      - "8000:3000"
    restart: always
    environment:
      - SERVICE_FQDN_PG_ADMIN
      - PGADMIN_DEFAULT_PASSWORD=${PGADMIN_DEFAULT_PASSWORD}
      - PGADMIN_DEFAULT_EMAIL=${PGADMIN_DEFAULT_EMAIL}
    volumes:
      - pgadmin-data:/var/lib/pgadmin
volumes:
  postgresql-data:
  pgadmin-data:
```

and copy this into you `.env` file

```
SERVICE_PASSWORD_64_UMAMI=umami_secret

SERVICE_USER_POSTGRES=pahenn_tutorial_user
SERVICE_PASSWORD_POSTGRES=pahenn_tutorial_password
POSTGRES_DB=umami

PGADMIN_DEFAULT_PASSWORD=super-secret-password
PGADMIN_DEFAULT_EMAIL=tutorial@pahenn.com
```

Feel free to change any credentials in here, and please do not use these in production. If you _are_ using Coolify already, much of this you're able to just 1-click deploy.

Open a new terminal and navigate to your `external-services` directory, and start your docker compose service stack

```
cd external-services
docker compose up
```

Now, test your Umami deployment at `http://localhost.com:8080/`. You should see the Umami login page.

::clickable-image
---

src: images/marketing-analytics-part-1/umami-login.png
alt: Umami login page
caption: Umami analytics, running locally, and ready to configure
---
::

The default `username` and `password` are `admin` and `umami`, respectively. In case that changes in the future and I don't update this tutorial, [check their docs](https://umami.is/docs/login){newTab=true}.

If you see this screen, you're in! We're ready to go to work!

::clickable-image
---

src: images/marketing-analytics-part-1/umami-blank-home.png
alt: Umami login page
caption: No pages setup yet, but we're just a few steps away
---
::

First, let's add our site to Umami. Click on the **Settings** link in navigation bar in the header, then **+ Add Website**. You should see this screen

::clickable-image
---

src: images/marketing-analytics-part-1/umami-register-site.png
alt: Umami login page
caption: These are the only two fields needed to configure a new site
---
::

Add the name and domain as shown above and save.

::clickable-image
---

src: images/marketing-analytics-part-1/umami-site-registered.png
alt: Umami login page
caption: Site registered
---
::

Now Umami knows to look for events from this site. Now we need to grab the site ID that Umami assigned us. Click the edit button next you the newly configured site, and copy the **Website ID** from this page. We'll need it in the next step.

::clickable-image
---

src: images/marketing-analytics-part-1/umami-website-id.png
alt: Umami login page
caption: No pages setup yet, but we're just a few steps away
---
::

Next, we need our site to send event over to it. There is a Nuxt module for Umami, so we'll just need to install and configure it. If you're using another framework, simply refer to Umami's docs on how to track your site.

From the console in your project, install the module.

```
npx nuxi@latest module add nuxt-umami@module
```

And update your nuxt.config.ts. Add the Website ID you just copied to the `id` key, and the address for you Umami instance for host. If you're running this locally along side of me, the host will be `http://localhost:8080`.

```
export default defineNuxtConfig({
  modules: ['nuxt-umami'],

  umami: {
    id: '555ee0f6-c974-4cc3-8862-b4dc337cc116',
    host: 'http://localhost:8080',
    autoTrack: true,
  },
});
```

Since we've also set `autoTrack` to `true`, we are ready to measuring visitors on our site. Ensure that Umami. It may be necessary to recycle the SaaS Starter template that we started towards the beginning of this tutorial to pick up changes in your Nuxt config. Or if you've already stopped it, let's start it back up.

```
pnpm dev
```

Now, let's see what we see in our Umami instance

::clickable-image
---

src: images/marketing-analytics-part-1/page-view-tracked.png
alt: Umami login page
caption: No pages setup yet, but we're just a few steps away
---
::

Success! We're tracking our visit! If you click around a bit and refresh Umami, you'll see that each page you're going to is tracked. We haven't had to add anything further to each page, and Umami is keeping tabs on our users' journeys.

::clickable-image
---

src: images/marketing-analytics-part-1/many-page-views.png
alt: Umami login page
caption: No pages setup yet, but we're just a few steps away
---
::

## Tracking Events

Oftentimes you'll want to know what a user is doing on your site that isn't just a page view. It might be which images your users are clicking on, or what article on your blog your users are subscribing from. Maybe we're tracking feature adoption, and want to know if users are using new functionality in your app. Good news, we can do all this with Umami as well.

Let's take on the example of knowing which page users are subscribing from. This is a real use-case for measuring the efficacy of your content marketing initiatives. First, we'll enable the `v-umami` directive for our Nuxt module. Add the `useDirective` key to `nuxt.config.ts`.

```
  umami: {
    id: '555ee0f6-c974-4cc3-8862-b4dc337cc116',
    host: 'http://localhost:8080',
    autoTrack: true,
    useDirective: true,
  },
```

Restart your site to make sure this is picked up by the server. We won't actually use this right away, but makes some activities down the road easier.

Now, open the footer component of your site at `app/components/AppFooter.vue`. This is where the subscribe form is rendered, and where we need to add our tracker code. This form triggers the function `onSubmit`, so that's where we are going to add our tracking. In order to track this custom event **and** identify an anonymous user, we need just 2 lines of code.
```ts
umIdentify({<identifier object>});
umTrackEvent("<event name>")
```

You can add them anywhere in the function. Here is my full `onSubmit` function

```ts
const route = useRoute();
function onSubmit() {
  loading.value = true;
  umIdentify({ email: email.value });
  umTrackEvent("subscribe", { url: route.path });

  setTimeout(() => {
    toast.add({
      title: "Subscribed!",
      description: "You've been subscribed to our newsletter.",
    });

    loading.value = false;
  }, 1000);
}
```

The user is providing their email to subscribe, so we'll pass that into the `umIdentify` function as an object with a key of `email`. We'll also track the subscribe event, and attach the path that we clicked it from. We're getting the route from the built-in Nuxt composable `useRoute`, and passing the path into `umTrackEvent`, naming the event "subscribe". 

And that's it. We now should be tracking this custom event **and** now can associate the viewing activity from the visitor ID assigned to this user with the email they've provided. This is the first peek into the correlation to sales that we started this tutorial talking about. Let's test it out: navigate to a blog article, scroll to the bottom, enter an email and click subscribe

::clickable-image
---

src: images/marketing-analytics-part-1/subscribe.png
alt: Umami login page
caption: No pages setup yet, but we're just a few steps away
---
::

Now let's see what we can see in Umami. Click on the **Events** tab from the site detail view

::clickable-image
---

src: images/marketing-analytics-part-1/subscribe-event-tracked.png
alt: Umami login page
caption: No pages setup yet, but we're just a few steps away
---
::

Ah ha! The subscribe event shows up here now. Click on the properties tab at the bottom, and then subscribe, and we can see the url property that we logged as well. As people subscribe from other pages, the donut chart will represent that.

::clickable-image
---

src: images/marketing-analytics-part-1/subscribe-page-tracked.png
alt: Umami login page
caption: No pages setup yet, but we're just a few steps away
---
::

Now click back on the activity tab and select the avatar next to "Triggered event **subscribe**"

::clickable-image
---

src: images/marketing-analytics-part-1/triggered-event-subscribe.png
alt: Umami login page
caption: No pages setup yet, but we're just a few steps away
---
::

And there we have it, our visitor now had an `email` property.

::clickable-image
---

src: images/marketing-analytics-part-1/user-identified.png
alt: Umami login page
caption: No pages setup yet, but we're just a few steps away
---
::

In the next tutorial, we'll create a Buy Button that will generate a record in a separate system, that we'll correlate back to the activity in Umami. Bridging this gap is not only important for identifying the effect that generated the initial sale, but also how often your customers are coming back and engaging in more content - a key indicator of predicting a possible upsell or churn customer. We'll also visualize this data in Metabase to customize our reporting.


Patrick