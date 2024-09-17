---
title: Shift Left
type: blog
subtitle: How I think about building
description: 
date: 2024-09-11
tags:
  - data
  - app-dev
  - analytics
---

I was invited onto a podcast recently, and preparing for it got me to put some thoughts down on paper about what it means to "shift left." I'm sure there are many contexts where this could apply, but in this article I'm specifically talking about application development. And more specifically, developing applications with analytics in mind.

## What does "shift left" mean

**Shift left** is simply a term I heard sometime in the past year to refer to thinking about analytics earlier in the process of application development. I think the first person I heard it from was [Joe Reis](https://www.linkedin.com/in/josephreis){target="_blank"} during a call I was on with he and [Bill Inmon](https://www.linkedin.com/in/billinmon){target="_blank"}. **Moving upstream** and **designing with the end in mind** are other ways I've used to describe this before, but this term is as good as any. Left and right are used in relation to a timeline that begins with data creation, and moves to the right as you get further away from this point. It's simplest to think about in terms of time, but actually makes more sense to think about moving right as gaining complexity.
::clickable-image
---

src: images/shift-left/shift-left.png
alt: Timeline
caption: Analytics as a function of time, complexity, and sanity. Choose the representation that works best for what you're optimizing for
---
::
Up until relatively recently, it wasn't common place to build bespoke software for your business. Commercial software was bought for a specific use case and configured for your business as best as possible. It might not be a perfect fit, but you would get it close enough. Another area of the business would do the same: find the right piece of software for their use case, and make it work as best as possible.

While this worked without a large headache for the business as individual parts, trying to make sense of the business as a whole was fraught with inconsistencies in the data. Both [ontology and taxonomy](https://www.earley.com/insights/what-difference-between-taxonomy-and-ontology-it-matter-complexity){target="_blank"} would diverge, and analysts would work endlessly in spreadsheets to present stale insights to executives once a quarter. In comes the role of the data warehouse.

The data warehouse was conceptualized as a time-variant, non-volatile store to integrate the business's data, using the terms of the business. [There is a mountain of information](https://en.wikipedia.org/wiki/Data_warehouse){target="_blank"} on this topic just a search away, and I'm sure I'll end up butchering the definition anyway. I am a huge proponent of the data warehouse, and it still plays an important role in the business. [Until we all follow Klarna's lead](https://www.msn.com/en-us/money/companies/klarna-shuts-down-salesforce-as-service-provider-workday-to-meet-same-fate-amid-ai-initiatives/ar-AA1pAuaH){target="_blank"}, the data warehouse will persist.
::clickable-image
---

src: images/shift-left/data-warehouse-good.png
alt: Tradition data warehouse integration
caption: Simplified enterprise data warehouse.
---
::
 With transformations defined before data is viewed by analysts, consistent data is prepared for business use without intervention. Sounds like a perfect outcome. Except data isn't always consistent. And every step to the right adds another failure point. And the need for orchestration and coordination. But it's still none of these issues that cause me to take pause when I hear startups needing [analytics engineering](https://www.getdbt.com/what-is-analytics-engineering){target="_blank"} for their own data sources.

For me, the problem only arises here when we start introducing a requirement of the full data warehouse pipeline for custom business software. That is, we made the software, we own all aspects of its implementation, and *we still don't get to have low-complexity analytics*. I have seen time and time again where organizations are opting in to complexity down the road rather than making good design decisions up front, or being willing to have an engineering culture that embraces an evolving system. I have even been a participant in enabling engineering teams to eschew quality data models up front with the promise of the data team able to play hero. I know first hand how far off the deep end this can lead a technology organization.
::clickable-image
---

src: images/shift-left/data-warehouse-ugly.png
alt: Enterprise EDW pipeline for a single, bespoke application
caption: Data warehouse done wrong. This is not what we're after
---
::
I have even been a participant in enabling engineering teams to eschew quality data models up front with the promise of the data team able to play hero. Where even operation and management reporting is a day old. I know first hand how far off the deep end this can lead a technology organization.
::clickable-image
---

src: images/shift-left/data-warehouse-bad.png
alt: A very bad implementation of analytics
caption: Pride comes before the fall. Learn from my hubris, don't let your organization get here.
---
::
## Benefits of shifting left

Now, this doesn't suggest that transformation and aggregation are totally unnecessary in applications developed with an analytics-first mindset. Data is interesting when we aggregate it. It's interesting when we transform and enrich it. These interventions are enormous drivers of value. Data teams still have a very important role in these applications.
::clickable-image
---

src: images/shift-left/modern-analytics.png
alt: Event-driven analytics
caption: Find analytics nirvana, and strive for event-driven architectures
---
::
But by shifting left, it simply means we are getting to skip to these more interesting pieces of data and analytics rather than get hung up on the predetermined translations. That we can generate and collect events across different applications in the ecosystem, and be able to correlate events with each other. Or that these events can even be sent between systems, capitalizing on value that is otherwise lost from [perishable data](https://csrc.nist.gov/glossary/term/perishable_data){target="_blank"}. PostHog has a well documented story on how they were able to transform into an event-driven application and gain realtime analytics for both themselves and their customers [using ClickHouse that is worth a read](https://posthog.com/blog/how-we-turned-clickhouse-into-our-eventmansion){target="_blank"}.

You may think "well I'm not generating millions of events, this doesn't seem to apply to me." And in reality, I wouldn't try to push an event architecture into a system without looking at the whole picture either. But events are not the only benefit here. Let's describe a couple simple use cases **[embedded analytics](https://www.metabase.com/learn/metabase-basics/embedding){target="_blank"}**.
::clickable-image
---

src: images/shift-left/embedded-analytics.png
alt: Simple embedded analytics
caption: 
---
::
### Embedded: Customer Analytics

Recently, I met with a potential client that had a need to reduce the time between when their customers used their application, and when they could get a real analytics dashboard to view their outcomes over time. The application gave transactional reports at an individual level (*read: student viewing their own report card*), but no overall report for a cohort or a view of performance over time (*read: superintendent evaluating schools against each other, and over time*). To get this information, the team creates dashboards in a third party enterprise reporting tool, and then schedules time to discuss. 

For me, this is a perfect scenario for embedded customer analytics. With low-volume, non-volatile data being the core of this product, this could be achieved directly on top of well modeled application data, and delivered to customers instantly. There are even solutions out there that bridge the gap between custom developed charts and data visualization tools like Tableau. I'm a big advocate of [Metabase](https://www.metabase.com/product/embedded-analytics){target="_blank"} and used this in a demo I created for this client. But this feature is now common place among most dashboard tooling out there right now.

### Embedded: Internal Analytics

Even without delivering analytics to customers, a shift-left mindset gets you answers to your business questions much faster. Semantic models and cubes can be configured in reporting tools directly on your data (or more likely, a read-only replica) and replace ad-hoc SQL queries. Get your data in the hands of curious minds as soon as you create it, and see what comes of the exploration.

## If this sounds relevant...

If any of the analytics woes ring close to home, or if you think there might be a use case for your business or application, shoot me a message on LinkedIn. I'm more than willing to help you craft a business case, or at the very least get you pointed in the right direction. If there is an opportunity to provide formal services for your business, I'd love find a way to work with more businesses on their analytics journey, and push more folks to shift left.

If reaching out directly sounds painful, just post something on LinkedIn and ask for help. I've seen the most well known data people comment directly on open ended questions through LinkedIn and help out. I've reached out to the likes of the OG Bill Inmon before and received a same-day response. It's more than people being willing to offer an opinion, I feel people actually want to help out those who ask.



[Patrick](https://www.linkedin.com/in/hennesseypatrick/){target="_blank"}