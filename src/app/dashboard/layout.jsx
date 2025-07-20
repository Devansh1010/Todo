
import NavigationPage from "@/components/Navbar";


export default function RootLayout({ children }) {
  return (
    <div className="">
      <NavigationPage />
      {children}
    </div>

  );
}
