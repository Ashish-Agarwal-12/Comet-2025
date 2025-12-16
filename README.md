# CoMeT2025 - Cognizant Leadership Summit

A premium, single-page corporate event website for CoMeT2025, built with Next.js 14, Tailwind CSS, GSAP animations, and Supabase.

## 🌟 Features

- **Cosmic Theme**: Dark gradient backgrounds with subtle star fields and comet trail effects
- **GSAP Animations**: Smooth, executive-friendly scroll-triggered animations
- **Responsive Design**: Fully optimized for all device sizes
- **Supabase Integration**: Real-time feedback collection and storage
- **Accessibility**: WCAG compliant with reduced motion support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for feedback functionality)

### Installation

1. Clone the repository:
```bash
cd "comet 2025"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase table:

Run this SQL in your Supabase SQL Editor:
```sql
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON feedback
  FOR INSERT TO anon
  WITH CHECK (true);
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
comet-2025/
├── app/
│   ├── api/
│   │   └── feedback/
│   │       └── route.ts      # Feedback API endpoint
│   ├── globals.css           # Global styles & animations
│   ├── layout.tsx            # Root layout with fonts
│   └── page.tsx              # Main page component
├── components/
│   ├── Hero.tsx              # Hero section with comet animations
│   ├── Header.tsx            # Sticky navigation header
│   ├── AgendaTimeline.tsx    # Timeline with scroll animations
│   ├── QuizSection.tsx       # External quiz link section
│   ├── FeedbackSection.tsx   # Supabase-connected form
│   └── Footer.tsx            # Footer with branding
├── data/
│   └── agenda.json           # Agenda items data
├── lib/
│   └── supabase.ts           # Supabase client configuration
└── public/                   # Static assets
```

## 🎨 Customization

### Updating Agenda
Edit `data/agenda.json` to modify the event schedule:
```json
{
  "agenda": [
    {
      "id": 1,
      "time": "09:00 AM",
      "title": "Session Title",
      "description": "Session description",
      "speaker": "Speaker Name"
    }
  ]
}
```

### Changing the Quiz Link
Update the `mentimeterUrl` variable in `components/QuizSection.tsx`:
```typescript
const mentimeterUrl = 'https://your-mentimeter-link.com'
```

### Theme Colors
Modify colors in `tailwind.config.ts`:
```typescript
colors: {
  cosmic: { ... },
  comet: { ... },
  cognizant: { ... },
}
```

## 🔧 Animation Guidelines

All animations follow executive-friendly principles:
- **Easing**: Only `power2` and `power3` for smooth, professional feel
- **No bouncing**: Avoided elastic/bounce effects
- **Performance**: Hardware-accelerated transforms only
- **Reduced motion**: Respects user preferences via `prefers-reduced-motion`

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Build for Production

```bash
npm run build
npm start
```

## 📝 License

© 2025 Cognizant. All rights reserved.

---

Built with ❤️ for CoMeT2025

