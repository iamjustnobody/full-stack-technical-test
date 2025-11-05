# Full Stack Technical Test

## 📋 Core Requirements (Required)

### Must Have:

1. **Events listing page** with basic filtering and search
2. **Event detail pages** with registration functionality
3. **Responsive design** for mobile and desktop
4. **Working deployment** with shareable URL

## 🚀 Bonus Features (Optional)

**Quality over quantity** - pick one bonus feature

### 📝 Dynamic Event Categories & Content

- Event categories with configurable descriptions, colors, icons
- Marketing copy and promotional banners managed separately from code
- Demonstrate separation of developer-defined structure vs content-managed data
- Show how non-technical staff could manage this content

### 🎯 Event Capacity & Waitlists

- Events have maximum capacity (some are full)
- Users can join waitlists for full events
- Show capacity status (Available/Few spots left/Full/Waitlist)
- May require extending the provided API

### 💾 My Events Feature

- Track events that users have registered for
- **Challenge:** No user account system exists - be creative!
- Consider localStorage, email lookup, session tokens, or other approaches
- Handle edge cases (browser clearing, multiple devices, etc.)

## 🛠 What's Provided

### API Base URL

```
https://x15zoj9on9.execute-api.us-east-1.amazonaws.com/prod/events
```

### API Endpoints

- `GET /events` - List all events with filtering
- `GET /events/:id` - Get event details
- `POST /events/:id/register` - Register for an event

## API Documentation

The complete API specification is available in OpenAPI 3.0 format: [openapi.yaml](https://github.com/HultTechnology/full-stack-tech-test-backend/blob/main/openapi.yaml)

**View the interactive documentation:**

1. Go to [Swagger Editor](https://editor.swagger.io/)
2. Copy the contents of [openapi.yaml](https://github.com/HultTechnology/full-stack-tech-test-backend/blob/main/openapi.yaml)
3. Paste into the editor to see interactive API documentation

### Sample Data

The API includes 20+ sample events with:

- Different dates and times
- Various categories and types
- Mix of online and physical locations
- Rich content for testing different scenarios

### API Code

See [full-stack-tech-test-backend](https://github.com/HultTechnology/full-stack-tech-test-backend)

## 📦 Deliverables

#### 🔗 Deployed URL

- **Github Repo:** https://github.com/iamjustnobody/full-stack-technical-test
- **Live Demo:** https://full-stack-technical-test-sand.vercel.app/

#### ⚡ My Approach

**Technology Choices:**

- React, Vite, TypeScript, Tailwind v4 + shadcn, TanStack Query (React Query) + Hook Form + Zod, React Router Dom, react-error-boundary, custom hooks - providing a scalable, type-safe, and reactive architecture suitable for dynamic data fetching and filtering while maintaining a clean developer experience.

**AI Tool Usage:**

- ChatGPT & Copilot & VS code build in AI - for debugging, suggestingn best practices & tools & tech stack

**Bonus Feature (if implemented):**

- **My Events Feature** from local storage
- (plus some of **Event Capacity & Waitlists** - since there's no dedicated waitlist POST API, I just simulated the waitlist behavior by using the register POST API instead. This will also trigger the EVENT_FULL error, which reflects that the event is at capacity and users can only join the waitlist)

**Key Design Decisions:**

- Data auto fetch upon filter change (vs manual control via button) with inifite scrolling (& avoid duplicate api calls on mount);
- Error handling on routes & api call inside each page;
- etc

#### 🚀 Getting Started

<!-- Add setup instructions for running locally -->

```bash
# Installation
npm install

# Development (Run locally)
npm run dev

# Build
npm run build
```
