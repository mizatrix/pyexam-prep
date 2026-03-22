export default function Footer() {
  return (
    <footer className="border-t border-[rgba(114,220,255,0.1)] bg-[#080c18] py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-[#00d2ff] font-bold text-lg mb-1">PyExam Prep</p>
          <p className="text-[#9ca3af] text-sm">
            BIS Introduction to Programming (BIS2108)
          </p>
          <p className="text-[#6b7280] text-xs mt-1">
            MSA University — College of Management &amp; Technology
          </p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-[#9ca3af] text-sm">
            Created by <span className="text-[#00d2ff]">Dr. Moataz Samy</span>
          </p>
          <p className="text-[#6b7280] text-xs mt-1">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
