# NoteGenius - AI-Powered Notes App

NoteGenius is a modern note-taking application that combines the power of AI with a clean, intuitive interface. Create, organize, and automatically summarize your notes with the help of artificial intelligence.

## Features

- **Smart Note Taking**: Create and organize notes with a beautiful, intuitive interface
- **AI Summarization**: Automatically generate concise summaries of your notes using AI
- **User Authentication**: Secure login with email/password and Google authentication
- **Real-time Updates**: Instant updates and synchronization across devices
- **Dark Mode**: Built-in dark mode support for comfortable viewing
- **Responsive Design**: Fully responsive interface that works on all devices

## Tech Stack

- **Frontend**: Next.js 13, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Authentication)
- **State Management**: TanStack Query (React Query)
- **AI Integration**: OpenAI API for note summarization
- **Styling**: Tailwind CSS with custom theming
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- A Supabase account
- A DeepSeek API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notegenius.git
   cd notegenius
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_OPENAI_API_KEY=your_oepnai_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

The application uses Supabase as its database. The schema includes:

- `profiles` table for user information
- `notes` table for storing notes with AI summaries
- Row Level Security (RLS) policies for data protection

### Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_OPENAI_API_KEY`: Your DeepSeek API key for AI summarization

## Features in Detail

### Authentication

- Email/Password authentication
- Google OAuth integration
- Protected routes and API endpoints
- User profile management

### Note Management

- Create, read, update, and delete notes
- Rich text editing
- Automatic AI summarization for longer notes
- Real-time updates using React Query

### AI Summarization

- Automatic summarization for notes over 100 characters
- Manual summary generation option
- Fallback summarization when API is unavailable

## Deployment

The application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
