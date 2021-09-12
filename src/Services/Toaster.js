import toast from "react-hot-toast";

const notify = (message, status) => {

    return toast.custom((t) => (
        <div
            className={`${ t.visible ? "animate-enter" : "animate-leave" } ${status === "success" ? "bg-white" : "bg-red-300"}
            max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5
            `}
        >
            <div className="flex-1 w-0">
                <div className="px-4 py-1">Cloud Shipping</div>
                <div className="p-4">{message}</div>
            </div>
            <div className="flex border-l border-gray-200" onClick={() => toast.dismiss(t.id)}>
                <button className="w-full border border-transparent rounded-none rounded-r-lg p-4 text-indigo-600 hover:text-indigo-500
                flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Close
                </button>
            </div>
        </div>
    ));

};

export { notify };
