export default function(toaster, msg, type = "success", position = "top-left") {
    toaster.show(msg,
        {
            theme: "bubble",
            type: type,
            position: position,
            fitToScreen: true,
            duration : 5000
        }
    )
}
