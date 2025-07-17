import Switch from "./switchTailwind";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Taskify</h1>
      <Switch />
    </header>
  );
};

export default Header;