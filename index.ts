export async function fetchPenalCode() : Promise<{html: string[], text: string[]}> {
    const url = "https://gov.eclipse-rp.net/viewtopic.php?t=105513"

    const response = await fetch(url);

    if (response.status !== 200) {
        console.error(`${url}: ${response.status} - ${response.statusText}`)
        throw Error()
    }

    const body = await response.text()

    const topics = body.split('<div class="postbody">') // Parse out all topics

    let html = []
    let text = []

    for (let i = 1; i < topics.length; i++) { // i = 1, skipping the first "topic" which is just metadata
        html[i - 1] = topics[i].split('<div class="notice">')[0].split('<div class="back2top">')[0].split('</p>')[1].trim() // Parse out the HTML
        text[i - 1] = html[i - 1].replace(/(<([^>]+)>)/gi, '').replace(/&amp;/g, '').replace(/ +/g, ' ').trim() // Parse out the plain text
    }
    return {html: html, text: text}
}
