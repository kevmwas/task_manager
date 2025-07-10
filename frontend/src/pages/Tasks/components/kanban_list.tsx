const KanbanList = ({ task }) => {
    return (
        <div style={{ opacity: "0.8" }} className="relative p-5 bg-white border border-gray-200 task rounded-xl shadow-theme-sm dark:border-gray-800 dark:bg-white/5" draggable="true" data-handler-id="T156">
            <div className="space-y-4">
            <div>
                <h4 className="mb-5 mr-10 text-base text-gray-800 dark:text-white/90">{task.title}</h4>
                <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400">
                    <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.33329 1.0835C5.74751 1.0835 6.08329 1.41928 6.08329 1.8335V2.25016L9.91663 2.25016V1.8335C9.91663 1.41928 10.2524 1.0835 10.6666 1.0835C11.0808 1.0835 11.4166 1.41928 11.4166 1.8335V2.25016L12.3333 2.25016C13.2998 2.25016 14.0833 3.03366 14.0833 4.00016V6.00016L14.0833 12.6668C14.0833 13.6333 13.2998 14.4168 12.3333 14.4168L3.66663 14.4168C2.70013 14.4168 1.91663 13.6333 1.91663 12.6668L1.91663 6.00016L1.91663 4.00016C1.91663 3.03366 2.70013 2.25016 3.66663 2.25016L4.58329 2.25016V1.8335C4.58329 1.41928 4.91908 1.0835 5.33329 1.0835ZM5.33329 3.75016L3.66663 3.75016C3.52855 3.75016 3.41663 3.86209 3.41663 4.00016V5.25016L12.5833 5.25016V4.00016C12.5833 3.86209 12.4714 3.75016 12.3333 3.75016L10.6666 3.75016L5.33329 3.75016ZM12.5833 6.75016L3.41663 6.75016L3.41663 12.6668C3.41663 12.8049 3.52855 12.9168 3.66663 12.9168L12.3333 12.9168C12.4714 12.9168 12.5833 12.8049 12.5833 12.6668L12.5833 6.75016Z" fill=""></path>
                    </svg>{task.dueDate}
                </span>
                </div>
                <span className="mt-3 inline-flex rounded-full px-2 py-0.5 text-theme-xs font-medium bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">{task.priority && task.priority.toLowerCase()}
                </span>
            </div>
            </div>
        </div>
    )
}

export default KanbanList