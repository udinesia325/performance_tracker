function Header({resetState, isCent, setIscent}) {
    return (
        <div className="container mx-auto mt-5 p-5 bg-white/45 border border-gray-200 rounded-lg shadow-sm flex align-center justify-center gap-10">
            <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isCent} onChange={() => setIscent(!isCent)} className="sr-only peer" />
                <span className="me-3 text-sm font-medium text-gray-900 ">
                    Standard
                </span>
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-400 "></div>
                <span className="ms-3 text-sm font-medium text-gray-900 ">
                    Cent
                </span>
            </label>
            <button className="bg-indigo-500 rounded px-3 py-2 text-white hover:bg-indigo-400" onClick={resetState}>Re Upload File</button>
        </div>
    )
}

export default Header
