// NPM Module
import toast from "react-hot-toast";
import logoImage from "src/Assets/CLOUDCOLOR-EPS-CS6-ai (2) 1.png";

const notify = (message, status) => {
    return toast.custom((t) => {
        return (
            <div
                className={`${ t.visible ? "animate-enter" : "animate-leave" } ${status === "success" ? "bg-white" : "bg-red-300"}
                max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5
                `}
            >
                <div className="flex-1 w-0 flex flex-col">
                    <div className="p-4 text-sm font-medium border-gray-200 border-b-2 flex items-center text-white" style={{ backgroundColor: "#361999", borderRadius: "2.5% 0 0 0" }}>
                        <img src={logoImage} alt="" style={{ maxHeight: "25px", maxWidth: "45px" }}/> Cloud Shipping Notification
                    </div>
                    <div className="text-xs p-4 flex-grow">{message}</div>
                </div>
                <div className="flex border-l border-gray-200" onClick={() => toast.dismiss(t.id)}>
                    <button className="w-full border border-transparent rounded-none rounded-r-lg p-4 text-indigo-600 hover:text-indigo-500
                    flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => toast.dismiss(t.id)}>
                        Close
                    </button>
                </div>
            </div>
        )
    })
};

export { notify };
