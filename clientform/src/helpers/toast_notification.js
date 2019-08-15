export default function(toaster, msg, type = "success", position = "top-left") {
    toaster.show(msg,
        {
            theme: "bubble",
            type: type, //'success', 'info', 'error'
            position: position, //'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'
            fitToScreen: true,
            duration : 5000
        }
    )
}
