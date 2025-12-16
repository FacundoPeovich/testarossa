export default function ItalianFlag({ className = "" }) {
  return (
    <div className={`flex h-1 w-24 overflow-hidden rounded-sm ${className}`}>
      <div className="w-1/3 bg-[#009246]" />
      <div className="w-1/3 bg-white" />
      <div className="w-1/3 bg-[#ce2b37]" />
    </div>
  );
}
