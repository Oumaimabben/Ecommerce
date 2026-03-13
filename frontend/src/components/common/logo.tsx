const Logo = ({ className = "" }) => {
  return (
    <a href="/" className={`flex items-center ${className}`}>
      <img src="/logo.jpeg" alt="Logo" className="w-30 h-20 object-contain" />
      <div className="flex flex-col items-start -mt-2">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Porter+Sans+Block&display=swap');
        `}</style>
        
        <div className="font-['Porter_Sans_Block'] text-3xl font-bold leading-tight">
          <span className="text-black">C</span>
          <span className="text-black">K</span>
          <span className="text-black">F</span>
        </div>
        
        <div className="font-['Porter_Sans_Block'] text-xs font-medium tracking-wider text-black">
          EQUIPEMENTS        
          </div>
      </div>
    </a>
  )
}

export default Logo