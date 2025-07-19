
import NavigationPage from "@/components/Navbar";


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark antialiased">

        <body
          className={''}
        >
          <NavigationPage />
          {children}
        </body>
    </html>
  );
}
