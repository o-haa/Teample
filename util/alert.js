function alertMove (msg, path) {
    let script = `
    <script>
        alert("${msg}")
        location.href="${path}"
    </script>
    `
    return script
}

module.exports = {
    alertMove
}