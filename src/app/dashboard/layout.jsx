
import NavigationPage from "@/components/Navbar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">

        <body
          className={''}
        >
          <NavigationPage />
          {children}
        </body>
    </html>
  );
}
