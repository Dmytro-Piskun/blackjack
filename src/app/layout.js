
import "./globals.css";

export const metadata = {
  title: "Blackjack",
  description: "The game of daily blackjack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
