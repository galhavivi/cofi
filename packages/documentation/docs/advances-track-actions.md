---
id: track
title: Track Actions
sidebar_label: Track Actions
---

Cofi's Form [hooks](hooks.html) exposes [afterAction](hooks#afteraction) hook among others. 
Use this hook that gets args such as action type and data - to track user actions on the form.

### Example 

 ```javascript
 import TrackService from './TrackService';

const resources = {
  // ...
  hooks: {
    afterAction: ({ type, data}) => {
      TrackService.sendToGoogleAnalytics({ type, data });
    },
  },
};
 ```