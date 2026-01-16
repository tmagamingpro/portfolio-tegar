export default function Modal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md text-center animate-pop">
        <h3 className="text-lg font-bold mb-2">
          Project Belum Tersedia 😅
        </h3>
        <p className="text-gray-600 mb-4">
          Maaf yaa~ project ini masih private atau sedang dikembangkan.
          Silakan cek project lainnya!!
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Oke
        </button>
      </div>
    </div>
  );
}
