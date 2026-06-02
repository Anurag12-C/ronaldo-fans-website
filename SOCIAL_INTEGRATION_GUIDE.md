# Social Media Integration Guide

## Overview
This guide explains how to integrate real social media data into your Cristiano Ronaldo fan website.

## 1. Instagram Integration

### Setup Steps
1. Go to [Instagram Graph API](https://developers.facebook.com/docs/instagram-graph-api)
2. Create a Facebook App and generate an access token
3. Get Cristiano's Instagram User ID: `25025320` (publicly available)

### Implementation
```javascript
const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
const instagramUserId = '25025320';

async function fetchInstagramPosts() {
    try {
        const response = await fetch(
            `https://graph.instagram.com/${instagramUserId}/media?fields=id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&access_token=${accessToken}`
        );
        const data = await response.json();
        displayInstagramFeed(data.data);
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
    }
}

function displayInstagramFeed(posts) {
    const feedContainer = document.querySelector('.feed-container');
    feedContainer.innerHTML = posts.map(post => `
        <div class="feed-item">
            <p class="feed-text">${post.caption}</p>
            <img src="${post.media_url}" alt="Post" class="feed-image">
            <div class="feed-stats">
                <span>❤️ ${post.like_count}</span>
                <span>💬 ${post.comments_count}</span>
            </div>
            <a href="${post.permalink}" target="_blank">View on Instagram</a>
        </div>
    `).join('');
}
```

## 2. Twitter/X Integration

### Setup Steps
1. Apply for [Twitter API v2 access](https://developer.twitter.com/en/docs/twitter-api)
2. Create an app and generate Bearer Token
3. Cristiano's Twitter handle: `@cristiano`

### Implementation
```javascript
const bearerToken = 'YOUR_TWITTER_BEARER_TOKEN';
const twitterHandle = 'cristiano';

async function fetchTwitterPosts() {
    try {
        const response = await fetch(
            `https://api.twitter.com/2/tweets/search/recent?query=from:${twitterHandle}&max_results=10&tweet.fields=created_at,public_metrics`,
            {
                headers: {
                    'Authorization': `Bearer ${bearerToken}`
                }
            }
        );
        const data = await response.json();
        displayTwitterFeed(data.data);
    } catch (error) {
        console.error('Error fetching tweets:', error);
    }
}

function displayTwitterFeed(tweets) {
    const feedContainer = document.querySelector('.feed-container');
    feedContainer.innerHTML = tweets.map(tweet => `
        <div class="feed-item">
            <p class="feed-text">${tweet.text}</p>
            <div class="feed-stats">
                <span>❤️ ${tweet.public_metrics.like_count}</span>
                <span>💬 ${tweet.public_metrics.reply_count}</span>
                <span>🔄 ${tweet.public_metrics.retweet_count}</span>
            </div>
            <small>${new Date(tweet.created_at).toLocaleDateString()}</small>
        </div>
    `).join('');
}
```

## 3. YouTube Integration

### Setup Steps
1. Go to [YouTube Data API](https://developers.google.com/youtube/v3)
2. Create a project and enable YouTube Data API v3
3. Generate an API key
4. Cristiano's YouTube Channel ID: `UCkF0qVdEy5H2_OW3PQFH-Gw` (example)

### Implementation
```javascript
const youtubeApiKey = 'YOUR_YOUTUBE_API_KEY';
const channelId = 'UCkF0qVdEy5H2_OW3PQFH-Gw';

