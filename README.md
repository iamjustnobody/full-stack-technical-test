# Full Stack Technical Test

## The Challenge

Build a modern events platform that solves common challenges faced by organizations managing events in **1 hour**.

This test evaluates your ability to:

- Leverage AI tools effectively for rapid development
- Solve ambiguous requirements with creative solutions
- Build full-stack functionality under time constraints
- Demonstrate modern frontend engineering skills

**Good luck! Remember: we're evaluating your problem-solving approach and AI collaboration skills, not perfection. Use your best judgment and document your assumptions** 🚀

## Before You Start

### Fork This Repository

1. **Fork this repository** using the "Fork" button (top right)
   - Do NOT use "Download" or clone without forking
2. Work in your forked repository
3. Commit with clear START and SUBMISSION messages
4. Submit your fork URL via email once complete

### Time & Tracking

- **Implementation time:** 1 hour (tracked via git commits)
- **Documentation time:** Additional time allowed for README updates
- **Honesty policy:** You can read requirements, review the API documentation and backend architecture/implementation beforehand, but once ready to start implementation please create the tracking commit and try complete within 1 hour. We advise ensuring the API and API key works as expected before starting.

### Technical Requirements

- **Frontend:** React (required) + your choice of other tools
- **AI Tools:** Any models/assistants allowed and highly encouraged
- **API:** Lightweight API provided with shared API key
- **Deployment:** Any platform (API runs on AWS)

### Git Timestamp

```bash
1. Fork this repository
2. First commit: "START: Beginning 1-hour test"
3. Work for exactly 1 hour with frequent commits
4. Final commit: "SUBMISSION: 1-hour complete"
```

## 📋 Core Requirements (Required)

### Must Have:

1. **Events listing page** with basic filtering and search
2. **Event detail pages** with registration functionality
3. **Responsive design** for mobile and desktop
4. **Working deployment** with shareable URL

## 🚀 Bonus Features (Optional)

**Quality over quantity** - pick one bonus feature that interests you most:

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

### Required:

- **GitHub repository** (this fork) with your solution
- **Working deployed URL**
- **Updated README** (below) documenting your approach

### Update This README:

#### 🔗 Deployed URL

**Github Repo:** https://github.com/iamjustnobody/full-stack-technical-test
**Live Demo:** https://full-stack-technical-test-sand.vercel.app/

#### ⚡ My Approach

**Technology Choices:**

- React, Vite, TypeScript, Tailwind v4 + shadcn, TanStack Query (React Query) + Hook Form + Zod, React Router Dom, react-error-boundary, custom hooks - providing a scalable, type-safe, and reactive architecture suitable for dynamic data fetching and filtering while maintaining a clean developer experience.

**AI Tool Usage:**

- ChatGPT & Copilot & VS code build in AI - for debugging & suggestingn best practices & tools/stack

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
