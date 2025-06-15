const ConfirmModal = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow w-80">
            <p className="mb-4">{message}</p>
            <div className="flex justify-end gap-3">
                <button onClick={onCancel} className="px-4 py-2 border">Cancel</button>
                <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2">Delete</button>
            </div>
        </div>
    </div>
);
export default ConfirmModal;
