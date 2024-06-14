import Menu from '../_components/Menu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