async function fetchYoutubeVideos() {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&channelId=${channelId}&type=video&part=snippet&maxResults=6&order=date`
        );
        const data = await response.json();
        displayYoutubeVideos(data.items);
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
    }
}

function displayYoutubeVideos(videos) {
    const feedContainer = document.querySelector('.feed-container');
    feedContainer.innerHTML = videos.map(video => `
        <div class="feed-item">
            <h4>${video.snippet.title}</h4>
            <img src="${video.snippet.thumbnails.medium.url}" alt="Video" class="feed-image">
            <p>${video.snippet.description.substring(0, 100)}...</p>
            <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">Watch on YouTube</a>
        </div>
    `).join('');
}
```

## 4. Facebook Integration

### Setup Steps
1. Go to [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
2. Create an app and get an access token
3. Cristiano's Facebook Page ID: `107876532570619`

### Implementation
```javascript
const facebookAccessToken = 'YOUR_FACEBOOK_ACCESS_TOKEN';
const pageId = '107876532570619';

async function fetchFacebookPosts() {
    try {
        const response = await fetch(
            `https://graph.facebook.com/${pageId}/posts?fields=story,full_picture,created_time,likes.summary(true).limit(0),comments.summary(true).limit(0)&access_token=${facebookAccessToken}`
        );
        const data = await response.json();
        displayFacebookFeed(data.data);
    } catch (error) {
        console.error('Error fetching Facebook posts:', error);
    }
}
```

## 5. TikTok Integration

### Setup Steps
1. Apply for [TikTok API access](https://developers.tiktok.com/)
2. Note: TikTok API is more restrictive and mainly for business use
3. Alternative: Use unofficial libraries or embed TikTok videos directly

### Implementation (Direct Embed)
```javascript
function embedTikTokVideo(videoUrl) {
    const iframe = `<iframe src="${videoUrl}" width="100%" height="500" frameborder="0" allow="autoplay" allowfullscreen></iframe>`;
    return iframe;
}
```

## 6. Environment Variables

Create a `.env` file:
```
VITE_INSTAGRAM_ACCESS_TOKEN=your_token_here
VITE_TWITTER_BEARER_TOKEN=your_token_here
VITE_YOUTUBE_API_KEY=your_key_here
VITE_FACEBOOK_ACCESS_TOKEN=your_token_here
```

## 7. Security Considerations

### ⚠️ Important
- **NEVER** commit access tokens to GitHub
- Use environment variables
- Store sensitive data on backend
- Use CORS proxy if needed: `https://cors-anywhere.herokuapp.com/`
- Implement server-side API calls when possible

### Backend Setup Example (Node.js/Express)
```javascript
const express = require('express');
const app = express();
require('dotenv').config();

app.get('/api/instagram-feed', async (req, res) => {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    try {
        const response = await fetch(
            `https://graph.instagram.com/25025320/media?fields=id,caption,media_type,media_url&access_token=${accessToken}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## 8. Rate Limiting

Handle API rate limits:
```javascript
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.status === 429) {
                await delay(1000 * (i + 1));
                continue;
            }
            return response;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error);
        }
    }
    throw new Error('Max retries exceeded');
}
```

## 9. Caching

Implement caching to reduce API calls:
```javascript
const cache = new Map();
const CACHE_DURATION = 3600000; // 1 hour

async function fetchWithCache(key, fetchFunction) {
    if (cache.has(key)) {
        const { data, timestamp } = cache.get(key);
        if (Date.now() - timestamp < CACHE_DURATION) {
            return data;
        }
    }
    
    const data = await fetchFunction();
    cache.set(key, { data, timestamp: Date.now() });
    return data;
}
```

## 10. Testing

```javascript
// Test API connections
async function testApis() {
    console.log('Testing Instagram API...');
    try {
        await fetchInstagramPosts();
        console.log('✓ Instagram API working');
    } catch (error) {
        console.log('✗ Instagram API error:', error);
    }
    
    // Repeat for other platforms
}

// Run tests
testApis();
```

## Resources

- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-graph-api)
- [Twitter API v2 Docs](https://developer.twitter.com/en/docs/twitter-api)
- [YouTube Data API Docs](https://developers.google.com/youtube/v3)
- [Facebook Graph API Docs](https://developers.facebook.com/docs/graph-api)
- [TikTok API Docs](https://developers.tiktok.com/)

## Troubleshooting

### CORS Errors
Use a CORS proxy or implement backend API calls.

### Rate Limiting
Implement caching and request throttling.

### Token Expiration
Implement token refresh logic.

### Missing Data
Check API permissions and scopes.

---

For more help, visit the respective platform's developer documentation.