// components/Layout.jsx
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;