
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Topics from "./pages/Topics";
import Quiz from "./pages/Quiz";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import UnlockPremium from "./pages/UnlockPremium";
import PublicProfile from "./pages/PublicProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:topicId" element={<Quiz />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/unlock-premium" element={<UnlockPremium />} />
          <Route path="/profile/:username" element={<PublicProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
