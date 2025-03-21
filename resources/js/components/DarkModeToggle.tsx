import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle() {
  const { appearance, updateAppearance } = useAppearance();

  const toggleTheme = () => {
    updateAppearance(appearance === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className="rounded-lg p-2 transition-colors duration-300">
      {appearance === 'dark' ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-gray-800 dark:text-gray-200" />}
    </button>
  );
}
