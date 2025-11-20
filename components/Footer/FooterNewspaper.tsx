export default function FooterNewsletter() {
  return (
    <div className="mt-10">
      <h3 className="font-semibold mb-4">Join Our Creative Community</h3>
      <div className="flex gap-3 mt-3">
        <input 
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded bg-white text-black w-full"
        />
        <button className="bg-[#876A5C] text-white px-6 py-3 rounded">
          Subscribe
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        No spam. Just handcrafted goodness.
      </p>
    </div>
  );
}
