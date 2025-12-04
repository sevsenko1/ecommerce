const brandName = "PlakLab";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-100 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {brandName}. Analog koleksiyoncular için seçilmiş baskılar.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-900">
            Teslimat & iade
          </a>
          <a href="#" className="hover:text-slate-900">
            AAA mastering sözü
          </a>
          <a href="#" className="hover:text-slate-900">
            İletişim
          </a>
        </div>
      </div>
    </footer>
  );
};

